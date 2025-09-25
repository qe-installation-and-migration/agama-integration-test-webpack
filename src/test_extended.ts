import { parse, commaSeparatedList } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { createFirstUser } from "./checks/first_user";
import { changeDeviceToInstall } from "./checks/storage_change_device_to_install";
import { decryptDevice } from "./checks/decryption";
import { editRootUser, verifyPasswordStrength } from "./checks/root_authentication";
import { enableEncryption, verifyEncryptionEnabled, disableEncryption } from "./checks/encryption";
import { enterRegistration } from "./checks/registration";
import { logIn } from "./checks/login";
import { performInstallation, checkInstallation, finishInstallation } from "./checks/installation";
import { prepareZfcpStorage } from "./checks/storage_zfcp";
import { productSelection, productSelectionWithLicense } from "./checks/product_selection";
import { setPermanentHostname } from "./checks/hostname";
import { downloadLogs } from "./checks/download_logs";

// parse options from the command line
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
    .option("--install", "Proceed to install the system (the default is not to install it)")
    .option("--decrypt-password <password>", "Password to decrypt an existing encrypted partition")
    .option(
      "--destructive-actions <actions>...",
      "comma separated list of actions (excluding 'Delete ')",
      commaSeparatedList,
    ),
);

test_init(options);
logIn(options.password);
if (options.productId !== "none")
  if (options.acceptLicense) productSelectionWithLicense(options.productId);
  else productSelection(options.productId);
decryptDevice(options.decryptPassword);
if (options.staticHostname) setPermanentHostname(options.staticHostname);
enableEncryption(options.password);
if (options.registrationCode)
  enterRegistration({
    use_custom: options.useCustomRegistrationServer,
    code: options.registrationCode,
    provide_code: options.provideRegistrationCode,
  });
verifyEncryptionEnabled();
disableEncryption();
changeDeviceToInstall();
createFirstUser(options.password);
editRootUser(options.rootPassword);
verifyPasswordStrength();
if (options.prepareAdvancedStorage === "zfcp") prepareZfcpStorage();
downloadLogs();
if (options.install) {
  performInstallation();
  checkInstallation();
  finishInstallation();
}
