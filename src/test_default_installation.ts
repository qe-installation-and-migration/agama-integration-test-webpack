// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { describe } from "node:test";
// see https://nodejs.org/docs/latest-v20.x/api/assert.html
import assert from "node:assert/strict";

import { parse } from "./lib/cmdline";
import { it, test_init, page, booleanEnv } from "./lib/helpers";

import { login } from "./checks/login";
import { productSelection } from "./checks/product_selection";
import { setRootPassword } from "./checks/set_root_password";
import { createFirstUser } from "./checks/create_first_user";
import { prepareDasdStorage } from "./checks/prepare_dasd_storage";
import { performInstallation } from "./checks/perform_installation";
import { SidebarPage } from "./pages/sidebar-page";

// parse options from the command line
const options = parse();

const agamaInstall = booleanEnv("AGAMA_INSTALL", false);
const agamaDasd = booleanEnv("AGAMA_DASD", false);
const agamaProduct = process.env.AGAMA_PRODUCT || "openSUSE Tumbleweed";

describe("Agama test", function () {
    test_init(options);

    it("should have Agama page title", async function () {
        assert.deepEqual(await page.title(), "Agama");
    });

    login(options.password);

    if (agamaProduct !== "SUSE Linux Enteprise Server 16.0 Alpha") {
        productSelection(agamaProduct);
    }

    it("should display overview section", async function () {
        await page.locator("h3::-p-text('Overview')").wait();
    });

    setRootPassword(options.password);

    createFirstUser("Bernhard M. Wiedemann", "bernhard", options.password);

    if (agamaDasd) {
        prepareDasdStorage();
    }

    it("should be ready for installation", async function () {
        const sidebar = new SidebarPage(page);
        await sidebar.goToOverview();
        await page.locator("button::-p-text(Install)").wait();
    });

    if (agamaInstall) {
        performInstallation();
    }
});
