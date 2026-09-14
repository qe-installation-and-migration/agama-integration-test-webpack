---
name: spawning-test-vm
description: >
  Spawn the Agama SUT as a libvirt VM from an install-media ISO so there is a live instance to
  write and run tests against. Use before starting a new test, or when asked for a fresh Agama
  VM, a new build to test on, or when no SUT URL is available.
---

# Spawning the test VM

```bash
.claude/skills/spawning-test-vm/scripts/spawn-vm.sh <iso-url-or-path>
```

The ISO URL changes with every build — **ask for it** unless the caller gave one. A URL is
downloaded into `~/Assets` (the `Assets` libvirt pool) and reused if already there; a local path
is used as is.

## The live root password

Agama's live medium defaults to root password `linux`. QE always uses `nots3cr3t` instead, so the
script overrides it by tagging the ISO before the first boot:

```bash
tagmedia --add-tag "live_password=$(openssl passwd -6 nots3cr3t | base64 -w 0)" <iso>
```

Whatever it ends up being is the `-p` value the tests get. Override with `LIVE_PASSWORD=...`; set
it empty to leave the medium untagged.

`tagmedia` writes into the ISO in place, so the script never touches the downloaded master: it
copies it to a `*-tagged.iso` sibling, tags that, and boots the VM from the copy. The reason is
ownership — libvirt chowns an ISO to `qemu:qemu` the moment a domain attaches it, so a master that
has served one VM is no longer writable by you, and tagging it in place would need `sudo` on every
new build. The copy costs one extra ISO per build in `~/Assets` and is made once: later runs check
the existing tag against `LIVE_PASSWORD` (the hash is salted, so it re-derives it with the stored
salt) and reuse the copy as is.

Defaults, matching the virt-manager *SUSE Linux Enterprise Server 16.1* template. Override only
what the caller asked to change, by environment variable:

| Var | Default | |
|---|---|---|
| `NAME` | `sles16.1` | domain name |
| `MEMORY` | `4096` | MiB |
| `VCPUS` | `2` | |
| `DISK` | `32` | GiB, qcow2 in the `default` pool |
| `OSINFO` | `sles16.1` | |
| `CONN` | `qemu:///system` | |
| `LIVE_PASSWORD` | `nots3cr3t` | see above |

```bash
MEMORY=8192 DISK=64 .claude/skills/spawning-test-vm/scripts/spawn-vm.sh <url>
```

Extra `virt-install` arguments after the ISO are passed through, e.g. a second disk for storage
tests: `spawn-vm.sh <url> --disk size=20,format=qcow2`.

It reports each phase on stderr (`[1/5]` ISO, `[2/5]` password tag, `[3/5]` disk allocation,
`[4/5]` domain created, `[5/5]` lease wait with a 10s heartbeat), so run it without `tail`/`head`
and relay the phases — a whole run takes ~2-4 minutes from a local ISO and the disk step is silent
from `virt-install`.

The script prints the instance URL once the VM gets a DHCP lease; hand that back to the caller as
the `-u` value. It refuses to touch an existing domain of the same name and prints the
`destroy`/`undefine` commands instead — deleting a VM is the caller's call, never the script's.

Agama boots to its web UI with no further input; the installer's own steps are what the tests
drive. The skill's job ends at the URL — it does not log into the VM.
