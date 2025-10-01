import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { logIn } from "./checks/login";
import { enterRegistration } from "./checks/registration";
import { performInstallation, finishInstallation } from "./checks/installation";

// parse options from the command line
const options = parse((cmd) =>
  cmd
    .option("--use-custom-registration-server", "Enable custom registration server")
    .option("--registration-server-url <url>", "Custom registration url")
    .option("--registration-code <code>", "Custom registration code")
    .option("--install", "Proceed to install the system (the default is not to install it"),
);

test_init(options);
logIn(options.password);
enterRegistration({
  use_custom: options.useCustomRegistrationServer,
  url: options.registrationServerUrl,
  code: options.registrationCode,
});
if (options.install) {
  performInstallation();
  finishInstallation();
}
