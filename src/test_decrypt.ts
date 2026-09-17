import { parse, commaSeparatedList } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { decryptDevice } from "./checks/decryption";
import { logIn } from "./checks/login";
import { Option } from "commander";
import { ProductStrategyFactory } from "./lib/product_strategy_factory";
import { productSelection, productSelectionWithLicenseAndMode } from "./checks/product_selection";

const options = parse((cmd) =>
  cmd
    .option("--install", "Proceed to install the system (the default is not to install it)")
    .option("--product-id <id>", "Product id to select a product to install", "none")
    .addOption(
      new Option("--product-mode <mode>", "Select product mode")
        .choices(["Standard", "Immutable"])
        .default("none", "Default value set to 'none' (No mode selected)"),
    )
    .option(
      "--accept-license",
      "Accept license for a product with license (the default is a product without license)",
    )
    .option("--use-custom-registration-server", "Enable custom registration server")
    .option("--provide-registration-code", "Provide registration code for customer registration")
    .option("--registration-code <code>", "Registration code")
    .option("--decrypt-password <password>", "Password to decrypt an existing encrypted partition")
    .option(
      "--destructive-actions <actions>...",
      "Comma-separated list of actions (excluding 'Delete ')",
      commaSeparatedList,
    ),
);

test_init(options);

const testStrategy = ProductStrategyFactory.create(
  options.productVersion,
  options.agamaWebUiPackageVersion,
);

logIn(options.password);
if (options.productId !== "none")
  if (options.acceptLicense)
    productSelectionWithLicenseAndMode(
      options.productId,
      options.productMode,
      options.productVersion,
    );
  else productSelection(options.productId);
decryptDevice(options.decryptPassword);
testStrategy.ensureLandingOnOverview();
testStrategy.verifyDecryptDestructiveActions(options.destructiveActions);
if (options.registrationCode)
  testStrategy.enterProductRegistration({
    use_custom: options.useCustomRegistrationServer,
    code: options.registrationCode,
    provide_code: options.provideRegistrationCode,
  });
testStrategy.createFirstUser(options.password);
testStrategy.editRootUser(options.rootPassword);
if (options.install) {
  testStrategy.performInstallation();
  testStrategy.finishInstallation();
}
