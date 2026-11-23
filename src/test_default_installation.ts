import { parse, commaSeparatedList } from "./lib/cmdline";
import { test_init } from "./lib/helpers";
import { Option } from "commander";

import { logIn } from "./checks/login";
import { createFirstUser, editRootUser } from "./checks/authentication";
import { finishInstallationCongratulation, performInstallation } from "./checks/installation";
import { ensureLandingOnOverview } from "./checks/overview";
import { enterExtensionRegistrationHA, enterProductRegistration } from "./checks/registration";
import { selectPatterns } from "./checks/software";
import { prepareZfcpStorage } from "./checks/storage_zfcp";
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
    .option("--registration-code-ha <code>", "Registration code for Extension High Availability")
    .option("--patterns <pattern>...", "Comma-separated list of patterns", commaSeparatedList)
    .option("--install", "Proceed to install the system (the default is not to install it)")
    .option("--use-custom-registration-server", "Enable custom registration server")
    .option("--provide-registration-code", "Provide registration code for customer registration")
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
if (options.productId !== "none")
  if (options.acceptLicense)
    productSelectionWithLicenseAndMode(
      options.productId,
      options.productMode,
      options.productVersion,
    );
  else productSelection(options.productId);
ensureLandingOnOverview();
if (options.registrationCode)
  enterProductRegistration({
    use_custom: options.useCustomRegistrationServer,
    code: options.registrationCode,
    provide_code: options.provideRegistrationCode,
  });
if (options.registrationCodeHa) enterExtensionRegistrationHA(options.registrationCodeHa);
if (options.patterns) selectPatterns(options.patterns);
createFirstUser(options.password);
editRootUser(options.rootPassword);
if (options.prepareAdvancedStorage === "zfcp") prepareZfcpStorage();
if (options.install) {
  performInstallation();
  finishInstallationCongratulation();
}
