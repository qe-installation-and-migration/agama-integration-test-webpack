---
name: running-live-tests
description: >
  Run a built Agama test bundle against a live instance and iterate on failures. Use to validate a
  test change, or when asked to run a test against a real Agama.
---

# Running against a live instance

```bash
./dist/test_<name>.js -u <url> --product-version 16.0
```

This branch only targets 16.0, so run against a 16.0 instance — ask for the URL if you are missing it.

Firefox and headless are the defaults — pass no browser or mode flags, and only a Firefox run
counts as validation. `-h` (headed) and `-d <ms>` (slow-mo) are for humans watching; `-c`
continues past a failure instead of aborting.

On failure the wrapped `it()` dumps `log/<label>.png` and `.html`. **Read the screenshot** — it is
directly viewable and usually shows the problem at once. Fix, rebuild, rerun; loop until green or
genuinely blocked, then report which steps passed, which failed, and which never ran.
