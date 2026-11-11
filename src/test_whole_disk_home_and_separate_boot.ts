import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { logIn } from "./checks/login";
import { finishInstallationCongratulation, performInstallation } from "./checks/installation";
import { configureBootDevice } from "./checks/storage_boot_options";
import { setupWholeDiskForHome } from "./checks/storage_disk_without_partitions";

const options = parse((cmd) =>
  cmd.option("--install", "Proceed to install the system (the default is not to install it)"),
);

test_init(options);

logIn(options.password);
setupWholeDiskForHome();
configureBootDevice();
if (options.install) {
  performInstallation();
  finishInstallationCongratulation();
}
