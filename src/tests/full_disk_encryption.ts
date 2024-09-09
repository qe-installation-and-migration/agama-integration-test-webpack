import fs from "fs";
import path from "path";
import puppeteer, { type Browser, type Page, type Product } from "puppeteer-core";
import { program, Option } from "commander";
import * as commander from "commander";
import { describe, it as testIt, before, after } from "node:test";
import assert from "node:assert/strict";
import { LoginAsRootPage } from "../pages/login-as-root-page";
import { StoragePage } from "../pages/storage-page";
import { StorageEncryptionPage } from "../pages/storage-encryption-page";
import { SidebarPage } from "../pages/sidebar-page";

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

const options = program.opts();
const agamaInstall = booleanEnv("AGAMA_INSTALL", true);

describe("full disk encryption", function () {
  before(async function () {
    browser = await puppeteer.launch({
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

  it("should allows logging in", async function () {
    const loginAsRoot = new LoginAsRootPage(page);
    await loginAsRoot.logIn(options.password);
  });

  it("should enable encryption", async function () {
    const storage = new StoragePage(page);
    const storageEncryption = new StorageEncryptionPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storage.enableEncryption();
    await storageEncryption.encrypt(options.password);
    await storage.verifyEncryptionEnabled();
  });

  it("should be ready for installation", async function () {
    const sidebar = new SidebarPage(page);
    await sidebar.goToOverview();
    await page.locator("button::-p-text(Install)").wait();
  });

  if (agamaInstall === true) {
    it("should start installation", async function () {
      await page.locator("button::-p-text('Install')").click();
      await page.locator("button::-p-text('Continue')").click();
      await page.locator("::-p-text(Installing the)").wait();
    });

    it("should finish installation", async function () {
      await page
        .locator("h2::-p-text('Congratulations!')")
        .setTimeout(15 * 60 * 1000)
        .wait();
    }, 15 * 60 * 1000);
  }
});
