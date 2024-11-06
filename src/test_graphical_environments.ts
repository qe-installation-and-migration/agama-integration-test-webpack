
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
import { performInstallation } from "./checks/perform_installation";
import { SidebarPage } from "./pages/sidebar-page";
import { selectPattern } from "./checks/select_pattern";

// parse options from the command line
const options = parse((cmd) =>
    cmd.option("-i, --install", "Proceed to install the system (the default is not to install it)")
        .option("-s, --software <name>", "Proceed to select pattern", "GNOME Desktop Environment (Wayland)"));

describe("Agama test", function () {
    test_init(options);

    it("should have Agama page title", async function () {
        assert.deepEqual(await page.title(), "Agama");
    });

    login(options.password);

    selectPattern(options.pattern);

    it("should be ready for installation", async function () {
        const sidebar = new SidebarPage(page);
        await sidebar.goToOverview();
        await page.locator("button::-p-text(Install)").wait();
    });

    if (options.install) performInstallation();
});
