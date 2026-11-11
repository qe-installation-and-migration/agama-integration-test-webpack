---
name: running-live-tests
description: >
  Run a built Agama test bundle against a live instance and iterate on failures. Use to validate a
  test change, or when asked to run a test against a real Agama.
---

# Running against a live instance

```bash
./dist/test_<name>.js -u <url> --product-version <v>
```

Run this once per targeted release, each against an instance of that release — ask for the URLs
you are missing. A release you could not run against is not validated; say so.

This branch only targets 16.1; pass `--product-version 16.1`.

Firefox and headless are the defaults — pass no browser or mode flags, and only a Firefox run
counts as validation. `-h` (headed) and `-d <ms>` (slow-mo) are for humans watching; `-c`
continues past a failure instead of aborting.

On failure the wrapped `it()` dumps `log/<label>.png` and `.html`. **Read the screenshot** — it is
directly viewable and usually shows the problem at once. Fix, rebuild, rerun; loop until green or
genuinely blocked, then report which steps passed, which failed, and which never ran.
