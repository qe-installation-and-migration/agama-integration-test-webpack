import { commaSeparatedList, parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { Option } from "commander";

import { logIn } from "./checks/login";
import { changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize } from "./checks/storage_change_root_partition";
import { changePatterns, selectADesktop } from "./checks/software";
import { prepareDasdStorage } from "./checks/storage_dasd";
import { finishInstallation, performInstallation } from "./checks/installation";

const options = parse((cmd) =>
  cmd
    .option("--patterns <pattern>...", "Comma-separated list of patterns", commaSeparatedList)
    .option("--install", "Proceed to install the system (the default is not to install it)")
    .option("--btrfs-without-snapshots", "Change the file system to Btrfs without snapshots")
    .option("--desktop <desktop>", "Select desktop to install on the system")
    .addOption(
      new Option(
        "--prepare-advanced-storage <storage-type>",
        "Prepare advance storage for installation",
      ).choices(["dasd", "zfcp"]),
    ),
);

test_init(options);

logIn(options.password);
if (options.btrfsWithoutSnapshots) changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize();
if (options.desktop) selectADesktop(options.desktop);
if (options.patterns) changePatterns(options.patterns);
if (options.prepareAdvancedStorage === "dasd") prepareDasdStorage();
if (options.install) {
  performInstallation();
  finishInstallation();
}
