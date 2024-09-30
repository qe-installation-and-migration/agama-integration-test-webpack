import { type Product, type ProtocolType } from "puppeteer-core";

import { program, Option } from "commander";
import * as commander from "commander";

// helper function for converting String to Boolean
function booleanEnv(name: string, default_value: boolean) {
  const env = process.env[name];
  if (env === undefined) {
    return default_value;
  }
  switch (env.toLowerCase()) {
    case "0":
    case "false":
    case "off":
    case "disabled":
    case "no":
      return false;
    case "1":
    case "true":
    case "on":
    case "enabled":
    case "yes":
      return true;
    default:
      return default_value;
  }
}

interface BrowserSettings {
  product: Product;
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

// parse command line argument as an integer
function getInt(value: string) {
  // parse the value as a decimal number (base 10)
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new commander.InvalidArgumentError("Enter a valid number.");
  }

  return parsed;
}

// define the command line arguments and parse them
// see https://github.com/tj/commander.js
program
  .description("Run a simple Agama integration test")
  .option("-u, --url <url>", "Agama server URL", "http://localhost")
  .option("-p, --password <password>", "Agama login password", "nots3cr3t")
  .addOption(new Option("-b, --browser <browser>", "Browser used for running the test")
    .choices(["firefox", "chrome", "chromium"])
    .default("firefox")
  )
  .option("-h, --headed", "Run the browser in headed mode with UI (the default is headless mode)")
  .addOption(new Option("-d, --delay <miliseconds>", "Delay between the browser actions, useful in headed mode")
    .argParser(getInt)
    .default(0)
  )
  .option("-c, --continue", "Continue the test after a failure (the default is abort on error)")
  .parse(process.argv);

// parse options from the command line
const options = program.opts();

const puppeteerLaunchOptions = {
  // "webDriverBiDi" does not work with old FireFox, comment it out if needed
  protocol: "webDriverBiDi" as ProtocolType,
  headless: !options.headed,
  ignoreHTTPSErrors: true,
  timeout: 30000,
  slowMo: options.delay,
  defaultViewport: {
    width: 1280,
    height: 768
  },
  ...browserSettings(options.browser)
}

export { booleanEnv, options, puppeteerLaunchOptions };
