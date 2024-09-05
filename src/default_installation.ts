import fs from "fs";
import path from "path";

import puppeteer, { Puppeteer, type Browser, type Locator, type Page, type Product } from "puppeteer-core";

// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { describe, it as testIt, before, after, afterEach, skip } from "node:test";
// see https://nodejs.org/docs/latest-v20.x/api/assert.html
import assert from "node:assert/strict";

// This is an example file for running Agama integration tests using Puppeteer.
//
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory.
// For more details about customization see the README.md file.

// helper function for converting String to Boolean
function booleanEnv(name: string, default_value: boolean) {
  const env = process.env[name];
  if (env === undefined) {
    return default_value;
  }
  switch (env.toLowerCase()) {
    case "0":
    case "false":
    case "off":
    case "disabled":
    case "no":
      return false;
    case "1":
    case "true":
    case "on":
    case "enabled":
    case "yes":
      return true;
    default:
      return default_value;
  }
}

interface BrowserSettings {
  product: Product;
  executablePath: string;
}

// helper function for configuring the browser
function browserSettings(name: string): BrowserSettings {
  switch (name.toLowerCase()) {
    case "firefox":
      return {
        product: "firefox",
        executablePath: "/usr/bin/firefox",
      };
    case "chrome":
      return {
        product: "chrome",
        executablePath: "/usr/bin/google-chrome-stable",
      };
    case "chromium":
      return {
        product: "chrome",
        executablePath: "/usr/bin/chromium",
      };
    default:
      throw new Error(`Unsupported browser type: ${name}`);
  }
}

let page: Page;
let browser: Browser;

// define it() as a wrapper which dumps the page on a failure
async function it(label: string, test: () => Promise<void>) {
  testIt(label, async () => {
    try {
      await test();
    }
    catch (error) {
      if (page) {
        // directory for storing the data
        const dir = "log";
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        // base file name for the dumps
        const name = path.join(dir, label.replace(/[^a-zA-Z0-9]/g, "_"));
        await page.screenshot({ path: name + ".png" });
        const html = await page.content();
        fs.writeFileSync(name + ".html", html);
      }

      throw new Error("Test failed!", { cause: error });
    }
  });
};

// arguments are passed via environment
// TODO: use the https://github.com/tj/commander.js library and
// implement a standard command line option parsing?
const agamaServer = process.env.AGAMA_SERVER || "http://localhost";
const agamaPassword = process.env.AGAMA_PASSWORD || "nots3cr3t";
const agamaBrowser = process.env.AGAMA_BROWSER || "firefox";
const agamaSlowMo = parseInt(process.env.AGAMA_SLOWMO || "0");
const agamaHeadless = booleanEnv("AGAMA_HEADLESS", true);
const agamaInstall = booleanEnv("AGAMA_INSTALL", true);

const agamaUser = "bernhard";
const agamaUserFullName = "Bernhard M. Wiedemann";

describe("Agama test", function () {
  before(async function () {
    browser = await puppeteer.launch({
      // "webDriverBiDi" does not work with old FireFox, comment it out if needed
      protocol: "webDriverBiDi",
      headless: agamaHeadless,
      ignoreHTTPSErrors: true,
      timeout: 30000,
      slowMo: agamaSlowMo,
      defaultViewport: {
        width: 1280,
        height: 768
      },
      ...browserSettings(agamaBrowser)
    });
    page = await browser.newPage();
    page.setDefaultTimeout(20000);
    await page.goto(agamaServer, { timeout: 60000, waitUntil: "domcontentloaded" });
  });

  after(async function () {
    await page.close();
    await browser.close();
  })

  it("should have Agama page title", async function () {
    assert.deepEqual(await page.title(), "Agama");
  });

  it("allows logging in", async function () {
    // await page.waitForSelector("input#password");
    await page.type("input#password", agamaPassword);
    await page.click("button[type='submit']");
  });

  it("should optionally display the product selection dialog", async function () {
    let timeout = 2 * 60 * 1000;
    // Either the main page is displayed (with the storage link) or there is
    // the product selection page.
    let productSelectionDisplayed = await Promise.any([
      page.waitForSelector("a[href='#/storage']")
        .then(s => { s!.dispose(); return false }),
      page.waitForSelector("button[form='productSelectionForm']")
        .then(s => { s!.dispose(); return true })
    ]);

    if (productSelectionDisplayed) {
      await page.locator("::-p-text('openSUSE Tumbleweed')").click();
      await page.locator("button[form='productSelectionForm']").click();

      // Check if configuration procedure is progressing
      await page.locator("::-p-text(Configuring the product)").wait();

      // refreshing the repositories might take long time
      await page.locator("h3::-p-text('Overview')").setTimeout(timeout).wait();
    } else {
      // no product selection displayed, mark the test as skipped
      skip();
    }
  });

  it("should display overview section", async function () {
    await page.locator("h3::-p-text('Overview')").wait();
  });

  it("should allow setting the root password", async function () {
    await page.locator("a[href='#/users']").click();

    let button: any = await Promise.any([
      page.waitForSelector("button::-p-text(Set a password)"),
      page.waitForSelector("button#actions-for-root-password")
    ]);

    await button!.click();

    const id = await button!.evaluate((x: { id: any; }) => x.id);
    // drop the handler to avoid memory leaks
    button!.dispose();

    // if the menu button was clicked we need to additionally press the "Change" menu item
    if (id === "actions-for-root-password") {
      await page.locator("button[role='menuitem']::-p-text('Change')").click();
    }

    await page.locator("input#password").fill(agamaPassword);
    await page.locator("input#passwordConfirmation").fill(agamaPassword);
    await page.locator("button::-p-text(Confirm)").click();
  });

  it("should create first user", async function () {
    let button: any = await Promise.any([
      page.locator("a[href='#/users/first']"),
      page.locator("button#actions-for-" + agamaUser)
    ]);

    await button!.click();

    const id = await button!.evaluate((x: { id: any; }) => x.id);
    // drop the handler to avoid memory leaks
    button!.dispose();

    // if the menu button was clicked we need to additionally press the "Discard" menu item
    if (id === "actions-for-" + agamaUser) {
      await page.locator("button[role='menuitem']::-p-text('Discard')").click();
      await page.locator("a[href='#/users/first']").click();
    }

    await page.locator("input#userFullName").fill(agamaUserFullName);
    await page.locator("input#userName").fill(agamaUser);
    await page.locator("input#password").fill(agamaPassword);
    await page.locator("input#passwordConfirmation").fill(agamaPassword);
    await page.locator("button[form='firstUserForm']").click();

    await page.locator("a[href='#/overview']").click();
  });

  it("should be ready for installation", async function () {
    await page.locator("a[href='#/overview']").click();
    await page.locator("h4::-p-text('Ready for installation')").wait();
  });

  // For development will be useful to stop before starting installation
  if (agamaInstall === true) {
    it("should start installation", async function () {
      await page.locator("button::-p-text('Install')").click();
      await page.locator("button::-p-text('Continue')").click();
      await page.locator("::-p-text(Installing the)").wait();
    });

    it("should finish installation", async function () {
      let timeout = 15 * 60 * 1000;
      await page
        .locator("h2::-p-text('Congratulations!')")
        .setTimeout(timeout)
        .wait();
    });
  }
});
