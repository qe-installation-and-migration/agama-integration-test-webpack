// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html
import * as puppeteer from "puppeteer-core";
import { it, before, after } from "node:test";
import { parse, commaSeparatedList } from "./lib/cmdline";
// import { test_init } from "./lib/helpers";
import { sleep } from "./lib/helpers";

import { verifyNotImplemented, verifyNotSupported, abort } from "./checks/autoyast_unsupported";
import { logIn } from "./checks/login";

import { LoginAsRootPage } from "./pages/login_as_root_page";
import { AutoyastUnsupportedPage } from "./pages/autoyast_unsupported_page";
import assert from "node:assert/strict";
import { text } from "node:stream/consumers";

// parse options from the command line
const options = parse((cmd) =>
  cmd
    .option(
      "--not-implemented <elements>",
      "comma-separated list of not implemented yet elements",
      commaSeparatedList,
    )
    .option(
      "--not-supported <elements>",
      "comma-separated list of not supported elements",
      commaSeparatedList,
    ),
);

let page: puppeteer.Page;
let browser: puppeteer.Browser;
let url: string;

interface BrowserSettings {
  product: puppeteer.Product;
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
    ignoreHTTPSErrors: true,
    timeout: 30000,
    slowMo,
    defaultViewport: {
      width: 1280,
      height: 800,
    },
    ...browserSettings(agamaBrowser),
  });
  return browser;
  // page = await browser.newPage();
  // page.setDefaultTimeout(20000);
  // await page.goto(agamaServer, {
  //   timeout: 60000,
  //   waitUntil: "domcontentloaded",
  // });
  // return { page, browser };
}

async function finishBrowser() {
  if (page) {
    await page.close();
    page = null;
  }
  if (browser) {
    await browser.close();
    browser = null;
  }

}

// before(async function () {
//   ({ page } = await startBrowser(
//     !options.headed,
//     options.delay,
//     options.browser,
//     options.url
//   ));
// });


after(async function () {
  await finishBrowser();
});

it("before browser", async function () {
  browser = await startBrowser(
    !options.headed,
    options.delay,
    options.browser,
    options.url,
  );
});

it("before page", async function () {
  page = await browser.newPage();
  page.setDefaultTimeout(20000);
  await page.goto(options.url, {
    timeout: 60000,
    waitUntil: "domcontentloaded",
  });
});

// test_init(options);
it("should have Agama page title", async function () {
  assert.deepEqual(await page.title(), "Agama");
});

it("should allow logging in", async function () {
  const loginAsRoot = new LoginAsRootPage(page);

  await loginAsRoot.fillPassword(options.password);
  await loginAsRoot.logIn();
});

it("should display elements not supported", async function () {
  // let autoyastUnsupported = new AutoyastUnsupportedPage(page);
  // for (const element of options.notSupported) {
  //   let elementText = await page.locator(`::-p-aria([name="Not supported (29)"][role="region"]) ::-p-text(${element})`)
  //     .map(span => span.textContent)
  //     .wait();
  //   assert.deepEqual(elementText, `${element}`);

  // let elementHandler = await page.waitForSelector(`::-p-aria([name="Not supported (29)"][role="region"]) ::-p-text(${element})`);
  // let current = await elementHandler.evaluate(node => node.textContent);
  // assert.deepEqual(current, `${element}`);
  // elementHandler.dispose();

  // await page.locator(`::-p-text(Not supported) ::-p-text(${element})`).wait();

  await page.waitForSelector(`::-p-aria([name="Not supported (29)"][role="region"]) li span`);
  const elements = await page.$$(`::-p-aria([name="Not supported (29)"][role="region"]) li span`);
  const textElements = await Promise.all(
    elements.map(async (element) => {
      return await element.evaluate(node => node.textContent);
    })
  );
  assert.deepStrictEqual(textElements, options.notSupported);
});

// if (options.notImplemented) verifyNotImplemented(options.notImplemented);
// verifyNotSupported(options.notSupported);
// abort();



