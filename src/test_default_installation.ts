// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { describe } from "node:test";

import { parse } from "./lib/cmdline";
import { Option } from "commander";
import { test_init } from "./lib/helpers";

import { logIn } from "./checks/login";
import { productSelection } from "./checks/product_selection";
import { setRootPassword } from "./checks/set_root_password";
import { createFirstUser } from "./checks/create_first_user";
import { performInstallation } from "./checks/perform_installation";
import { prepareDasdStorage } from "./checks/prepare_dasd_storage";

// parse options from the command line
const options = parse((cmd) =>
    cmd.addOption(
        // for product ids, please check https://github.com/agama-project/agama/tree/master/products.d
        new Option("--product-id <id>", "Product id to select a product to install")
            .choices(["Leap_16.0", "MicroOS", "SLES_16.0", "SLES_SAP_16.0", "Slowroll", "Tumbleweed", "none"])
            .default("none"))
        .option("--install", "Proceed to install the system (the default is not to install it)")
        .option("--dasd", "Prepare DASD storage (the default is not to prepare it)"));

describe("Installation with default values", function () {
    test_init(options);

    logIn(options.password);
    if (options.productSelection !== "none") productSelection(options.productId);
    createFirstUser("Bernhard M. Wiedemann", "bernhard", options.password);
    setRootPassword(options.password);
    if (options.dasd) prepareDasdStorage();
    if (options.install) performInstallation();
});
