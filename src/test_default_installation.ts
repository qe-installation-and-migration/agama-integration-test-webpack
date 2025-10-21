// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html

import { parse, commaSeparatedList } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { Option } from "commander";

// import { createFirstUser } from "./checks/first_user";
// import { editRootUser } from "./checks/root_authentication";
// import { ensureProductConfigurationStarted } from "./checks/configuration_started";
// import { enterRegistration, enterRegistrationHa } from "./checks/registration";
import { logIn } from "./checks/login";
// import { performInstallation, finishInstallation } from "./checks/installation";
// import { productSelection, productSelectionWithLicense } from "./checks/product_selection";
// import { prepareZfcpStorage } from "./checks/storage_zfcp";
// import { selectPatterns } from "./checks/software_selection";
import { readTable } from "./checks/read_table";

// parse options from the command line
const options = parse((cmd) =>
  cmd
    .option("--product-id <id>", "Product id to select a product to install", "none")
    .option(
      "--accept-license",
      "Accept license for a product with license (the default is a product without license)",
    )
    .option("--registration-code <code>", "Registration code")
    .option("--registration-code-ha <code>", "Registration code for Extension High Availability")
    .option("--patterns <pattern>...", "comma-separated list of patterns", commaSeparatedList)
    .option("--install", "Proceed to install the system (the default is not to install it)")
    .option("--use-custom-registration-server", "Enable custom registration server")
    .option("--provide-registration-code", "provide registration code for customer registration")
    .addOption(
      new Option(
        "--prepare-advanced-storage <storage-type>",
        "Prepare advance storage for installation",
        // dasd is not worth to test atm, see bsc#1151436
      ).choices(["dasd", "zfcp"]),
    ),
);

test_init(options);
logIn(options.password);
readTable();

// if (options.productId !== "none")
//   if (options.acceptLicense) productSelectionWithLicense(options.productId);
//   else productSelection(options.productId);
// ensureProductConfigurationStarted();
// if (options.registrationCode)
//   enterRegistration({
//     use_custom: options.useCustomRegistrationServer,
//     code: options.registrationCode,
//     provide_code: options.provideRegistrationCode,
//   });
// if (options.registrationCodeHa) enterRegistrationHa(options.registrationCodeHa);
// if (options.patterns) selectPatterns(options.patterns);
// createFirstUser(options.password);
// editRootUser(options.rootPassword);
// if (options.prepareAdvancedStorage === "zfcp") prepareZfcpStorage();
// if (options.install) {
//   performInstallation();
//   finishInstallation();
// }
