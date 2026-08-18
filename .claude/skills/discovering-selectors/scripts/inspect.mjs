#!/usr/bin/env node
// node .claude/skills/discovering-selectors/scripts/inspect.mjs
import * as puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  protocol: "webDriverBiDi",
  browser: "firefox",
  executablePath: "/usr/bin/firefox",
  headless: true,
  acceptInsecureCerts: true,
  defaultViewport: { width: 1280, height: 800 },
});
const page = await browser.newPage();
await page.goto("https://agama.local", { waitUntil: "domcontentloaded" });
await page.locator("input#password").fill("nots3cr3t");
await page.locator("button[type='submit']").click();
// ...navigate to the screen under test, then dump candidates:
console.log(
  await page.evaluate(() =>
    [...document.querySelectorAll("a, button, input, select, textarea, [role], [aria-label]")]
      .filter((el) => el.getClientRects().length)
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute("role"),
        ariaLabel: el.getAttribute("aria-label"),
        text: (el.innerText || "").replace(/\s+/g, " ").trim().slice(0, 80),
        id: el.id,
      })),
  ),
);
await browser.close();
