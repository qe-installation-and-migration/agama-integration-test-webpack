import { it, page } from "../lib/helpers";
import { ConfirmInstallationPage } from "../pages/confirm_installation_page";
import { CongratulationPage } from "../pages/congratulation_page";
import { OverviewPage } from "../pages/overview_page";
import { SidebarPage } from "../pages/sidebar_page";
import { InstallPage } from "../pages/install_page";

export function performInstallation() {
  it("should start installation", async function () {
    const confirmInstallation = new ConfirmInstallationPage(page);
    const overview = new OverviewPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToOverview();
    await overview.install();
    await confirmInstallation.continue();
  });

  it(
    "should install in progress",
    async function () {
      const install = new InstallPage(page);

      await install.waitInstallSpinner();
      await install.waitInstallProgressPage();
      await install.waitForSpinnerToDisappear();
    },
    30 * 60 * 1000, // 20 minutes
  );

  it("should see the congratulation page", async function () {
    await new CongratulationPage(page).wait(1000);
  });
}

export function finishInstallation() {
  it(
    "should install in progress",
    async function () {
      const install = new InstallPage(page);

      await install.waitInstallSpinner();
      await install.waitInstallProgressPage();
      await install.waitForSpinnerToDisappear();
    },
    30 * 60 * 1000, // 20 minutes
  );

  it("should finish", async function () {
    await new CongratulationPage(page).wait(1000);
  });
}
