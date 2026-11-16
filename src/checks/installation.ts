import { it, page, getTextContent } from "../lib/helpers";
import { ConfirmInstallationPage } from "../pages/confirm_installation_page";
import { OverviewPage } from "../pages/overview_page";
import assert from "node:assert/strict";
import { InstallationCompletePage } from "../pages/installation_complete_page";
import { InstallationInProgressPage } from "../pages/installation_in_progress_page";

export function performInstallation() {
  it("should start installation", async function () {
    const confirmInstallation = new ConfirmInstallationPage(page);
    const overview = new OverviewPage(page);

    await overview.install();
    await confirmInstallation.confirmAndInstall();
  });
}

export function checkInstallation() {
  it("should check installation progress", async function () {
    const installationInProgress = new InstallationInProgressPage(page);

    assert.deepEqual(
      await getTextContent(installationInProgress.installationInProgressText()),
      "Installation in progress",
    );
    assert.deepEqual(
      await getTextContent(installationInProgress.prepareTheSystemText()),
      "Prepare the system",
    );

    assert.deepEqual(
      await getTextContent(installationInProgress.installSoftwareText()),
      "Install software",
    );

    assert.deepEqual(
      await getTextContent(installationInProgress.configureTheSystemText()),
      "Configure the system",
    );
  });
}

export function finishInstallation() {
  it(
    "should finish installation",
    async function () {
      const installationComplete = new InstallationCompletePage(page);
      await installationComplete.wait(20 * 60 * 1000);
    },
    21 * 60 * 1000,
  );
}
