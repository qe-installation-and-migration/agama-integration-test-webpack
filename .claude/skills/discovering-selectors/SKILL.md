---
name: discovering-selectors
description: >
  Discover real ARIA names and roles off a running Agama instance in Firefox and prove a locator
  resolves. Use before writing a page object, or when a locator does not match.
---

# Discovering selectors on a live instance

Read every accessible name off a real run: the browser computes them from the rendered
accessibility tree, so a name guessed from the markup frequently does not match.

Dump the candidates with `scripts/inspect.mjs`, run from the repo root:

```bash
node .claude/skills/discovering-selectors/scripts/inspect.mjs
```

Adjust the constants at the top, then add the steps reaching the screen under test at the marked
line. The script logs in and selects a product first: screens hold no meaningful state before that.

It reads the DOM because `page.accessibility.snapshot()`, `createCDPSession()` and `client()` are
unavailable under WebDriver BiDi.

Keep the added steps re-runnable — the instance keeps its state, so a second run starts where the
first stopped. Failing on a step the previous run performed is stale state, not a wrong selector.

Capture name *and* role with `dump()`, then prove each candidate with `prove()` before using it:

```js
await prove("install", '::-p-aria([name="Install"][role="button"])');
```

When two elements share name *and* role — a modal's `X` and footer both named `Close` — ARIA takes
whichever comes first. Fall back to class plus text (`button.pf-m-primary::-p-text(Close)`), prove
it, and say which one it targets.

Report the proven locators back to the caller.
