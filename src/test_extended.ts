// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html

import { parse, commaSeparatedList } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { logIn } from "./checks/login";
import { createFirstUser } from "./checks/first_user";
import { editRootUser } from "./checks/root_authentication";
import { enterRegistration } from "./checks/registration";
import { setPermanentHostname } from "./checks/hostname";
import { decryptDevice } from "./checks/decryption";
import { verifyDecryptDestructiveActions } from "./checks/storage_result_destructive_actions_planned";
import { productSelection, productSelectionWithLicense } from "./checks/product_selection";
import { ensureOverviewVisible } from "./checks/overview";
import { performInstallation } from "./checks/installation";
import { prepareZfcpStorage } from "./checks/storage_zfcp";

// parse options from the command line
const options = parse((cmd) =>
  cmd
    .option("--product-id <id>", "Product id to select a product to install", "none")
    .option(
      "--accept-license",
      "Accept license for a product with license (the default is a product without license)",
    )
    .option("--registration-code <code>", "Registration code")
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
ensureOverviewVisible();
verifyDecryptDestructiveActions(options.destructiveActions);
if (options.staticHostname) setPermanentHostname(options.staticHostname);
if (options.registrationCode) enterRegistration(options.registrationCode);
createFirstUser(options.password);
editRootUser(options.rootPassword);
if (options.prepareAdvancedStorage === "zfcp") prepareZfcpStorage();
if (options.install) performInstallation();
