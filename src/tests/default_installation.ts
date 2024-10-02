import fs from "fs";
import path from "path";

import puppeteer, { type Browser, type Page } from "puppeteer-core";

import { it as testIt, describe, before, after, skip } from "node:test";
import assert from "node:assert/strict";

import { booleanEnv, options, puppeteerLaunchOptions } from "../configuration";


import { LoginAsRootPage } from "../pages/login-as-root-page";
import { ProductSelectionPage } from "../pages/product-selection-page";
import { SidebarPage } from "../pages/sidebar-page";
import { UsersPage } from "../pages/users-page";
import { SetARootPasswordPage } from "../pages/root-password-page";
import { CreateFirstUserPage } from "../pages/create-user-page"

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
const agamaDasd = booleanEnv("AGAMA_DASD", false);
const agamaProduct = process.env.AGAMA_PRODUCT || "tumbleweed";

const agamaUser = "bernhard";
const agamaUserFullName = "Bernhard M. Wiedemann";

describe("Agama test", function () {
  before(async function () {
    browser = await puppeteer.launch(puppeteerLaunchOptions);
    page = await browser.newPage();
    page.setDefaultTimeout(20000);
    await page.goto(options.url, { timeout: 60000, waitUntil: "domcontentloaded" });
    await page.waitForNetworkIdle({ idleTime: 1000 });
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

  it("should display the product selection dialog", async function () {
    const productselection = new ProductSelectionPage(page);

    let timeout = 2 * 60 * 1000;

    if (agamaProduct === "leap") {
      await productselection.selectLeap();
    }
    else {
      await productselection.selectTumbleweed();
    }
    // Check if configuration procedure is progressing
    await page.locator("::-p-text(Configuring the product)").wait();

    // refreshing the repositories might take long time
    await page.locator("h3::-p-text('Overview')").setTimeout(timeout).wait();
  });

  it("should display overview section", async function () {
    await page.locator("h3::-p-text('Overview')").wait();
  });

  it("should allow setting the root password", async function () {
    const sidebar = new SidebarPage(page);
    const users = new UsersPage(page);
    const setARootPassword = new SetARootPasswordPage(page);

    await sidebar.goToUsers();
    await users.setAPassword();
    await setARootPassword.fillPassword(options.password);
    await setARootPassword.fillPasswordConfirmation(options.password);
    await setARootPassword.confirm();

    // a popup to disappear which changes the positions of other elements
    // page.waitForNetworkIdle solves this issue
  });

  it("should create first user", async function () {
    const users = new UsersPage(page);
    const createFirstUser = new CreateFirstUserPage(page);
    await users.defineAUserNow();
    await createFirstUser.fillFullName(agamaUserFullName);
    await createFirstUser.fillUserName(agamaUser);
    await createFirstUser.fillPassword(options.password);
    await createFirstUser.fillPasswordConfirmation(options.password);
    await createFirstUser.accept();
  });

  if (agamaDasd) {
    it("should prepare storage", async function () {

      // Workaround, sometimes the UI seems not responsive
      await page.locator("a[href='#/storage']").click({ delay: 1000 });
      await page.locator("a[href='#/storage']").click({ delay: 1000 });
      await page.locator("a[href='#/storage/target-device']").click();
      await page.locator("span::-p-text('storage techs')").click();
      await page.locator("span::-p-text('DASD')").click({ delay: 1000 });

      // Enabling DASD device, by default it is always disabled
      await page.locator("input[name='checkrow0']").click({ delay: 1000 });
      await page.locator("span::-p-text('Perform an action')").click({ delay: 1000 });
      await page.locator("span::-p-text('Activate')").click();

      // Selecting installation device
      await page.locator("a[href='#/storage']").click();
      await page.locator("a[href='#/storage/target-device']").click({ delay: 1000 });
      await page.locator("input[aria-label='Select row 0']").click();
      await page.locator("button[form='targetSelection']").click();
    });
  }

  it("should be ready for installation", async function () {
    await page.locator("a[href='#/overview']").click();
    // In Overview, Storage section takes more time to refresh changing 
    // the position in the screen of text 'Ready for installation and button 'Install'
    // page.waitForNetworkIdle solves this issue
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
      await page
        .locator("h2::-p-text('Congratulations!')")
        .setTimeout(15 * 60 * 1000)
        .wait();
    }, 15 * 60 * 1000);
  }
});
