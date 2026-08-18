---
name: shipping-pull-requests
description: >
  Rebuild dist, squash the branch into a single commit, force-push, and open or update a PR
  against upstream. Use when validated changes are ready to ship, or when asked to commit, push,
  or open a pull request.
---

# Shipping a pull request

This repo commits its build output, and works one squashed commit per PR.

## 1. Rebuild — mandatory

Run the `running-static-checks` skill; it must be clean before you commit.

`dist/` is **tracked** — a commit whose `dist/` does not match `src/` ships stale bundles to the
Live ISO. Never skip this step, even for a one-line source change, and never use `ESLINT=0` here.
Always `build`, never `devel`: production output is what gets committed, including the
`dist/vendor.js.LICENSE.txt` it emits.

Expected noise: webpack bakes an absolute path into the yargs ESM shim in `dist/vendor.js`, so a
rebuild always rewrites that line to your own home directory. If it is the only `dist/` change,
revert it — `git checkout -- dist/vendor.js`.

## 2. Stage

Stage `src/` and `dist/` together.

## 3. Single commit per PR

```bash
git rev-list --count upstream/main..HEAD
```

- Count is `0` → `git commit`
- Count is `1` or more → `git commit --amend`

Never add a second commit to a branch. Write the message in the style of the existing history:
a short imperative subject line describing the behavior ("Adapt hostname setup tests to new
System section UI"). **No `Co-Authored-By` trailer.**

## 4. Push

Confirm with the user before this step — pushing and opening a PR are outward-facing and hard to
walk back.

```bash
git push --force-with-lease origin <branch>
```

Amending rewrites history, so a force push is required. Use `--force-with-lease`, never a bare
`--force`.

## 5. Open or update the PR

```bash
.claude/skills/shipping-pull-requests/scripts/open-pr.sh
```

The PR targets `main` on `upstream`; the commits come from your branch on `origin`. An existing
PR was already updated by the push — just print its URL.

Report the PR URL back to the user.
