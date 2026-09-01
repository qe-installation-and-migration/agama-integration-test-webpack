# Code Review Guidelines

This document consolidates the recurring principles and "wisdom" from code reviews gathered from analyzing pull request comments.

### 1. Code Structure & Design Patterns
*   **Keep Page Objects Simple:** Page Objects should primarily expose UI elements (locators) as public or private properties, public when we need them for assertions, private when they are used in its own methods. Page Objects  are for locating elements and performing simple actions, not for containing complex logic or assertions.
*   **Separate Assertions from Page Objects:** Assertions and logic to read element properties belong in the test (`it` block) or "check" layer, not in Page Object methods.
*   **Create Reusable Helper Functions:** For common, repeated operations (like getting the text content of an element), create a generic function in a shared location like `lib/helpers.ts` to be used across different tests.
*   **Abstract Implementation Details:** Name functions based on *what* they do, not *how*. For example, prefer `verifyStorageOutOfSync()` over a more specific name like `verifyStoragePopup()`, as the UI could change from a popup to something else.
*   **Create Focused Page Objects:** Split large Page Objects that cover too much of the UI into smaller, more focused classes that map to a single component or page.
*   **Use Proper Language Features:** Use language features like TypeScript interfaces for function parameters to improve clarity and type safety.

### 2. Test Design & Focus
*   **One Test, One Purpose:** Test suites and individual `it` blocks should be focused on a single, specific piece of functionality. Avoid combining unrelated steps or checks into one test.
*   **Use Stable & Smart Selectors:**
    *   Prefer specific and stable selectors, favor the accesibility ones and the other like like IDs when available.
    *   A good pattern for text is to use a partial match in the locator to find an element, and then assert the full, exact text in the test layer. This makes the test less brittle.
*   **Isolate Test Scenarios:** Separate different test cases (e.g., negative paths, alternative flows) into their own `it` blocks or dedicated test files. Don't mix them with the main "happy path".
*   **Consider All Configurations:** When making changes, think about their impact on all relevant test targets (e.g., products that don't require registration, different architectures) to avoid regressions.
*   **Efficient Test Setup:** When possible, use efficient mechanisms to set up test preconditions (e.g., loading a pre-configured profile) instead of performing the setup through the UI.

### 3. Code Readability & Maintenance
*   **Eliminate Boilerplate:** Remove repeated, non-essential comments and code that are copied across multiple files.
*   **Avoid Unnecessary Variables:** Do not declare variables if they are only used once. Inline them to improve clarity and reduce clutter.
*   **Use Descriptive Naming:**
    *   Use clear, full names for variables, functions, and classes. Follow established conventions (`kebab-case` for command-line options, `camelCase` for variables/functions).
    *   Name "check" functions (under checks/) as imperative actions (e.g., `downloadLogs()`) rather than verifications (e.g., `verifyDownloadLogs()`).
    *   Function names should accurately reflect the action in the UI (e.g., a "Confirm" button should have a `confirm()` method).
*   **Clean Up Unused Code:** Regularly remove unused command-line options, methods, and variables (although the CI will detect it anyway)
*   **Minimize Parameters:** Design functions to have a minimum number of parameters. Let the function derive information internally if it can.

### 4. Refactoring Strategy
*   **Don't Break the Flow:** When adding steps to a test, be mindful of the logical order of the overall scenario.
*   **Rename, Don't Delete (Initially):** When refactoring, rename outdated methods with a clear suffix (e.g., `_legacy`, `WithoutTabs`) instead of deleting them. This provides a safe fallback until feature is rolled out to that product.
*   **Log Technical Debt:** When a significant architectural flaw is found that is out of scope for the current work, create a ticket to ensure it's addressed later.
*   **Avoid Temporary Fixes:** When refactoring, complete the work fully. Don't introduce temporary conditions or workarounds to support a half-finished refactor.

### 5. Git & Project Workflow
*   **Write Accurate Commit Messages:** Ensure commit messages accurately reflect the changes. Use `git commit --amend` to fix them if needed.
*   **Rebase Before Review:** Keep your feature branch up-to-date with the base branch by rebasing.
*   **Self-Review First:** Review your own changes before submitting a pull request to catch simple mistakes, like committing generated or ignored files.
*   **Follow Environment Setup:** Adhere strictly to the project's dependency installation procedures (e.g., `npm ci` instead of `npm install`) to ensure a consistent environment.
*   **Provide Focused Verification:** Links to test runs in a pull request should be directly and exclusively relevant to the changes being made.

### 6. Framework-Specific Advice
*   **Prefer Framework APIs:** Use the testing framework's built-in API (e.g., Puppeteer's locators) over raw JavaScript DOM manipulation (`$eval`, `querySelectorAll`) for better abstraction and maintainability.
*   **Use Existing Libraries:** Leverage existing, well-tested libraries for common tasks (e.g., `wait-on` for waiting on files) instead of writing custom solutions with `sleep`, but evaluate the size of those libraries and compare with your own solution.
