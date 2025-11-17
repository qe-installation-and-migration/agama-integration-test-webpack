import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { ProductStrategyFactory } from "./lib/product_strategy_factory";

import { createFirstUser } from "./checks/first_user";
import { editRootUser } from "./checks/root_authentication";
import { enterProductRegistration } from "./checks/registration";
import { logIn } from "./checks/login";
import { performInstallation, checkInstallation, finishInstallation } from "./checks/installation";
import { productSelection, productSelectionWithLicense } from "./checks/product_selection";
import { setPermanentHostname } from "./checks/hostname";
import { downloadLogs } from "./checks/download_logs";

const options = parse((cmd) =>
  cmd
    .option("--product-id <id>", "Product id to select a product to install", "none")
    .option(
      "--accept-license",
      "Accept license for a product with license (the default is a product without license)",
    )
    .option("--registration-code <code>", "Registration code")
    .option("--use-custom-registration-server", "Enable custom registration server")
    .option("--provide-registration-code", "provide registration code for customer registration")
    .option("--staticHostname <hostname>", "Static Hostname")
    .option("--install", "Proceed to install the system (the default is not to install it)"),
);

test_init(options);

const testStrategy = ProductStrategyFactory.create(options.agamaVersion);

logIn(options.password);
if (options.productId !== "none")
  if (options.acceptLicense) productSelectionWithLicense(options.productId);
  else productSelection(options.productId);
if (options.staticHostname) setPermanentHostname(options.staticHostname);
testStrategy.enableEncryption(options.password);
if (options.registrationCode)
  enterProductRegistration({
    use_custom: options.useCustomRegistrationServer,
    code: options.registrationCode,
    provide_code: options.provideRegistrationCode,
  });
testStrategy.verifyEncryptionEnabled();
testStrategy.disableEncryption();
createFirstUser(options.password);
editRootUser(options.rootPassword);
testStrategy.verifyPasswordStrength();
if (options.prepareAdvancedStorage === "zfcp") testStrategy.prepareZfcpStorage();
downloadLogs();
if (options.install) {
  performInstallation();
  checkInstallation();
  finishInstallation();
}
