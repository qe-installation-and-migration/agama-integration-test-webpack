import { it, page, getTextContent } from "../lib/helpers";
import { ConfirmInstallationPage } from "../pages/confirm_installation_page";
import { CongratulationPage } from "../pages/congratulation_page";
import { OverviewPage } from "../pages/overview_page";
import { SidebarPage } from "../pages/sidebar_page";
import { InstallationPage } from "../pages/installation_page";
import assert from "node:assert/strict";

export function performInstallation() {
  it("should start installation", async function () {
    const confirmInstallation = new ConfirmInstallationPage(page);
    const overview = new OverviewPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToOverview();
    await overview.install();
    await confirmInstallation.continue();
  });
}

export function checkInstallation() {
  it("should check installation progress", async function () {
    const installation = new InstallationPage(page);

    assert.deepEqual(await getTextContent(installation.prepareDisksText()), "Prepare disks");

    assert.deepEqual(
      await getTextContent(installation.installingSystemText()),
      "Installing the system, please wait...",
    );

    assert.deepEqual(await getTextContent(installation.installSoftwareText()), "Install software");

    assert.deepEqual(
      await getTextContent(installation.configureTheSystemText()),
      "Configure the system",
    );
  });
}

export function finishInstallation() {
  it(
    "should finish installation",
    async function () {
      const congratulation = new CongratulationPage(page);
      await congratulation.wait(20 * 60 * 1000);
    },
    21 * 60 * 1000,
  );
}
