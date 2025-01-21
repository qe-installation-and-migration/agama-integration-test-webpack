import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StoragePage } from "../pages/storage_page";
import { SelectInstallationDevicePage } from "../pages/select_installation_device_page";
import { DasdPage } from "../pages/dasd_page";

export function prepareDasdStorage() {
  it("should prepare DASD storage", async function () {
    const storage = new StoragePage(page);
    const selectInstallationDevice = new SelectInstallationDevicePage(page);
    const dasd = new DasdPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storage.changeInstallationDevice();
    await selectInstallationDevice.prepareDasd();
    await dasd.activateDevice();
    await dasd.backToDeviceSelection();
    await selectInstallationDevice.selectDevice(0);
  });
}
