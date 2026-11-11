import { it, page } from "../lib/helpers";
import { NetworkWithSidebarPage } from "../pages/network_with_sidebar_page";
import { SidebarPage } from "../pages/sidebar_page";

export function setOnlyInstallationNetwork() {
  it("should allow setting only installation network", async function () {
    const sidebar = new SidebarPage(page);
    const networkPage = new NetworkWithSidebarPage(page);

    await sidebar.goToNetwork();
    await networkPage.selectWiredConnection();
    await networkPage.selectInstallationOnly();
  });

  it("should alert no network after installation", async function () {
    const sidebar = new SidebarPage(page);
    const networkPage = new NetworkWithSidebarPage(page);

    await sidebar.goToNetwork();
    await networkPage.verifyWarningAlert();
  });
}
