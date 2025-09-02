import { it, page } from "../lib/helpers";
import { ConfirmInstallationPage } from "../pages/confirm_installation_page";
import { CongratulationPage } from "../pages/congratulation_page";
import { OverviewPage } from "../pages/overview_page";
import { SidebarPage } from "../pages/sidebar_page";

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
    "should finish installation",
    async function () {
      await new CongratulationPage(page).wait(14 * 60 * 1000);
    },
    15 * 60 * 1000,
  );
}

export function finishInstallation() {
  it(
    "should finish",
    async function () {
      const congratulation = new CongratulationPage(page);
      await congratulation.wait(20 * 60 * 1000);
    },
    21 * 60 * 1000,
  );
}
