// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html

import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { selectMoreDevices } from "./checks/storage_select_installation_device";
import { setOnlyInstallationNetwork } from "./checks/network";
import { logIn } from "./checks/login";
import { performInstallation, finishInstallation } from "./checks/installation";

// parse options from the command line
const options = parse((cmd) =>
  cmd
    .option("--install", "Proceed to install the system (the default is not to install it)")
    .option(
      "--connections-only-for-installation",
      "The connections will be used only during installation",
    ),
);

test_init(options);
logIn(options.password);
selectMoreDevices();
if (options.connectionsOnlyForInstallation) setOnlyInstallationNetwork();
if (options.install) {
  performInstallation();
  finishInstallation();
}
