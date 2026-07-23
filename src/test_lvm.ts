import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { Option } from "commander";

import { logIn } from "./checks/login";
import { ProductStrategyFactory } from "./lib/product_strategy_factory";

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

const testStrategy = ProductStrategyFactory.create(
  options.productVersion,
  options.agamaWebUiPackageVersion,
);

logIn(options.password);
if (options.prepareAdvancedStorage === "dasd") testStrategy.prepareDasdStorage();
testStrategy.selectMoreDevices();
if (options.connectionsOnlyForInstallation) testStrategy.setOnlyInstallationNetwork();
if (options.install) {
  testStrategy.performInstallation();
  testStrategy.finishInstallation();
}
