// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { describe } from "node:test";
// see https://nodejs.org/docs/latest-v20.x/api/assert.html
import assert from "node:assert/strict";

import { parse } from "./lib/cmdline";
import { it, test_init, page } from "./lib/helpers";

import { loginCheck } from "./checks/login";
import { optionalProductSelection } from "./checks/optional_product_selection";
import { setInitialRootPassword, setRootPassword } from "./checks/set_root_password";

// parse options from the command line
const options = parse();

describe("Agama test", function () {
  test_init(options);

  it("should have Agama page title", async function () {
    assert.deepEqual(await page.title(), "Agama");
  });

  loginCheck(options.password);

  optionalProductSelection("openSUSE Tumbleweed");

  setInitialRootPassword(options.rootPassword);

  it("should display overview card", async function () {
    await page.waitForSelector("h3::-p-text('Overview')");
  });

  setRootPassword("test");
});
