---
name: running-static-checks
description: >
  Run this repo's static gates — TypeScript typecheck, ESLint, and the ts-prune unused-export
  check, via npm run build and npm run prune. Use before any live test run and before committing,
  or when asked to lint, typecheck, or prune.
---

# Running the static checks

```bash
npm run build   # this IS the typecheck and the lint gate
npm run prune   # fails on unused exports
```

Both must pass before going near a live instance. Use `ESLINT=0` for quick intermediate checks
only; the final gate runs lint. `npm run devel` gates identically and is faster, so it suits
iteration — but what gets committed is the `build` output, as CLAUDE.md and
`shipping-pull-requests` cover.
