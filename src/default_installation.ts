import fs from "fs";
import path from "path";

import puppeteer, { Puppeteer, type Browser, type Locator, type Page, type Product } from "puppeteer-core";
import { program, Option } from "commander";
import * as commander from "commander";

// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { describe, it as testIt, before, after, afterEach, skip } from "node:test";
// see https://nodejs.org/docs/latest-v20.x/api/assert.html
import assert from "node:assert/strict";

// classes for Page Object Model
import { LoginAsRootPage } from "./pages/login-as-root-page";
import { ProductSelectionPage } from "./pages/product-selection-page";
import { Sidebar } from "./pages/sidebar-page";
import { UsersPage } from "./pages/users-page";
import { RootPasswordDialog } from "./pages/root-password-page";
import { CreateUserDialog } from "./pages/create-user-page";
import { OverviewPage } from "./pages/overiew-page";
import { ConfirmInstallationPopup } from "./pages/confirm-installation-page";

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
let failed = false;

// define it() as a wrapper which dumps the page on a failure
async function it(label: string, test: () => Promise<void>, timeout?: number) {
  testIt(label,
    // abort when the test takes more than one minute
    { timeout: timeout || 60000 },
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
    });
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

// define the command line arguments and parse them
// see https://github.com/tj/commander.js
program
  .description("Run a simple Agama integration test")
  .option("-u, --url <url>", "Agama server URL", "http://localhost")
  .option("-p, --password <password>", "Agama login password", "nots3cr3t")
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

const agamaInstall = booleanEnv("AGAMA_INSTALL", true);
const agamaUser = "bernhard";
const agamaUserFullName = "Bernhard M. Wiedemann";

describe("Agama test", function () {
  before(async function () {
    browser = await puppeteer.launch({
      // "webDriverBiDi" does not work with old FireFox, comment it out if needed
      protocol: "webDriverBiDi",
      headless: !options.headed,
      ignoreHTTPSErrors: true,
      timeout: 30000,
      slowMo: options.delay,
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
    let loginAsRoot = new LoginAsRootPage(page);
    loginAsRoot.logIn(options.password);
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
      let productSelection = new ProductSelectionPage(page);
      productSelection.selectTumbleweed();

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

  it("should display user dialog", async function () {
    let sidebar = new Sidebar(page);
    await sidebar.navigateToUsers();
  });

  it("should allow setting the root password", async function () {
    let userSection = new UsersPage(page);
    let passwordPopup = new RootPasswordDialog(page);
    await userSection.setPassword();
    await passwordPopup.setRootPassword(options.password);
  })

  it("should create first user", async function () {
    let usersSection = new UsersPage(page);
    let userPopup = new CreateUserDialog(page);
    await usersSection.defineAUser();
    await userPopup.createUser(agamaUserFullName, agamaUser, options.password);
  })

  it("should switch to overview", async function () {
    let sidebar = new Sidebar(page);
    await sidebar.navigateToOverview();
  })

  it("should be ready for installation", async function () {
    await page.locator("h4::-p-text('Ready for installation')").wait();
  });

  it("can launch installation", async function () {
    let overview = new OverviewPage(page);
    await overview.install();
  })

  it("can confirm installation", async function () {
    let popup = new ConfirmInstallationPopup(page);
    await popup.continue();
  })

  // Code without Page Object Model. 
  it("should start installation", async function () {
    await page.locator("::-p-text(Installing the)").wait();
  });

  it("should finish installation", async function () {
    let timeout = 15 * 60 * 1000;
    await page
      .locator("h2::-p-text('Congratulations!')")
      .setTimeout(timeout)
      .wait();
  });
});
