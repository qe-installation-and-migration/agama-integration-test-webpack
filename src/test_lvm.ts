import { parse, commaSeparatedList } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { Option } from "commander";

import { logIn } from "./checks/login";
import { prepareDasdStorage } from "./checks/storage_dasd";
import { addLVMVolumeGroup } from "./checks/storage_select_installation_device";
import { setOnlyInstallationNetwork } from "./checks/network";
import { finishInstallation, performInstallation } from "./checks/installation";

const options = parse((cmd) =>
  cmd
    .option("--install", "Proceed to install the system (the default is not to install it)")
    .option(
      "--connections-only-for-installation",
      "The connections will be used only during installation",
    )
    .option(
      "--lvm-additional-disks <disk-name>",
      "Specify a list of additional disks to configure the volume group, without /dev/ prefix (e.g., vdb)",
      commaSeparatedList,
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
if (options.prepareAdvancedStorage === "dasd") prepareDasdStorage();
addLVMVolumeGroup(options.lvmAdditionalDisks);
if (options.connectionsOnlyForInstallation) setOnlyInstallationNetwork();
if (options.install) {
  performInstallation();
  finishInstallation();
}
