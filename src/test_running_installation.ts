// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { describe } from "node:test";

import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { finishInstallation } from "./checks/installation";
import { logIn } from "./checks/login";

const options = parse();

describe("Running installation", function () {
  test_init(options);

  logIn(options.password);
  finishInstallation();
});
