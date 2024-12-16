import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { SelectInstallationDevicePage } from "../pages/storage_select_installation_device_page";
import { StoragePage } from "../pages/storage_page";

export function selectInstallationDevice() {
    it("should select installation device", async function () {
        const storage = new StoragePage(page);
        const StorageSelectInstallationDevice = new SelectInstallationDevicePage(page);
        const sidebar = new SidebarPage(page);

        await sidebar.goToStorage();
        await storage.changeInstallationDevice();
        await StorageSelectInstallationDevice.createLvmDevice();
    });
}
