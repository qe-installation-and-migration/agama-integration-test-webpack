// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html

import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

// import { createFirstUser } from "./checks/first_user";
// import { enterRegistration } from "./checks/registration";
import { logIn } from "./checks/login";
import { decryptExistingDrive } from "./checks/decryption";
import { checkDestructiveActions } from "./checks/storage_check_destructive_actions";
import { productSelection, productSelectionWithLicense } from "./checks/product_selection";
// import { setupRootPassword } from "./checks/root_authentication";

// parse options from the command line
const options = parse((cmd) =>
  cmd
    .option("--product-id <id>", "Product id to select a product to install", "none")
    .option(
      "--accept-license",
      "Accept license for a product with license (the default is a product without license)",
    )
    .option("--registration-code <code>", "Registration code")
    .option("--install", "Proceed to install the system (the default is not to install it)")
    .option("--dasd", "Prepare DASD storage (the default is not to prepare it)"),
);

test_init(options);
logIn(options.password);
if (options.productId !== "none")
  if (options.acceptLicense) productSelectionWithLicense(options.productId);
  else productSelection(options.productId);
decryptExistingDrive(options.password);
// setupRootPassword(options.rootPassword);
// if (options.registrationCode) enterRegistration(options.registrationCode);
// createFirstUser(options.password);
checkDestructiveActions();
