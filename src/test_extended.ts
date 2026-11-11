import { parse, commaSeparatedList } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { Option } from "commander";

import { logIn } from "./checks/login";
import { productSelection, productSelectionWithLicenseAndMode } from "./checks/product_selection";
import { ensureLandingOnOverview } from "./checks/overview";
import { verifySoftwareSelectionNotAvailable } from "./checks/software";
import { verifyAppearanceChanges } from "./checks/appearance";
import {
  downloadConfiguration,
  showConfiguration,
} from "./checks/installation_settings_in_json_format";
import { configureTimeSynchronizationServers, setStaticHostname } from "./checks/system";
import { disableEncryption, enableEncryption, verifyEncryptionEnabled } from "./checks/encryption";
import { enterProductRegistration } from "./checks/registration";
import { createAdministratorAccount, editRootUserLoginMethod } from "./checks/authentication";
import { prepareZfcpStorage } from "./checks/storage_zfcp";
import { downloadLogs } from "./checks/download_logs";
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
    .option("--staticHostname <hostname>", "Static Hostname")
    .option(
      "--ntpServerAddresses <ntpServers>...",
      "Comma-separated list of NTP servers",
      commaSeparatedList,
    )
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
verifySoftwareSelectionNotAvailable();
verifyAppearanceChanges();
showConfiguration();
downloadConfiguration();
if (options.staticHostname) setStaticHostname(options.staticHostname);
if (options.ntpServerAddresses) configureTimeSynchronizationServers(options.ntpServerAddresses);
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
createAdministratorAccount(options.password);
editRootUserLoginMethod(options.rootPassword);
if (options.prepareAdvancedStorage === "zfcp") prepareZfcpStorage();
downloadLogs();
if (options.install) {
  performInstallation();
  checkInstallation();
  finishInstallation();
}
