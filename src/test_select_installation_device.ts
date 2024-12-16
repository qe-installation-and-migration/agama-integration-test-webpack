
// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { describe } from "node:test";

import { parse } from "./lib/cmdline";
import { Option } from "commander";
import { test_init, ProductId } from "./lib/helpers";

import { logIn } from "./checks/login";
import { productSelection } from "./checks/product_selection";
import { performInstallation } from "./checks/installation";
import { selectInstallationDevice } from "./checks/select_installation_device";
import { setupRootPassword } from "./checks/root_authentication";

// parse options from the command line
const options = parse((cmd) =>
    cmd.addOption(
        new Option("--product-id <id>", "Product id to select a product to install")
            .choices(Object.keys(ProductId))
            .default("none"))
        .option("--install", "Proceed to install the system (the default is not to install it)"));

describe("Installation with LVM)", function () {
    test_init(options);

    logIn(options.password);
    if (options.productId !== "none") productSelection(ProductId[options.productId]);
    setupRootPassword(options.password);
    selectInstallationDevice();
    if (options.install) performInstallation();
});
