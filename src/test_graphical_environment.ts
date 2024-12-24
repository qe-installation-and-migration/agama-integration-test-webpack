// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { describe } from "node:test";

import { parse } from "./lib/cmdline";
import { Option } from "commander";
import { test_init, Desktop } from "./lib/helpers";

import { logIn } from "./checks/login";
import { performInstallation } from "./checks/installation";
import { selectSinglePattern } from "./checks/software_selection";

// parse options from the command line
const options = parse((cmd) =>
  cmd
    .addOption(
      new Option("--desktop <name>", "Desktop to install")
        .choices(Object.keys(Desktop))
        .default("none"),
    )
    .option("--install", "Proceed to install the system (the default is not to install it)"),
);

describe("Installation with a graphical environment", function () {
  test_init(options);

  logIn(options.password);
  selectSinglePattern(Desktop[options.desktop]);
  if (options.install) performInstallation();
});
