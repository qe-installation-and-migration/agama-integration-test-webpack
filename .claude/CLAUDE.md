# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Puppeteer-based integration test suite for the Agama installer. Tests are compiled into single-file executable bundles using Webpack and run against a local or remote Agama instance.

## Testing

**Prerequisites:**

- Tests require a running Agama instance (default: http://localhost, or custom via `--url` flag)
- Browser must be installed (Firefox, Chrome, or Chromium at /usr/bin/)

**Running tests:**
Tests compile to executable files in `dist/`. Run directly: `dist/test_*.js` or with Node.js flags for TAP output: `node --test-reporter=tap dist/test_name.js`

**Test timeouts:**

- Default: 60 seconds per test

**Test flags:**

- `--headed` - Show browser UI (headless by default)
- `--delay N` - Slow motion (N milliseconds between actions)
- `--continue` - Continue running after first failure (aborts by default)

**Creating new tests:**

- Name pattern: `src/test_*.ts` (Webpack auto-discovers these)
- Use Page Object Model classes from `src/pages/`
- Use helper functions from `src/checks/` for assertions
- Tests auto-dump screenshot + HTML to `log/` on failure

## Architecture Patterns

**Three-Layer Architecture:**
Tests follow a strict separation of concerns across three layers:

1. **test\_\*.ts (Entry layer):** Imports `options` from `test_init` and orchestrates tests by calling check functions. Contains NO test logic, assertions, or Page Object instantiation.

2. **checks/\*.ts (Test logic layer):** Contains reusable check functions with `it()` methods, assertions, and Page Object instantiation. Each check represents an application area. This is where test assertions happen.

3. **pages/\*.ts (Page Object layer):** Page Objects with selectors (properties) and interaction methods. NO assertions allowed here (legacy code may violate this).

Example flow: `test_storage.ts` → calls `checkStorageConfiguration()` from `checks/storage.ts` → instantiates `StoragePage` from `pages/storage-page.ts`

**Page Object Model:**
Each UI screen has a dedicated class in `src/pages/` with locators and interaction methods. Page Objects should only contain selectors (as properties) and simple methods that act on those selectors. Never put assertions in Page Objects.

**Strategy Pattern:**
Use ONLY when behavior differs between product versions. `ProductStrategyFactory` creates product-specific test strategies based on version. Use `createProductStrategy()` to handle version differences (e.g., SLES 16.1 vs 20). If behavior is the same across versions, don't use the pattern.

## Webpack Configuration

- Bundles include shebang (`#!/usr/bin/env node`) for direct execution
- Vendor dependencies split into `vendor.js` to reduce test bundle size
- Source maps enabled for test files (excluded for vendor.js)
- ESLint runs during build and fails on warnings

## Git Workflow

Standard GitHub flow: feature branches, PRs to main, conventional commit messages.
