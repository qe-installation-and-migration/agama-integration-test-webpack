import fs from "fs";
import path from "path";

import puppeteer, { type Browser, type Page } from "puppeteer-core";

import { it as testIt, describe, before, after, skip } from "node:test";
import assert from "node:assert/strict";

import { booleanEnv, options, puppeteerLaunchOptions } from "../configuration";

import { LoginAsRootPage } from "../pages/login-as-root-page";
import { ProductSelectionPage } from "../pages/product-selection-page";

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
const configureDasd = booleanEnv("CONFIGURE_DASD", false);
const agamaUser = "bernhard";
const agamaUserFullName = "Bernhard M. Wiedemann";

describe("Agama test", function () {
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
      const productselection = new ProductSelectionPage(page);
      await productselection.selectTumbleweed();

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

    await page.locator("input#password").fill(options.password);
    await page.locator("input#passwordConfirmation").fill(options.password);
    await page.locator("button::-p-text(Confirm)").click();
  });

  it("should create first user", async function () {
    await page.locator("a[href='#/users']").click();
    let button: any = await Promise.any([
      page.waitForSelector("a[href='#/users/first']"),
      page.waitForSelector("button#actions-for-" + agamaUser)
    ]);

    const id = await button!.evaluate((x: { id: any; }) => x.id);
    // drop the handler to avoid memory leaks
    button!.dispose();

    // if the menu button was clicked we need to additionally press the "Discard" menu item
    if (id === "actions-for-" + agamaUser) {
      // button clicked with locator because a message disappear which changes its position
      await page.locator("button#actions-for-" + agamaUser).click();
      await page.locator("button[role='menuitem']::-p-text('Discard')").click();
      await page.locator("a[href='#/users/first']").click();
    }
    else {
      // button clicked with locator because a message disappear which changes its position
      await page.locator("a[href='#/users/first']").click();
    }

    await page.locator("input#userFullName").fill(agamaUserFullName);
    await page.locator("input#userName").fill(agamaUser);
    await page.locator("input#password").fill(options.password);
    await page.locator("input#passwordConfirmation").fill(options.password);
    await page.locator("button[form='firstUserForm']").click();
  });

  if (configureDasd) {
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
