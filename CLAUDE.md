# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Puppeteer-based integration tests for [Agama](https://github.com/agama-project/agama) (the SUSE
installer), bundled by Webpack into self-contained executables. The point of the bundling is that
the Live ISO does not need Puppeteer or any Node dependency installed — only `dist/vendor.js` plus
the test bundle are copied to the target machine (see `Rakefile`, which installs them into
`/usr/share/agama/system-tests`).

Tests use the **Node.js built-in test runner** (`node:test`), not Mocha/Jest — external runners
cannot be bundled by Webpack.

## Commands

```bash
npm ci                  # install (use ci, lockfile is committed)
npm run build           # production build -- use this one to refresh the tracked dist/
npm run devel           # unoptimized build, handy while iterating
npm run watch           # dev-mode rebuild on change
npm run eslint          # lint src/ (also runs inside webpack unless ESLINT=0)
npm run eslint:fix
npm run prune           # ts-prune --error: fails on unused exports (CI gate)
```

ESLint runs as a Webpack plugin with `failOnWarning: true`, so a lint warning breaks the build.
Disable with `ESLINT=0 npm run watch` during iteration.

`dist/` is tracked, so refresh it with `npm run build` before committing. Both modes run the same
typecheck and lint; production additionally minifies every bundle and emits
`dist/vendor.js.LICENSE.txt`, so expect a `dist/` diff wider than the files your change touched.
Stack traces still resolve to the original `.ts` line — the source maps survive minification, but
only with `node --enable-source-maps` (the hashbang does not set it).

`npm run prune` is enforced in CI. Exports that are only reached dynamically need a
`// ts-prune-ignore-next` comment above them.

### Running a test

Each `src/test_*.ts` becomes an executable `dist/test_*.js` (hashbang + chmod 755 added by
Webpack). There is no "run all tests" command — you run one bundle at a time:

```bash
./dist/test_default_installation.js --help
./dist/test_default_installation.js -u https://agama.local -b chrome -h -d 200 \
  --product-version 16.1 --agama-web-ui-package-version 21+155 --product-id SLES
node --enable-source-maps --test-reporter=tap ./dist/test_default_installation.js
```

Useful flags: `-h` headed, `-d <ms>` slow-mo, `-c` continue after failure (default aborts the rest
of the suite), `-b firefox|chrome|chromium`. Browser paths are hardcoded in
`browserSettings()` in `src/lib/helpers.ts`.

`DEBUG_AGAMA=1` enables `debugLog()` output.

On failure the wrapped `it()` dumps a screenshot, the page HTML, and `index.css` into `log/`.

## Architecture

Four layers, and changes usually touch several of them:

```
src/test_*.ts    entry points — parse CLI options, pick a strategy, sequence checks
src/variants/    release strategies — map the generic API onto version-specific checks
src/checks/      test steps — declare it() blocks and assertions
src/pages/       page objects — Puppeteer locators and interactions
src/lib/         helpers, CLI parsing, strategy factory, table utilities
```

**Entry points** are top-level scripts, not test suites: they call `test_init(options)` (registers
`before`/`after` browser lifecycle hooks) and then call check functions, which register `it()`
blocks with the Node runner. Everything is synchronous registration; the runner executes later.
Webpack auto-discovers every `src/test_*.ts` as an entry — adding a file is all that's needed.

**The strategy layer is the core abstraction.** Agama's web UI changes between releases, so the
same logical step ("create the first user") has different flows per version.
`ProductStrategyFactory.create(productVersion, agamaWebUiPackageVersion)` selects:

- `MaintenanceReleaseStrategy` — product version `16.0` (older sidebar-based UI)
- `DevelopmentReleaseStrategy` — `16.1` with web UI `>= 21+155`
- `ProductionReleaseStrategy` — `16.1` otherwise; the development strategy extends it and overrides
  only the steps that diverge

All three implement `IProductTestStrategy` (defined in `src/lib/product_strategy_factory.ts`).
Tests must go through the strategy, never call a version-specific check directly. When the UI
changes for a new release, add the new check function and override the method in the appropriate
strategy rather than branching inside a check.

**Naming convention:** the `*WithSidebar` suffix on checks and pages (e.g.
`enterProductRegistrationWithSidebar`, `OverviewWithSidebarPage`) marks the 16.0 sidebar UI variant.
`MaintenanceReleaseStrategy` is where they are wired up.

**Page objects** expose locators as arrow-function properties (`private readonly fooButton = () =>
this.page.locator(...)`) so they are evaluated lazily. Optional UI capabilities are composed with
TypeScript mixins over a `GConstructor` base — see `LicenseAcceptable` / `ModeSelectable` in
`src/pages/product_selection_page.ts`.

**Always identify elements by ARIA name *and* role.** Use Puppeteer's `::-p-aria()`
pseudo-selector with both attributes, not the name alone:

```ts
private readonly installButton = () =>
  this.page.locator('::-p-aria([name="Install"][role="button"])');
```

The role is what disambiguates — the same accessible name routinely appears on a heading, a link
and a button on the same screen, and a name-only locator will match whichever comes first in the
tree. Use the explicit `role` attribute when the markup has one, otherwise the implicit role of
the tag (`button` → `button`, `a[href]` → `link`, `input[type=text]` → `textbox`, `select` →
`combobox`, `input[type=checkbox]` → `checkbox`, `h1`–`h6` → `heading`).

Fall back to `[aria-label='...']`, `::-p-text()`, or CSS/id selectors only when no accessible name
is exposed. ARIA locators are stable across the UI restyling that repeatedly breaks the other
kinds.

**Checks** are the only place that registers `it()` and asserts (`node:assert/strict`). Use the
`it()` re-exported from `src/lib/helpers.ts`, not the one from `node:test` — the wrapper adds the
failure dumps and the abort-on-first-failure behavior. Default per-test timeout is 60s; pass a
third argument for slow steps.

Shared helpers worth knowing before writing new code: `getTextContent`, `getValue`,
`waitUntilOverlaySettled` (wraps an action and waits for the Agama overlay to clear),
`waitOnFile`, `sleep`, and the table readers in `src/lib/table.ts`.

## Conventions

- 2-space indent, double quotes, `printWidth: 100` (Prettier runs through ESLint).
- CLI options are defined per test via the `parse((cmd) => ...)` callback in
  `src/lib/cmdline.ts`; the base options (`--url`, `--password`, `--product-version`,
  `--agama-web-ui-package-version`, browser flags) are shared.
- Commits: no `Co-Authored-By` trailers.
