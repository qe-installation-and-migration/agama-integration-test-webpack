import { it, page } from "../lib/helpers";
import { HeaderPage } from "../pages/header_page";
import { NetworkPage } from "../pages/network_page";
import { NetworkWiredConnectionPage } from "../pages/network_wired_connection_page";
import { OverviewPage } from "../pages/overview_page";

export function setOnlyInstallationNetwork() {
  it("should allow setting only installation network", async function () {
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);
    const networkPage = new NetworkPage(page);
    const networkWiredConnectionPage = new NetworkWiredConnectionPage(page);

    await overview.goToNetwork();
    await networkPage.selectConnectionDetails();
    await networkWiredConnectionPage.selectInstallationOnly();
    await header.goToInstallation();
  });

  it("should alert no network after installation", async function () {
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);
    const networkPage = new NetworkPage(page);

    await overview.goToNetwork();
    await networkPage.verifyWarningAlert();
    await header.goToInstallation();
  });
}
