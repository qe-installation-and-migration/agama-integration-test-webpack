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

Add the steps that reach the screen under test at the marked line before running it, and adjust
the URL and password there if they are not `https://agama.local` / `nots3cr3t`.

It reads the DOM because `page.accessibility.snapshot()`, `createCDPSession()` and `client()` are
unavailable under WebDriver BiDi.

Capture name *and* role, then prove each candidate resolves before using it:

```js
await page.locator('::-p-aria([name="Install"][role="button"])').wait();
```

Report the proven locators back to the caller.
