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
- [ ] Step 1: Spawn the SUT VM to test against (spawning-test-vm)
- [ ] Step 2: Branch off current upstream/main (branching-from-upstream)
- [ ] Step 3: Decide the release-strategy wiring (wiring-release-strategies)
- [ ] Step 4: Prove ARIA names and roles on a live instance (discovering-selectors)
- [ ] Step 5: Write the code (following-test-conventions)
- [ ] Step 6: Typecheck, lint, unused exports (running-static-checks)
- [ ] Step 7: Run against each targeted release until green (running-live-tests)
- [ ] Step 8: Rebuild dist, squash, push, open the PR (shipping-pull-requests)
```

Invoke each skill in turn, continuing once it reports done:

1. `spawning-test-vm` — spawn the SUT VM; skip only if a live instance URL was given.
2. `branching-from-upstream` — branch off current `upstream/main`.
3. `wiring-release-strategies` — decide how the step routes through the release strategies.
4. `discovering-selectors` — read and prove ARIA names and roles off a live instance.
5. `following-test-conventions` — write the code.
6. `running-static-checks` — typecheck, lint, unused exports.
7. `running-live-tests` — run against each targeted release until green.
8. `shipping-pull-requests` — rebuild `dist/`, squash, push, open the PR.

Steps 4–7 are a loop: a failing run usually means a wrong selector, so go back to
`discovering-selectors` rather than guessing at a fix.
