// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { describe } from "node:test";
// see https://nodejs.org/docs/latest-v20.x/api/assert.html
import assert from "node:assert/strict";

import { parse } from "./lib/cmdline";
import { it, test_init, page } from "./lib/helpers";

import { login } from "./checks/login";
import { productSelection } from "./checks/product_selection";
import { setRootPassword } from "./checks/set_root_password";
import { createFirstUser } from "./checks/create_first_user";
import { prepareDasdStorage } from "./checks/prepare_dasd_storage";
import { performInstallation } from "./checks/perform_installation";
import { SidebarPage } from "./pages/sidebar-page";

// parse options from the command line
const options = parse((cmd) =>
    cmd.option("-r, --product <name>", "Product to install", "openSUSE Tumbleweed")
        .option("-i, --install", "Proceed to install the system (the default is not to install it)")
        .option("-z, --dasd", "Prepare DASD storage (the default is not to prepare it)"));

describe("Agama test", function () {
    test_init(options);

    // it("should have Agama page title", async function () {
    //     assert.deepEqual(await page.title(), "Agama");
    // });

    login(options.password);

    // if (options.product !== "SUSE Linux Enteprise Server 16.0 Alpha") productSelection(options.product);

    // it("should display overview section", async function () {
    //     await page.locator("h3::-p-text('Overview')").wait();
    // });

    // setRootPassword(options.password);

    // createFirstUser("Bernhard M. Wiedemann", "bernhard", options.password);

    // if (options.dasd) prepareDasdStorage();

    // it("should be ready for installation", async function () {
    //     const sidebar = new SidebarPage(page);
    //     await sidebar.goToOverview();
    //     await page.locator("button::-p-text(Install)").wait();
    // });

    if (options.install) performInstallation();
});
