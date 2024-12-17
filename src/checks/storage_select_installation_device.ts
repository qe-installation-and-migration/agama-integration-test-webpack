import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { SelectInstallationDevicePage } from "../pages/select_installation_device_page";
import { StoragePage } from "../pages/storage_page";

export function changeInstallationDeviceToLvm() {
    it("should select installation device", async function () {
        const storage = new StoragePage(page);
        const selectInstallationDevice = new SelectInstallationDevicePage(page);
        const sidebar = new SidebarPage(page);

        await sidebar.goToStorage();
        await storage.changeInstallationDevice();
        await selectInstallationDevice.installOnNewLvm();
    });
}
