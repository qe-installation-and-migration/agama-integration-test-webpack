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
  page.setDefaultTimeout(20000);
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
async function dumpPage(label: string) {
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
          // dump the current page
          if (!fs.existsSync(dir)) fs.mkdirSync(dir);
          // dump the page and the CSS in parallel
          await Promise.allSettled([dumpPage(label), dumpCSS()]);
        }
        throw new Error("Test failed!", { cause: error });
      }
    }
  );
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getTextContent(
  locator: puppeteer.Locator<Element>,
): Promise<string> {
  const handle = await locator.waitHandle();
  return await handle.evaluate((el) => el.textContent?.trim() || "");
}

export function getValue(locator): Promise<string> {
  return locator.map((element) => element.value).wait();
}

// eslint-disable-next-line
export type GConstructor<T = {}> = new (...args: any[]) => T;

export async function waitOnFile(filePath: string): Promise<void> {
  const opts = {
    resources: [filePath],
    delay: 1000,
    timeout: 20000,
    window: 2000,
  };

  try {
    await waitOn(opts);
  } catch (error) {
    throw new Error("waitOnFile failed!", { cause: error });
  }
};
