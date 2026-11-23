import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { Option } from "commander";

import { logIn } from "./checks/login";
import { finishInstallationCongratulation, performInstallation } from "./checks/installation";
import { setOnlyInstallationNetwork } from "./checks/network";
import { addLVMVolumeGroup } from "./checks/storage_select_installation_device";

const options = parse((cmd) =>
  cmd
    .option("--install", "Proceed to install the system (the default is not to install it)")
    .option(
      "--connections-only-for-installation",
      "The connections will be used only during installation",
    )
    .addOption(
      new Option(
        "--prepare-advanced-storage <storage-type>",
        "Prepare advance storage for installation",
      ).choices(["dasd", "zfcp"]),
    ),
);

test_init(options);

logIn(options.password);
addLVMVolumeGroup();
if (options.connectionsOnlyForInstallation) setOnlyInstallationNetwork();
if (options.install) {
  performInstallation();
  finishInstallationCongratulation();
}
