
// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { describe } from "node:test";

import { parse } from "./lib/cmdline";
import { test_init, ProductId } from "./lib/helpers";

import { logIn } from "./checks/login";
import { performInstallation } from "./checks/installation";
import { changeInstallationDeviceToLvm } from "./checks/storage_select_installation_device";

// parse options from the command line
const options = parse((cmd) =>
    cmd.option("--install", "Proceed to install the system (the default is not to install it)"));

describe("Installation with LVM)", function () {
    test_init(options);

    logIn(options.password);
    changeInstallationDeviceToLvm();
    if (options.install) performInstallation();
});
