---
name: ship-pr
description: >
  Rebuild dist, squash the branch into a single commit, push, and open or update a pull request
  against upstream. Use when validated changes are ready to ship.
---

# Shipping a change

This repo commits its build output, and works one squashed commit per PR. Both are easy to get
wrong; follow the steps in order.

## 1. Rebuild — mandatory

```bash
npm run build
```

`dist/` is **tracked**. A commit whose `dist/` does not match `src/` ships stale
bundles to the Live ISO. This repo already carries several commits that exist only to repair that
mistake (`1403213`, `5025016`, `eecbb7b`). Never skip this step, even for a one-line source
change, and never use `ESLINT=0` here.

Use `build`, not `devel` — what gets committed is the production output; `devel` is for iterating.
Production mode also emits `dist/vendor.js.LICENSE.txt`, which belongs in the commit. The bundles
currently in git were built with `devel`, so the first `build` commit rewrites every tracked file
in `dist/`; that one-off churn is expected, and after it a `devel` bundle committed over a
production one would show up as the whole file changing.

One diff is expected noise: webpack bakes an absolute path into the yargs ESM shim in
`dist/vendor.js`, so a rebuild always rewrites that line to your own home directory. If it is the
only `dist/` change, revert it — `git checkout -- dist/vendor.js` — rather than committing it.

Minification does not cost you the backtrace: with `node --enable-source-maps` a failure still
resolves to the original `src/**.ts` line. Without the flag a minified frame is only a column
offset, so always pass it when reading a stack.

Also confirm the static gate is clean before committing:

```bash
npm run prune
```

## 2. Stage

Stage both `src/` and `dist/`. Review `git status` and leave unrelated files alone — do not sweep
up scratch files or `log/` artefacts.

## 3. Single commit per PR

```bash
git rev-list --count upstream/main..HEAD
```

- Count is `0` → `git commit`
- Count is `1` or more → `git commit --amend`

Never add a second commit to a branch. Write the message in the style of the existing history:
a short imperative subject line describing the behaviour ("Adapt hostname setup tests to new
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
gh pr view --json url 2>/dev/null \
  || gh pr create --repo qe-installation-and-migration/agama-integration-test-webpack --base main
```

If a PR already exists the push in step 4 has already updated it — just print the URL. Base the
PR on `upstream` (`qe-installation-and-migration`), from your `origin` fork branch.

Report the PR URL back to the user.
