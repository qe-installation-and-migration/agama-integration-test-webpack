---
name: branching-from-upstream
description: >
  Branch off current upstream/main with git so work starts from a pristine tree. Use before
  writing any change in this repo, and when asked to start a new branch, branch off main, or
  rebase work onto current upstream.
---

# Branching off upstream/main

```bash
git fetch upstream
git switch -c <kebab-slug> upstream/main
```

- `upstream` is `qe-installation-and-migration/agama-integration-test-webpack`; `origin` is the
  fork you push to. Branch off `upstream/main`, never off a stale local `main`.
- Name the branch after the change as a kebab-case slug.
- If the working tree has uncommitted changes to tracked files, stop and ask what to do with them.
- Never `git clean` — it destroys work outside the tracked set.

Hand back to the caller once the branch exists.
