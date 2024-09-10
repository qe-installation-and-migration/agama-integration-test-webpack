// FIXME: for dumping the data when the test fails
import fs from "fs";
import path from "path";

import puppeteer from "puppeteer-core";
import { program, Option } from "commander";
import * as commander from "commander";

// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { describe, it as testIt, before, after, afterEach, skip } from "node:test";
// see https://nodejs.org/docs/latest-v20.x/api/assert.html
import assert from "node:assert/strict";

// This is an example file for running Agama integration tests using Puppeteer.
//
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory.
// For more details about customization see the README.md file.

// define the command line arguments and parse them
// see https://github.com/tj/commander.js
program
  .description("Run a simple Agama integration test")
  .option("-u, --url <url>", "Agama server URL", "http://localhost")
  .option("-p, --password <password>", "Agama login password", "linux")
  .addOption(new Option("-b, --browser <browser>", "Browser used for running the test")
    .choices(["firefox", "chrome", "chromium"])
    .default("firefox")
  )
  .option("-h, --headed", "Run the browser in headed mode with UI (the default is headless mode)")
  .addOption(new Option("-d, --delay <miliseconds>", "Delay between the browser actions, useful in headed mode")
    .argParser(getInt)
    .default(0)
  )
  .option("-c, --continue", "Continue the test after a failure (the default is abort on error)")
  .parse(process.argv);

// parse options from the command line
const options = program.opts();

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
  product: puppeteer.Product;
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

let page: puppeteer.Page;
let browser: puppeteer.Browser;
let failed = false;

// define it() as a wrapper which dumps the page on a failure
async function it(label: string, test: () => Promise<void>) {
  testIt(label,
    // abort when the test takes more than one minute
    { timeout: 60000 },
    async (t) => {
      try {
        if (failed)
          t.skip()
        else
          await test();
      }
      catch (error) {
        if (!options.continue) failed = true;
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
    }
  );
};

// parse command line argument as an integer
function getInt(value: string) {
  // parse the value as a decimal number (base 10)
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new commander.InvalidArgumentError("Enter a valid number.");
  }

  return parsed;
}

describe("Agama test", function () {
  before(async function () {
    browser = await puppeteer.launch({
      // "webDriverBiDi" does not work with old FireFox, comment it out if needed
      protocol: "webDriverBiDi",
      headless: !options.headed,
      ignoreHTTPSErrors: true,
      timeout: 30000,
      slowMo: options.slow,
      defaultViewport: {
        width: 1280,
        height: 768
      },
      ...browserSettings(options.browser)
    });
    page = await browser.newPage();
    page.setDefaultTimeout(20000);
    await page.goto(options.url, { timeout: 60000, waitUntil: "domcontentloaded" });
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
    await page.type("input#password", options.password);
    await page.click("button[type='submit']");
  });

  it("should optionally display the product selection dialog", async function () {
    // Either the main page is displayed (with the storage link) or there is
    // the product selection page.
    let productSelectionDisplayed = await Promise.any([
      page.waitForSelector("a[href='#/storage']")
        .then(s => {s!.dispose(); return false}),
      page.waitForSelector("button[form='productSelectionForm']")
        .then(s => {s!.dispose(); return true})
    ]);

    if (productSelectionDisplayed) {
      await page.locator("::-p-text('openSUSE Tumbleweed')").click();
      await page.locator("button[form='productSelectionForm']")
        // wait until the button is enabled
        .setWaitForEnabled(true)
        .click();
      // refreshing the repositories might take long time
      await page.locator("h3::-p-text('Overview')").setTimeout(60000).wait();
    } else {
      // no product selection displayed, mark the test as skipped
      skip();
    }
  });

  it("should display overview card", async function () {
    await page.waitForSelector("h3::-p-text('Overview')");
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

    const newPassword = "test";
    await page.type("input#password", newPassword);
    await page.type("input#passwordConfirmation", newPassword);

    await page.locator("button::-p-text(Confirm)").click();
  });
});
