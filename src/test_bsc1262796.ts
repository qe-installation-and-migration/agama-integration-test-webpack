import { parse, commaSeparatedList } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { ProductStrategyFactory } from "./lib/product_strategy_factory";

import { logIn } from "./checks/login";

const options = parse((cmd) =>
  cmd
    .option("--registration-code <code>", "Registration code")
    .option("--registration-code-ha <code>", "Registration code for Extension High Availability")
    .option("--patterns <pattern>...", "Comma-separated list of patterns", commaSeparatedList)
    .option("--install", "Proceed to install the system (the default is not to install it)")
    .option("--use-custom-registration-server", "Enable custom registration server")
    .option("--provide-registration-code", "Provide registration code for customer registration"),
);

test_init(options);

const testStrategy = ProductStrategyFactory.create(
  options.productVersion,
  options.agamaWebUiPackageVersion,
);

logIn(options.password);
testStrategy.ensureLandingOnOverview();
if (options.registrationCode)
  testStrategy.enterProductRegistration({
    use_custom: options.useCustomRegistrationServer,
    code: options.registrationCode,
    provide_code: options.provideRegistrationCode,
  });
if (options.registrationCodeHa)
  testStrategy.enterExtensionRegistrationHA(options.registrationCodeHa);
if (options.patterns) testStrategy.changePatterns(options.patterns);
testStrategy.createFirstUser(options.password);
testStrategy.editRootUser(options.rootPassword);
if (options.install) {
  testStrategy.performInstallation();
  testStrategy.finishInstallation();
}
