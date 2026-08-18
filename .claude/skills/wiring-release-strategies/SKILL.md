---
name: wiring-release-strategies
description: >
  Wire a test step through the release strategies — strategy method or direct check, which of
  MaintenanceRelease, Production and DevelopmentReleaseStrategy implement it, and which product
  versions (16.0, 16.1) it targets. Use before adding or moving a step in an Agama test.
---

# Wiring a step through the release strategies

The layers and the strategy rules are in CLAUDE.md. Two things it does not say:

- Route a step through the strategy when its page differs per release; call the check directly when
  it does not. Which checks are direct is today's UI, not a rule — move one onto the strategy once
  its page diverges. A routed check is imported by the variant, never by the entry point.
- Ask which releases the change targets if the request does not say. Implement only those: mark the
  interface method optional, add it to the strategies it applies to, and call it as
  `testStrategy.changeAppearance?.()` so the others skip it. Precedent: `verifyStorageOutOfSync?`.
