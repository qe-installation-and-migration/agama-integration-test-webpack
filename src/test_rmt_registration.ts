// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html

import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { logIn } from "./checks/login";
import { enterRegistrationRegUrl } from "./checks/registration";
import { performInstallation } from "./checks/installation";

// parse options from the command line
const options = parse((cmd) =>
  cmd
    .option("--registration-code <code>", "Optional RMT registration code")
    .option("--install", "Proceed to install the system (the default is not to install it"),
);

test_init(options);
logIn(options.password);
enterRegistrationRegUrl(options.registrationCode);
if (options.install) performInstallation();
