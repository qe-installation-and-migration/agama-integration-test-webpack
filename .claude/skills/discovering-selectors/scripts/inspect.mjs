#!/usr/bin/env node
// node .claude/skills/discovering-selectors/scripts/inspect.mjs
import * as puppeteer from "puppeteer-core";

// ---- adjust per instance -----------------------------------------------
const URL = "https://agama.local";
const PASSWORD = "nots3cr3t";
const PRODUCT = { id: "SLES", mode: "Standard", license: true };
// ------------------------------------------------------------------------

const browser = await puppeteer.launch({
  protocol: "webDriverBiDi",
  browser: "firefox",
  executablePath: "/usr/bin/firefox",
  headless: true,
  acceptInsecureCerts: true,
  defaultViewport: { width: 1280, height: 800 },
});
const page = await browser.newPage();

/** Print every visible element that could carry an accessible name, one per line. */
const dump = async (label) => {
  console.log(`\n===== ${label} =====`);
  const rows = await page.evaluate(() =>
    [...document.querySelectorAll("a, button, input, select, textarea, [role], [aria-label]")]
      .filter((el) => el.getClientRects().length)
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute("role"),
        ariaLabel: el.getAttribute("aria-label"),
        text: (el.innerText || "").replace(/\s+/g, " ").trim().slice(0, 80),
        id: el.id,
      })),
  );
  for (const r of rows)
    console.log(
      `${r.tag.padEnd(8)} role=${String(r.role).padEnd(11)} aria=${String(r.ariaLabel).padEnd(26)} id=${String(r.id).padEnd(12)} text="${r.text}"`,
    );
};

/** Prove a candidate resolves before writing it into a page object. */
const prove = async (label, selector) => {
  try {
    await page.locator(selector).setTimeout(5000).wait();
    console.log(`OK   ${label}: ${selector}`);
  } catch {
    console.log(`FAIL ${label}: ${selector}`);
  }
};

const logIn = async () => {
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await page.locator("input#password").fill(PASSWORD);
  await page.locator("button[type='submit']").click();
};

const waitForOverview = () =>
  page
    .locator('::-p-aria([name="System Information"][role="heading"])')
    .setTimeout(180 * 1000)
    .wait();

/**
 * Most screens only hold meaningful state once a product is selected. Idempotent: an instance
 * that already has a product selected lands on the overview, so this is a no-op there.
 */
const selectProduct = async ({ id, mode, license }) => {
  const selectButton = await page.$("button[form='productSelectionForm']");
  if (!selectButton) {
    console.log("product already selected, skipping product selection");
    return waitForOverview();
  }
  await page.locator(`input#${id.replaceAll(".", "\\.")}`).click();
  if (mode) await page.locator(`::-p-aria([name="${mode}"])`).click();
  if (license) {
    const accepted = await page.evaluate(
      () => document.querySelector("input[type='checkbox']")?.checked === true,
    );
    if (!accepted) await page.locator("::-p-text(I have read and)").click();
  }
  await page.locator("button[form='productSelectionForm']").click();
  return waitForOverview();
};

await logIn();
await selectProduct(PRODUCT);

// ...navigate to the screen under test, then dump candidates and prove the ones you picked:
await dump("SCREEN UNDER TEST");

await browser.close();
