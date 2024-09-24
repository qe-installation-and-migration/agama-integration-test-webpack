import fs from "fs";
import path from "path";

import puppeteer, { type Browser, type Page } from "puppeteer-core";
import { program, Option } from "commander";
import * as commander from "commander";
import { describe, it as testIt, before, after, afterEach, skip } from "node:test";
import assert from "node:assert/strict";
import { LoginAsRootPage } from "./pages/login-as-root-page";
import { SidebarPage } from "./pages/sidebar-page";
import { SoftwarePage } from "./pages/software-page";
import { SoftwareSelectionPage } from "./pages/software-selection-page";

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

const agamaInstall = booleanEnv("AGAMA_INSTALL", true);
const configureDasd = booleanEnv("AGAMA_DASD", false);
const agamaDesktop = booleanEnv("AGAMA_DESKTOP", false);

const agamaUser = "bernhard";
const agamaUserFullName = "Bernhard M. Wiedemann";

describe("software selection", function () {
  before(async function () {
    browser = await puppeteer.launch(puppeteerLaunchOptions);
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
    const loginAsRoot = new LoginAsRootPage(page);
    await loginAsRoot.logIn(options.password);
  });

  it("should select gnome pattern", async function () {
    const sidebar = new SidebarPage(page);
    const software = new SoftwarePage(page);
    const softwareSelection = new SoftwareSelectionPage(page);

    await sidebar.goToSoftware();
    await software.changeSelection();
    await softwareSelection.selectGnomeDesktopEnvironment();
    await softwareSelection.close();
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
