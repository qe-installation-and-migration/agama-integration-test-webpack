import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { Option } from "commander";

import { logIn } from "./checks/login";
import { createFirstUser, editRootUser } from "./checks/authentication";
import { downloadLogs } from "./checks/download_logs";
import { disableEncryption, enableEncryption, verifyEncryptionEnabled } from "./checks/encryption";
import {
  checkInstallation,
  finishInstallationCongratulation,
  performInstallation,
} from "./checks/installation";
import { ensureLandingOnOverview } from "./checks/overview";
import { enterProductRegistration } from "./checks/registration";
import { prepareZfcpStorage } from "./checks/storage_zfcp";
import { setPermanentHostname } from "./checks/system";
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
if (options.staticHostname) setPermanentHostname(options.staticHostname);
enableEncryption(options.password);
if (options.registrationCode)
  enterProductRegistration({
    use_custom: options.useCustomRegistrationServer,
    code: options.registrationCode,
    provide_code: options.provideRegistrationCode,
    url: options.registrationServerUrl,
  });
verifyEncryptionEnabled();
disableEncryption();
createFirstUser(options.password);
editRootUser(options.rootPassword);
if (options.prepareAdvancedStorage === "zfcp") prepareZfcpStorage();
downloadLogs();
if (options.install) {
  performInstallation();
  checkInstallation();
  finishInstallationCongratulation();
}
