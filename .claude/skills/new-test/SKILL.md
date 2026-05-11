---
name: new-test
description: Create a new integration test file following the test_*.ts naming pattern with proper three-layer architecture
disable-model-invocation: true
---

Create a new integration test file in the Agama test suite.

**Usage:** `/new-test <test-name>` (e.g., `/new-test partition_setup`)

**Architecture overview:**
This project follows a three-layer architecture:
- **test_*.ts** - Entry points that only call check functions
- **checks/*.ts** - Test logic with `it()` methods, assertions, and Page Object instantiation
- **pages/*.ts** - Page Objects with selectors and interaction methods (no assertions)

**Steps:**

1. **Validate the name:**
   - Must not include "test_" prefix (will be added automatically)
   - Should use snake_case (e.g., `partition_setup`, not `partitionSetup`)

2. **Create the file:** `src/test_$ARGUMENTS.ts`

3. **Generate boilerplate:**
   ```typescript
   import { options } from "./test_init";
   // Import check functions from checks/ folder
   // Example: import { checkStorageConfiguration } from "./checks/storage";
   
   // Call check functions - test_* files should only orchestrate checks
   // Example: checkStorageConfiguration(options);
   
   // Use strategy pattern ONLY if behavior differs between product versions
   // Example with strategy:
   // const strategy = createProductStrategy(options.version);
   // checkWithStrategy(options, strategy);
   ```

4. **Important notes:**
   - **test_* files** should only call check functions from `checks/` - no direct test logic here
   - **Check functions** (in `checks/*.ts`) contain the actual `it()` methods with assertions
   - **Page Objects** (in `pages/*.ts`) provide selectors and interaction methods only
   - **Assertions** happen in checks/, never in test_* or pages/
   - **Strategy pattern** is only used when behavior differs between product versions

5. **Creating a new check (if needed):**
   If no existing check fits, create one in `src/checks/`:
   ```typescript
   import { test } from "node:test";
   import { strict as assert } from "node:assert";
   import { MyPage } from "../pages/my-page";
   
   export function checkMyFeature(options) {
     test("should verify something", async function () {
       this.timeout(options.timeout);
       const page = await init(options);
       const myPage = new MyPage(page);
       
       // Test logic and assertions here
       assert.equal(await myPage.getSomething(), expectedValue);
       
       await page.close();
     });
   }
   ```

6. **Next steps:**
   - Identify which check function(s) to call (create new one if needed)
   - Run `npm run build` to compile
   - Test will be available at `dist/test_$ARGUMENTS.js`
