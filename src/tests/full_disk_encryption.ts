import puppeteer, { type Browser, type Page } from "puppeteer-core";

import { describe, before, after } from "node:test";
import assert from "node:assert/strict";

import { booleanEnv, options, it, puppeteerLaunchOptions } from "../configuration";

import { LoginAsRootPage } from "../pages/login-as-root-page";
import { StoragePage } from "../pages/storage-page";
import { StorageEncryptionPage } from "../pages/storage-encryption-page";
import { SidebarPage } from "../pages/sidebar-page";

let page: Page;
let browser: Browser;

const agamaInstall = booleanEnv("AGAMA_INSTALL", true);

describe("full disk encryption", function () {
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
