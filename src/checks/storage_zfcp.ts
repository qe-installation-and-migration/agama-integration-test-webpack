import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageWithoutTabsPage } from "../pages/storage_without_tabs_page";
import { ZfcpPage } from "../pages/zfcp_page";

export function prepareZfcpStorage() {
  it(
    "should prepare zFCP storage",
    async function () {
      const storage = new StorageWithoutTabsPage(page);
      const zfcp = new ZfcpPage(page);
      const sidebar = new SidebarPage(page);

      await sidebar.goToStorage();
      await storage.activateZfcp();
      await zfcp.activateDevice("0.0.fa00");
      await zfcp.activateDevice("0.0.fc00");
      await zfcp.back();
      await zfcp.activateMultipath();
      // Workaround to wait for page to load, sometimes workers take more than 60 seconds to load storage
      await storage.waitForElement("::-p-text(Activate zFCP disks)", 80000);
    },
    3 * 60 * 1000,
  );
}
