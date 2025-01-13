import { it, page } from "../lib/helpers";
import { ConfirmInstallationPage } from "../pages/confirm_installation_page";
import { CongratulationPage } from "../pages/congratulation_page";
import { InstallingPage } from "../pages/installing_page";
import { OverviewPage } from "../pages/overview_page";
import { SidebarPage } from "../pages/sidebar_page";

export function performInstallation() {
  it("should start installation", async function () {
    const confirmInstallation = new ConfirmInstallationPage(page);
    const installing = new InstallingPage(page);
    const overview = new OverviewPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToOverview();
    await overview.install();
    await confirmInstallation.continue();
    await installing.wait();
  });

  it(
    "should finish installation",
    async function () {
      await new CongratulationPage(page).wait(40 * 60 * 1000);
    },
    40 * 60 * 1000,
  );
}

export function finishInstallation() {
  it(
    "should finish",
    async function () {
      const installing = new InstallingPage(page);
      const congratulation = new CongratulationPage(page);
      await installing.wait();
      while (true) {
        try {
          await congratulation.wait(30 * 1000);
          break;
        } catch (error) {
          if (error.constructor.name !== "TimeoutError") throw error;
        }
        // at this point no congratulation screen in this iteration, 30 seconds gone
        // so check if we're still seeing the "installation is ongoing" screen
        try {
          await installing.wait();
        } catch (error) {
          if (error.constructor.name !== "TimeoutError") throw error;
        }
      }
    },
    40 * 60 * 1000,
  );
}
