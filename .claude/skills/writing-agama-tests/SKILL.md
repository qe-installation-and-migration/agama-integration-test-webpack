---
name: writing-agama-tests
description: >
  Write a new Agama integration test or modify an existing one from a description, orchestrating
  the full workflow end to end from branch to merged-ready PR, including validation against a live
  Agama instance. Use when asked to add, update, or fix an integration test, adapt a test or page
  object to an Agama UI change, or add a new check or page object.
---

# Writing an Agama integration test

Copy this checklist and track your progress:

```
Test Progress:
- [ ] Step 1: Branch off current upstream/main (branching-from-upstream)
- [ ] Step 2: Decide the release-strategy wiring (wiring-release-strategies)
- [ ] Step 3: Prove ARIA names and roles on a live instance (discovering-selectors)
- [ ] Step 4: Write the code (following-test-conventions)
- [ ] Step 5: Typecheck, lint, unused exports (running-static-checks)
- [ ] Step 6: Run against each targeted release until green (running-live-tests)
- [ ] Step 7: Rebuild dist, squash, push, open the PR (shipping-pull-requests)
```

Invoke each skill in turn, continuing once it reports done:

1. `branching-from-upstream` — branch off current `upstream/main`.
2. `wiring-release-strategies` — decide how the step routes through the release strategies.
3. `discovering-selectors` — read and prove ARIA names and roles off a live instance.
4. `following-test-conventions` — write the code.
5. `running-static-checks` — typecheck, lint, unused exports.
6. `running-live-tests` — run against each targeted release until green.
7. `shipping-pull-requests` — rebuild `dist/`, squash, push, open the PR.

Steps 3–6 are a loop: a failing run usually means a wrong selector, so go back to
`discovering-selectors` rather than guessing at a fix.
