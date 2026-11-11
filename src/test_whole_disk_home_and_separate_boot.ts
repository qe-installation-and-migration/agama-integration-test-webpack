import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { logIn } from "./checks/login";
import { setupWholeDiskForHome } from "./checks/storage_disk_without_partitions";
import { configureBootDevice } from "./checks/storage_boot_options";
import { finishInstallation, performInstallation } from "./checks/installation";

const options = parse((cmd) =>
  cmd.option("--install", "Proceed to install the system (the default is not to install it)"),
);

test_init(options);

logIn(options.password);
setupWholeDiskForHome();
configureBootDevice();
if (options.install) {
  performInstallation();
  finishInstallation();
}
