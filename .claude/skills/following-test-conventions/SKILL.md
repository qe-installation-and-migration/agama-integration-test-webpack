---
name: following-test-conventions
description: >
  Follow this repo's code-style reference for Agama test code — page objects, checks, locators,
  types and assertions. Use when writing or reviewing the code of a new check, page object or
  entry point; for the end-to-end test workflow use writing-agama-tests instead.
---

# Following the repo's test conventions

Write the simplest thing that covers the request: plain, obvious, slightly repetitive code a
reviewer understands in one pass.

- **Build exactly the case you were asked for**, as one straight sequence of calls — no lookup
  tables, case arrays or all-optional options objects. Generalise when a second caller exists.
- **Plain types only**: `string`, `boolean`, `string[]`, plain `interface`s. No `keyof`, mapped or
  indexed types, generics or `as` casts; the existing `GConstructor` mixin is the one exception.
- **One named locator per element**, accessible name written as a literal so grep finds it on a UI
  rename. Interpolate only for a genuinely open set — a row per device, a button per product id.
- **Assert literal expected values**, never computed at runtime. Pick a scenario whose expected
  result is constant everywhere; automatic and environment-following defaults are not.
- **No comments narrating the code.** If a step needs a sentence to explain it, simplify the step.

Selectors follow CLAUDE.md's ARIA name-and-role convention and its fallback order. Keep CSS
engine-neutral: `::-webkit-*` and other vendor-prefixed pseudo-elements silently fail in Firefox,
while Puppeteer's `::-p-text()` / `::-p-aria()` are fine.

Page objects, checks, helpers, `*WithSidebar` naming and ts-prune follow CLAUDE.md. Two additions:

- Copy the shape of `src/pages/system_page.ts` with `setStaticHostname` in `src/checks/system.ts`:
  one named ARIA locator per element, one action method per interaction, a check that reads top to
  bottom.
- **Reuse before adding** — read `src/lib/helpers.ts` and `src/lib/table.ts` first.
