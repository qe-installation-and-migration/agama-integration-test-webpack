import { parse, commaSeparatedList } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { logIn } from "./checks/login";
import { selectPatterns } from "./checks/software_selection";
import { ProductStrategyFactory } from "./lib/product_strategy_factory";

const options = parse((cmd) =>
  cmd
    .option("--register-package-hub", "Registration for PackageHub")
    .option("--patterns <pattern>...", "comma-separated list of patterns", commaSeparatedList),
);

const testStrategy = ProductStrategyFactory.create(options.productVersion, options.agamaVersion);

test_init(options);
logIn(options.password);
testStrategy.enterExtensionRegistrationPHub();
selectPatterns(options.patterns);
testStrategy.verifyStorageOutOfSync();
testStrategy.performInstallation();
testStrategy.finishInstallation();
