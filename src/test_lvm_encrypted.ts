import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { logIn } from "./checks/login";
import { performInstallation } from "./checks/installation";
import { changeInstallationDeviceToLvm } from "./checks/storage_select_installation_device";
import { enableEncryption } from "./checks/encryption";

// parse options from the command line
const options = parse((cmd) =>
  cmd.option("--install", "Proceed to install the system (the default is not to install it)"),
);

test_init(options);
logIn(options.password);
changeInstallationDeviceToLvm();
enableEncryption(options.password);
if (options.install) performInstallation();
