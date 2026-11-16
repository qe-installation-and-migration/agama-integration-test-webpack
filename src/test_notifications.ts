import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { Option } from "commander";

import { logIn, logInWithIncorrectPassword } from "./checks/login";
import { productSelection, productSelectionWithLicenseAndMode } from "./checks/product_selection";
import { ensureLandingOnOverview } from "./checks/overview";
import { enterProductRegistration, verifyRegistrationWarniningAlerts } from "./checks/registration";
import { changeDeviceToInstallTheSystem } from "./checks/storage_change_device_to_install";
import {
  createAdministratorAccount,
  editRootUserLoginMethod,
  verifyPasswordStrength,
} from "./checks/authentication";
import { checkInstallation, finishInstallation, performInstallation } from "./checks/installation";

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
    .option("--install", "Proceed to install the system (the default is not to install it)"),
);

test_init(options);

logInWithIncorrectPassword();
logIn(options.password);
if (options.productId !== "none")
  if (options.acceptLicense)
    productSelectionWithLicenseAndMode(
      options.productId,
      options.productMode,
      options.productVersion,
    );
  else productSelection(options.productId);
ensureLandingOnOverview();
verifyRegistrationWarniningAlerts();
if (options.registrationCode)
  enterProductRegistration({
    use_custom: options.useCustomRegistrationServer,
    code: options.registrationCode,
    provide_code: options.provideRegistrationCode,
    url: options.registrationServerUrl,
  });
changeDeviceToInstallTheSystem();
createAdministratorAccount(options.password);
editRootUserLoginMethod(options.rootPassword);
verifyPasswordStrength();
if (options.install) {
  performInstallation();
  checkInstallation();
  finishInstallation();
}
