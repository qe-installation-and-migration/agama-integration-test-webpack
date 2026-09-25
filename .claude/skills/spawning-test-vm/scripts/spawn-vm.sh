#!/bin/bash
# Spawn the Agama SUT VM from an install ISO. Defaults match the
# "SUSE Linux Enterprise Server 16.1" template in virt-manager.
set -euo pipefail

NAME=${NAME:-sles16.1}
MEMORY=${MEMORY:-4096}
VCPUS=${VCPUS:-2}
DISK=${DISK:-32}
OSINFO=${OSINFO:-sles16.1}
ASSETS=${ASSETS:-$HOME/Assets}
CONN=${CONN:-qemu:///system}
NETWORK=${NETWORK:-custom-nat}
# root password of the live medium; the automation assumes this one. Empty = leave the ISO alone.
LIVE_PASSWORD=${LIVE_PASSWORD:-nots3cr3t}

# progress markers, unbuffered so they show up while the slow steps run
say() { printf '==> %s\n' "$*" >&2; }

# true when the ISO already carries a live_password tag for $LIVE_PASSWORD. Re-tagging works but
# rewrites the shared asset with a fresh salt every run, so check before touching it.
live_password_set() {
  local tag hash salt
  tag=$(tagmedia --show "$1" 2>/dev/null | awk -F' = ' '/^live_password/ {print $2}')
  [ -n "$tag" ] || return 1
  hash=$(printf '%s' "$tag" | base64 -d 2>/dev/null) || return 1
  salt=$(printf '%s' "$hash" | cut -d'$' -f3)
  [ -n "$salt" ] || return 1
  [ "$(openssl passwd -6 -salt "$salt" "$LIVE_PASSWORD")" = "$hash" ]
}

iso=${1:-}
[ -n "$iso" ] || { echo "usage: $0 <iso-url-or-path>" >&2; exit 2; }

if [[ "$iso" == http://* || "$iso" == https://* ]]; then
  mkdir -p "$ASSETS"
  target="$ASSETS/$(basename "${iso%%\?*}")"
  if [ -s "$target" ]; then
    say "[1/5] ISO already in $ASSETS, reusing: $(basename "$target")"
  else
    say "[1/5] Downloading $(basename "$target") into $ASSETS (several minutes)"
    curl -fL --progress-bar -o "$target.part" "$iso"
    mv "$target.part" "$target"
  fi
  virsh -c "$CONN" pool-refresh Assets >/dev/null 2>&1 || true
  iso=$target
else
  say "[1/5] Using local ISO: $iso"
fi
[ -s "$iso" ] || { echo "no such ISO: $iso" >&2; exit 1; }

# Agama's live medium defaults to root password `linux`; QE uses nots3cr3t, which the
# live_password tag sets at boot. Tag a copy, never the downloaded master: libvirt chowns an ISO
# to qemu:qemu as soon as a domain attaches it, so the master stops being writable after its
# first VM.
if [ -z "$LIVE_PASSWORD" ]; then
  say "[2/5] LIVE_PASSWORD empty, booting the untagged ISO (root password stays 'linux')"
else
  tagged="${iso%.iso}-tagged.iso"
  if live_password_set "$tagged"; then
    say "[2/5] Reusing tagged ISO: $(basename "$tagged")"
  else
    say "[2/5] Copying to $(basename "$tagged") and tagging it (root login as '$LIVE_PASSWORD')"
    cp -f --reflink=auto "$iso" "$tagged.part"
    tagmedia --add-tag \
      "live_password=$(openssl passwd -6 "$LIVE_PASSWORD" | base64 -w 0)" "$tagged.part" >/dev/null
    mv "$tagged.part" "$tagged"
    virsh -c "$CONN" pool-refresh Assets >/dev/null 2>&1 || true
  fi
  iso=$tagged
fi

if virsh -c "$CONN" dominfo "$NAME" >/dev/null 2>&1; then
  echo "A domain named '$NAME' already exists. Remove it first:" >&2
  echo "  virsh -c $CONN destroy $NAME; virsh -c $CONN undefine $NAME --remove-all-storage" >&2
  exit 1
fi

say "[3/5] Allocating ${DISK}G disk (qcow2) — the slow step, no output until done"
virt-install \
  --connect "$CONN" \
  --name "$NAME" \
  --memory "$MEMORY" \
  --vcpus "$VCPUS" \
  --disk size="$DISK",format=qcow2 \
  --cdrom "$iso" \
  --osinfo "$OSINFO" \
  --network network="$NETWORK" \
  --graphics spice \
  --noautoconsole \
  "${@:2}"

say "[4/5] Domain '$NAME' created, booting"
[ "$(virsh -c "$CONN" domstate "$NAME" 2>/dev/null)" = "running" ] || exit 0

say "[5/5] Waiting for a DHCP lease (Agama takes ~1-2 min to boot)"
ip=""
for i in $(seq 0 29); do
  ip=$(virsh -c "$CONN" domifaddr "$NAME" --source lease 2>/dev/null \
       | awk '/ipv4/ {split($4,a,"/"); print a[1]; exit}')
  if [ -n "$ip" ]; then break; fi
  say "    still booting... $((i * 10))s elapsed"
  sleep 10
done

if [ -n "$ip" ]; then
  echo "VM '$NAME' is up at https://$ip"
else
  echo "VM '$NAME' started but no lease yet; retry:"
  echo "  virsh -c $CONN domifaddr $NAME --source lease"
fi
echo "Console: virt-manager --connect $CONN --show-domain-console $NAME"
