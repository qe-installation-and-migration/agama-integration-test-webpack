// The purpose of this test is to automatically take screenshots of Agama. The
// goal is to have an easy way for updating the screenshots in the documentation
// and at the Agama web page.
//
// The test saves the page screenshots and the HTML page dumps to ./log/
// subdirectory.
//
// For more details about customization see the README.md file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { describe } from "node:test";
import fs from "fs";
import path from "path";

import { parse } from "./lib/cmdline";
import { it, test_init, page } from "./lib/helpers";

import { loginCheck } from "./checks/login";
import { setInitialRootPassword } from "./checks/set_root_password";

// parse options from the command line
const options = parse((c) => c.description("Automatically take the Agama screenshots"));

// the selected product to install
const selectedProduct = "openSUSE Tumbleweed";

// directory where to save the screenshots
const dir = "screenshots";

// take screenshot of the current page
async function screenshot(file: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  await page.screenshot({ path: path.join(dir, file + ".png") });
}

describe("Agama screenshots", function () {
  test_init(options);

  loginCheck(options.password);

  it("should take product selection screenshot", async function () {
    await page.locator("button[form='productSelectionForm']").wait();
    await screenshot("product-selection");

    const product = await page.locator(`::-p-text('${selectedProduct}')`).waitHandle();
    // scroll the page so the product is visible
    await product.scrollIntoView();
    await product.click();

    await page
      .locator("button[form='productSelectionForm']")
      // wait until the button is enabled
      .setWaitForEnabled(true)
      .click();
  });

  setInitialRootPassword(options.rootPassword);

  it("should take overview page screenshot", async function () {
    await page.locator("h3::-p-text('Overview')").wait();
    await screenshot("overview");
  });

  it("should take storage page screenshot", async function () {
    await page.locator("a[href='#/storage']").click();
    await page.locator("h3::-p-text('Final layout')").wait();
    await screenshot("storage");
  });

  it("should take network page screenshot", async function () {
    await page.locator("a[href='#/network']").click();
    await page.locator("h3::-p-text('Wired')").wait();
    await screenshot("network");
  });

  it("should take software page screenshot", async function () {
    await page.locator("a[href='#/software']").click();
    await page.locator("h3::-p-text('Selected patterns')").wait();
    await screenshot("software");
  });

  it("should take user page screenshot", async function () {
    await page.locator("a[href='#/users']").click();
    await page.locator("h3::-p-text('First user')").wait();
    await screenshot("users");
  });
});
