import fs from "fs";
import path from "path";

import * as puppeteer from "puppeteer-core";
// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { it as testIt, before, after } from "node:test";

export let page: puppeteer.Page;
let browser: puppeteer.Browser;

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

export async function startBrowser(headless: boolean, slowMo: number, agamaBrowser: string, agamaServer: string) {
  browser = await puppeteer.launch({
    // "webDriverBiDi" does not work with old FireFox, comment it out if needed
    protocol: "webDriverBiDi",
    headless,
    ignoreHTTPSErrors: true,
    timeout: 30000,
    slowMo,
    defaultViewport: {
      width: 1280,
      height: 768
    },
    ...browserSettings(agamaBrowser)
  });

  page = await browser.newPage();
  page.setDefaultTimeout(20000);
  await page.goto(agamaServer, { timeout: 60000, waitUntil: "domcontentloaded" });
  return { page, browser };
};

export async function finishBrowser() {
  if (page) await page.close();
  if (browser) await browser.close();
}

export function test_init(options) {
  before(async function () {
    ({ page } = await startBrowser(options.headless, options.slowMo, options.browser, options.url));
  });

  after(async function () {
    await finishBrowser();
  })
}

let failed = false;
let continueOnError = false;

// define it() as a wrapper which dumps the page on a failure
export async function it(label: string, test: () => Promise<void>) {
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
        if (!continueOnError) failed = true;
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
