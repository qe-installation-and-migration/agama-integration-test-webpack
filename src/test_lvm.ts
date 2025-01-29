// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html

import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { changeInstallationDeviceToLvm } from "./checks/storage_select_installation_device";
import { logIn } from "./checks/login";
import { performInstallation } from "./checks/installation";
import { prepareDasdStorage } from "./checks/storage_dasd";

// parse options from the command line
const options = parse((cmd) =>
  cmd
    .option("--dasd", "Prepare DASD storage (the default is not to prepare it)")
    .option("--install", "Proceed to install the system (the default is not to install it)"),
);

test_init(options);
logIn(options.password);
if (options.dasd) prepareDasdStorage();
changeInstallationDeviceToLvm();
if (options.install) performInstallation();
