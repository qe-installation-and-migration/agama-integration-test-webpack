import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { ProductStrategyFactory } from "./lib/product_strategy_factory";

import { logIn } from "./checks/login";

const options = parse((cmd) =>
  cmd.option("--install", "Proceed to install the system (the default is not to install it)"),
);

test_init(options);

const testStrategy = ProductStrategyFactory.create(
  options.productVersion,
  options.agamaWebUiPackageVersion,
);

logIn(options.password);
testStrategy.setupWholeDiskForHome();
testStrategy.configureBootDevice();
if (options.install) {
  testStrategy.performInstallation();
  testStrategy.finishInstallation();
}
