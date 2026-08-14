---
name: agama-test
description: >
  Create a new Agama integration test or modify an existing one from a description, then validate
  it against a live Agama instance. Use when asked to add, update, or fix an integration test,
  adapt a test or page object to an Agama UI change, or add a new check or page object.
---

# Authoring an Agama integration test

Follow the phases in order. Pass the static gate before the live run.

## Phase 1 — Pristine branch

```bash
git fetch upstream
git switch -c <kebab-slug> upstream/main
```

If the working tree has uncommitted changes to tracked files, stop and ask what to do with them.
Never `git clean` — it destroys work outside the tracked set.

## Phase 2 — Classify the change

Decide the shape before writing anything. This determines the file set, and getting it wrong is
the most common failure — wiring four of five places leaves a half-broken strategy.

| Question | Files to touch |
|---|---|
| A whole new scenario? | New `src/test_*.ts` only. Webpack auto-discovers every `src/test_*.ts` as an entry; there is nothing to register. |
| A new step inside an existing flow? | New page object in `src/pages/` + new check in `src/checks/` + new method on `IProductTestStrategy` (`src/lib/product_strategy_factory.ts`) + an implementation in each `src/variants/` file the step applies to. |
| A UI change affecting one release only? | New check variant + override in the affected strategy only. `DevelopmentReleaseStrategy extends ProductionReleaseStrategy`, so overriding there leaves production untouched. |

Entry points (`src/test_*.ts`) are scripts, not suites: they call `test_init(options)`, build a
strategy via `ProductStrategyFactory.create(...)`, then call check functions that register `it()`
blocks.

**If the entry point builds a strategy, every step it sequences goes through that strategy** —
even one that behaves identically on every release. Import the check into the variant, not into
the entry point. Only steps that run before the strategy exists (`logIn`, `productSelection`) are
called directly.

**Implement only the releases you were asked about.** Mark the interface method optional, add it
to the strategies it applies to, and call it as `testStrategy.changeAppearance?.()` so the others
skip it — the `verifyStorageOutOfSync?` / `src/test_phub.ts` pair is the precedent. Leaving 16.0
unimplemented beats guessing at a sidebar locator nobody verified.

## Phase 3 — Discover real selectors, in Firefox

**Firefox is the only browser we support.** `src/lib/helpers.ts` launches with
`protocol: "webDriverBiDi"` and `firefox` is the default in `src/lib/cmdline.ts`; the Live ISO and
openQA run Firefox, so a Firefox run is what proves a selector.

A live Agama instance is normally reachable. Use it, and read every accessible name off a real
run: the browser computes them from the rendered accessibility tree, so a name guessed from the
markup frequently does not match. Firefox also folds adjacent text together — the assertions on
strings such as `"Danger alert:Could not log in"` in `src/checks/login.ts` are what it produces.

Discover them with a throwaway script under `log/`:

```js
// log/inspect.mjs — node log/inspect.mjs
import * as puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  protocol: "webDriverBiDi",
  browser: "firefox",
  executablePath: "/usr/bin/firefox",
  headless: true,
  acceptInsecureCerts: true,
  defaultViewport: { width: 1280, height: 800 },
});
const page = await browser.newPage();
await page.goto("https://agama.local", { waitUntil: "domcontentloaded" });
await page.locator("input#password").fill("nots3cr3t");
await page.locator("button[type='submit']").click();
// ...navigate to the screen under test, then dump candidates:
console.log(
  await page.evaluate(() =>
    [...document.querySelectorAll("a, button, input, select, textarea, [role], [aria-label]")]
      .filter((el) => el.getClientRects().length)
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute("role"),
        ariaLabel: el.getAttribute("aria-label"),
        text: (el.innerText || "").replace(/\s+/g, " ").trim().slice(0, 80),
        id: el.id,
      })),
  ),
);
await browser.close();
```

This reads the DOM because `page.accessibility.snapshot()`, `page.createCDPSession()` and
`page.client()` are unavailable under WebDriver BiDi — take anything you need from the a11y layer
via `page.evaluate` and ARIA attributes.

Capture the **role as well as the name** for every element you intend to target; the locators
written in Phase 4 need both.

