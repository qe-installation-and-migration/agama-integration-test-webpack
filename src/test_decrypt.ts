import { parse, commaSeparatedList } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { ProductStrategyFactory } from "./lib/product_strategy_factory";

import { createFirstUser } from "./checks/first_user";
import { decryptDevice } from "./checks/decryption";
import { editRootUser } from "./checks/root_authentication";
import { logIn } from "./checks/login";
import { finishInstallation } from "./checks/installation";
import { productSelection, productSelectionWithLicense } from "./checks/product_selection";

const options = parse((cmd) =>
  cmd
    .option("--install", "Proceed to install the system (the default is not to install it)")
    .option("--product-id <id>", "Product id to select a product to install", "none")
    .option(
      "--accept-license",
      "Accept license for a product with license (the default is a product without license)",
    )
    .option("--use-custom-registration-server", "Enable custom registration server")
    .option("--provide-registration-code", "provide registration code for customer registration")
    .option("--registration-code <code>", "Registration code")
    .option("--decrypt-password <password>", "Password to decrypt an existing encrypted partition")
    .option(
      "--destructive-actions <actions>...",
      "comma separated list of actions (excluding 'Delete ')",
      commaSeparatedList,
    ),
);

test_init(options);

const testStrategy = ProductStrategyFactory.create(options.productVersion, options.agamaVersion);

logIn(options.password);
if (options.productId !== "none") {
  if (options.acceptLicense) productSelectionWithLicense(options.productId);
  else productSelection(options.productId);
}
decryptDevice(options.decryptPassword);
testStrategy.overviewLanding();
testStrategy.verifyDecryptDestructiveActions(options.destructiveActions);
if (options.registrationCode)
  testStrategy.enterProductRegistration({
    use_custom: options.useCustomRegistrationServer,
    code: options.registrationCode,
    provide_code: options.provideRegistrationCode,
  });
createFirstUser(options.password);
editRootUser(options.rootPassword);
if (options.install) {
  testStrategy.performInstallation();
  finishInstallation();
}
