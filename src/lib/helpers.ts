import fs from "fs";
import path from "path";
import http from "http";
import https from "https";
import zlib from "zlib";
import waitOn from "wait-on";

import * as puppeteer from "puppeteer-core";
// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { it as testIt, before, after } from "node:test";

export let page: puppeteer.Page;
let browser: puppeteer.Browser;
let url: string;

// directory for storing the dumped data after a failure
const dir = "log";

/**
 * Debug logging utility for development and troubleshooting.
 *
 * Set DEBUG_AGAMA=1 or DEBUG_AGAMA=true to enable debug output.
 *
 * Example:
 *   DEBUG_AGAMA=1 ./dist/test_default_installation.js
 *
 * @param message - The debug message to log
 */
function debugLog(message: string): void {
  if (process.env.DEBUG_AGAMA === "1" || process.env.DEBUG_AGAMA === "true") {
    console.log(`[Debug]: ${message}`);
  }
}

interface BrowserSettings {
  browser: puppeteer.SupportedBrowser;
  executablePath: string;
}

// helper function for configuring the browser
function browserSettings(name: string): BrowserSettings {
  switch (name.toLowerCase()) {
    case "firefox":
      return {
        browser: "firefox",
        executablePath: "/usr/bin/firefox",
      };
    case "chrome":
      return {
        browser: "chrome",
        executablePath: "/usr/bin/google-chrome-stable",
      };
    case "chromium":
      return {
        browser: "chrome",
        executablePath: "/usr/bin/chromium",
      };
    default:
      throw new Error(`Unsupported browser type: ${name}`);
  }
}

async function startBrowser(
  headless: boolean,
  slowMo: number,
  agamaBrowser: string,
  agamaServer: string
) {
  url = agamaServer;
  browser = await puppeteer.launch({
    // "webDriverBiDi" does not work with old FireFox, comment it out if needed
    protocol: "webDriverBiDi",
    headless,
    acceptInsecureCerts: true,
    timeout: 30000,
    // This timeout is increased due to DASD format step review in future changes
    protocolTimeout: 360000,
    slowMo,
    defaultViewport: {
      width: 1280,
      height: 800,
    },
    ...browserSettings(agamaBrowser),
  });

  page = await browser.newPage();
  page.setDefaultTimeout(30000);
  await page.goto(agamaServer, {
    timeout: 60000,
    waitUntil: "domcontentloaded",
  });
  return { page, browser };
}

async function finishBrowser() {
  if (page) await page.close();
  if (browser) await browser.close();
}

export function test_init(options) {
  // Create log directory at the start of test suite
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  before(async function () {
    ({ page } = await startBrowser(
      !options.headed,
      options.delay,
      options.browser,
      options.url
    ));
  });

  after(async function () {
    await finishBrowser();
  });
}

let failed = false;

let continueOnError = false;

export function setContinueOnError(enabled: boolean) {
  continueOnError = enabled;
}

// helper function, dump the index.css file so the HTML dump can properly displayed
async function dumpCSS() {
  const cssData = [];
  const downloader = url.startsWith("https://") ? https : http;
  return new Promise((resolve, reject) => {
    downloader
      .get(
        url + "/index.css",
        {
          // ignore HTTPS errors (self-signed certificate)
          rejectUnauthorized: false,
          // use gzip compression
          headers: { "Accept-Encoding": "gzip" },
        },
        (res) => {
          res.on("data", (chunk) => {
            cssData.push(Buffer.from(chunk, "binary"));
          });
          res.on("end", () => {
            // merge all chunks
            const data = Buffer.concat(cssData);
            const cssFile = dir + "/index.css";
            if (res.headers["content-encoding"] === "gzip") {
              zlib.gunzip(data, (err, unpacked) => {
                if (err) {
                  console.error("Cannot decompress index.css: ", err.cause);
                  reject(err.cause);
                } else {
                  fs.writeFileSync(cssFile, unpacked);
                  resolve(cssFile);
                }
              });
            } else {
              fs.writeFileSync(cssFile, data);
              resolve(cssFile);
            }
          });
        }
      )
      .on("error", (e) => {
        console.error("Cannot download index.css: ", e);
        reject(e);
      });
  });
}

// dump the current page displayed in puppeteer
// ts-prune-ignore-next
export async function dumpPage(dir: string, label: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  // base file name for the dumps
  const name = path.join(dir, label.replace(/[^a-zA-Z0-9]/g, "_"));
  await page.screenshot({ path: name + ".png" });
  const html = await page.content();
  fs.writeFileSync(name + ".html", html);
}

// define it() as a wrapper which dumps the page on a failure
export async function it(label: string, test: () => Promise<void>, timeout?: number) {
  testIt(
    label,
    // abort when the test takes more than one minute
    { timeout: timeout || 60000 },
    async (t) => {
      try {
        // do not run any test after first failure
        if (failed) t.skip();
        else await test();
      } catch (error) {
        // remember the failure for the next tests
        if (!continueOnError) failed = true;
        if (page) {
          // dump the page and the CSS in parallel
          await Promise.allSettled([dumpPage(dir, label), dumpCSS()]);
        }
        throw new Error("Test failed!", { cause: error });
      }
    }
  );
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getTextContent(locator, timeout: number = 30000): Promise<string> {
  return locator
    .map((element) => element.textContent)
    .setTimeout(timeout)
    .wait();
}

export function getValue(locator): Promise<string> {
  return locator.map((element) => element.value).wait();
}

export async function waitUntilOverlaySettled(action: () => Promise<void>) {
  const selector = '[role="alert"].agm-main-content-overlay';

  const start = Date.now();

  // Start watching for overlay BEFORE executing the action
  const appearancePromise = page.waitForSelector(selector, { visible: true, timeout: 10000 })
    .catch(() => {
      debugLog("Overlay did not appear within 10000ms after action. Moving on...");
      return null;
    });

  // Execute the action (e.g., clicking accept button)
  await action();

  // Wait for the overlay we started watching for
  const appeared = await appearancePromise;

  if (appeared) {
    debugLog("Overlay detected. Waiting for it to disappear...");

    await page.waitForSelector(selector, { hidden: true });

    const duration = Date.now() - start;
    debugLog(`Overlay cleared after ${duration}ms`);
  }
}

// eslint-disable-next-line
export type GConstructor<T = {}> = new (...args: any[]) => T;

export async function waitOnFile(filePath: string): Promise<void> {
  const opts = {
    resources: [filePath],
    delay: 3000,
    timeout: 30000,
    window: 4000,
  };

  try {
    await waitOn(opts);
  } catch (error) {
    throw new Error("waitOnFile failed!", { cause: error });
  }
};