Then **confirm** each candidate actually resolves in Firefox before committing to it, e.g.
`await page.locator('::-p-aria([name="Install"][role="button"])').wait()`. A locator counts as
proven once a Firefox run matches it.

## Phase 4 — Write to the repo's conventions

**Write the simplest thing that covers the request.** This is the rule that gets broken most
often. The team writes plain TypeScript and a page object is scaffolding, not a framework — plain,
obvious, slightly repetitive code is the target, and a reviewer should understand a new check in
one pass.

- **Build exactly the case you were asked for**, as one straight sequence of calls. "I plan to add
  more of these later" is context, not a request for an extension mechanism: hard-code the
  scenario and skip lookup tables of settings, case arrays and all-optional options objects. Every
  check registers at least one `it()`. A second real caller is what justifies generalising, and
  doing it then is a cheap edit.
- **Plain types only**: `string`, `boolean`, `string[]`, plain `interface`s. Avoid
  `keyof`, mapped and indexed types, generics and `as` casts. The `GConstructor` mixin is the one
  exception, and only where it already exists.
- **Prefer one named locator per element**, with the accessible name written out as a literal so
  grep finds it when the UI renames the control. Interpolating the name suits a genuinely open set
  — a row per device, a button per product id, as `productId()` and `productModeButton()` do — but
  on a first iteration writing the handful out is clearer, and collapsing them later is a smaller
  change than untangling a clever locator.
- **Literal test titles**, never assembled from variables — the title is what a failing openQA job
  shows.
- **Assert literal expected values.** Write the expectation as a constant rather than computing it
  at runtime. A setting left on an automatic or environment-following default resolves differently
  per machine — desktop theme, locale, screen size, a local browser versus a virtual machine
  viewer — so pick the scenario whose expected result is a constant everywhere.
- **No comments narrating the code.** If a step needs a sentence to say what it does, simplify the
  step. Reserve comments for genuinely surprising UI behaviour.

**Selectors.** Follow the ARIA name-and-role convention in CLAUDE.md ("Always identify elements by
ARIA name *and* role"), including its fallback order. Take the role for each locator from the
Phase 3 dump, and keep CSS engine-neutral: `::-webkit-*` and other vendor-prefixed pseudo-elements
silently fail in Firefox, while Puppeteer's `::-p-text()` / `::-p-aria()` are fine.

**Page objects, checks, shared helpers, `*WithSidebar` naming and ts-prune all follow CLAUDE.md.**
Two things it does not cover:

- `src/pages/system_page.ts` with `setStaticHostname` in `src/checks/system.ts` is a small
  end-to-end pair to copy the shape from: one named ARIA locator per element, one action method
  per interaction, and a check that reads top to bottom.
- **Reuse before adding** — read the helpers in `src/lib/helpers.ts` and `src/lib/table.ts` before
  writing a new one.

## Phase 5 — Static gate

```bash
npm run build   # this IS the typecheck and the lint gate
npm run prune   # fails on unused exports
```

Both must pass before going near the live instance. Use `ESLINT=0` for quick intermediate checks
only; the final gate runs lint. `npm run devel` gates identically and is faster, so it suits
iteration — but what gets committed is the `build` output, as CLAUDE.md and `ship-pr` cover.

## Phase 6 — Live run and iterate

```bash
./dist/test_<name>.js -u <url> --product-version <v> --agama-web-ui-package-version <v>
```

Both version flags are **mandatory**: `ProductStrategyFactory.create()` does
`agamaWebUiPackageVersion.split("+")[1].split(".")` unguarded and throws a bare `TypeError` if the
value is missing or has no `+` (e.g. `21+155.abc`). Supported combinations are `16.0`, and `16.1`
with a web UI version — see the factory for the exact thresholds.

The browser defaults to Firefox; leave `-b` off. Only a Firefox run counts as validation.

Run headless; `-h` (headed) and `-d <ms>` (slow-mo) are for humans watching. Add `-c` only when
you deliberately want the run to continue past a failure.

On failure the wrapped `it()` writes `log/<label>.png`, `log/<label>.html` and `log/index.css`.
**Read the screenshot** — it is directly viewable and usually shows the problem immediately. Then
fix, rebuild, rerun.

Loop until the run is green or you are genuinely blocked. Report which steps passed, which failed,
and which never ran.

When it is green, hand off to the `ship-pr` skill.
