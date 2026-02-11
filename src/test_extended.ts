import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { Option } from "commander";
import { ProductStrategyFactory } from "./lib/product_strategy_factory";

import { logIn } from "./checks/login";
import { checkInstallation } from "./checks/installation";
import { downloadLogs } from "./checks/download_logs";
import { productSelection, productSelectionWithLicenseAndMode } from "./checks/product_selection";

const options = parse((cmd) =>
  cmd
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
    .option("--registration-code <code>", "Registration code")
    .option("--use-custom-registration-server", "Enable custom registration server")
    .option("--registration-server-url <url>", "Custom registration url")
    .option("--provide-registration-code", "Provide registration code for customer registration")
    .option("--staticHostname <hostname>", "Static Hostname")
    .option("--install", "Proceed to install the system (the default is not to install it)"),
);

test_init(options);

const testStrategy = ProductStrategyFactory.create(options.productVersion, options.agamaVersion);

testStrategy.logInWithIncorrectPassword();
logIn(options.password);
if (options.productId !== "none")
  if (options.acceptLicense)
    productSelectionWithLicenseAndMode(options.productId, options.productMode);
  else productSelection(options.productId);
testStrategy.ensureLandingOnOverview();
if (options.staticHostname) testStrategy.setPermanentHostname(options.staticHostname);
testStrategy.verifyRegistrationWarniningAlerts();
if (options.registrationCode)
  testStrategy.enterProductRegistration({
    use_custom: options.useCustomRegistrationServer,
    code: options.registrationCode,
    provide_code: options.provideRegistrationCode,
    url: options.registrationServerUrl,
  });
testStrategy.enableEncryption(options.password);
testStrategy.verifyEncryptionEnabled();
testStrategy.disableEncryption();
testStrategy.changeDiskToInstallTheSystem();
testStrategy.createFirstUser(options.password);
testStrategy.editRootUser(options.rootPassword);
testStrategy.verifyPasswordStrength();
if (options.prepareAdvancedStorage === "zfcp") testStrategy.prepareZfcpStorage();
downloadLogs();
if (options.install) {
  testStrategy.performInstallation();
  checkInstallation();
  testStrategy.finishInstallation();
}
