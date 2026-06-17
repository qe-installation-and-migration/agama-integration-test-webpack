import { commaSeparatedList, parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { Option } from "commander";

import { logIn } from "./checks/login";
import { ProductStrategyFactory } from "./lib/product_strategy_factory";
import { takeStorageScreenshot } from "./checks/storage_change_root_partition";

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

const testStrategy = ProductStrategyFactory.create(
  options.productVersion,
  options.agamaWebUiPackageVersion,
);

logIn(options.password);
if (options.btrfsWithoutSnapshots)
  testStrategy.changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize();
if (options.desktop) testStrategy.selectDesktop(options.desktop);
if (options.patterns) testStrategy.changePatterns(options.patterns);
if (options.prepareAdvancedStorage === "dasd") testStrategy.prepareDasdStorage();
takeStorageScreenshot();
if (options.install) {
  testStrategy.performInstallation();
  testStrategy.finishInstallation();
}
