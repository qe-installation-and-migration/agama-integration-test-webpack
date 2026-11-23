import { commaSeparatedList, parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { Option } from "commander";

import { logIn } from "./checks/login";
import { finishInstallationCongratulation, performInstallation } from "./checks/installation";
import { selectPatterns } from "./checks/software";
import { changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize } from "./checks/storage_change_root_partition";

const options = parse((cmd) =>
  cmd
    .option("--patterns <pattern>...", "Comma-separated list of patterns", commaSeparatedList)
    .option("--install", "Proceed to install the system (the default is not to install it)")
    .option("--btrfs-without-snapshots", "Change the file system to Btrfs without snapshots")
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
if (options.patterns) selectPatterns(options.patterns);
if (options.install) {
  performInstallation();
  finishInstallationCongratulation();
}
