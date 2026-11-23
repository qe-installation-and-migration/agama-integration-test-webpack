import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { decryptDevice } from "./checks/decryption";
import { logIn } from "./checks/login";
import { Option } from "commander";
import { productSelection, productSelectionWithLicenseAndMode } from "./checks/product_selection";
import { ensureLandingOnOverview } from "./checks/overview";
import { verifyDecryptDestructiveActions } from "./checks/storage_result_destructive_actions_planned";
import { enterProductRegistration } from "./checks/registration";
import { createAdministratorAccount, editRootUserLoginMethod } from "./checks/authentication";
import { finishInstallation, performInstallation } from "./checks/installation";

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
    .option("--decrypt-password <password>", "Password to decrypt an existing encrypted partition"),
);

test_init(options);

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
ensureLandingOnOverview();
verifyDecryptDestructiveActions();
if (options.registrationCode)
  enterProductRegistration({
    use_custom: options.useCustomRegistrationServer,
    code: options.registrationCode,
    provide_code: options.provideRegistrationCode,
  });
createAdministratorAccount(options.password);
editRootUserLoginMethod(options.rootPassword);
if (options.install) {
  performInstallation();
  finishInstallation();
}
