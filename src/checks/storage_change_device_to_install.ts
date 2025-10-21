import { it, page, getTextContent } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { SelectADiskToInstallTheSystemPage } from "../pages/select_a_disk_to_install_the_system_page";
import { WarningCalculateLayoutPage } from "../pages/storage_warning_calculate_layout_page";
import { StoragePage } from "../pages/storage_page";
import assert from "node:assert/strict";

export function changeDeviceToInstall() {
  it("should change device to install for storage space warning test", async function () {
    const storage = new StoragePage(page);
    const selectDev = new SelectADiskToInstallTheSystemPage(page);
    const sidebar = new SidebarPage(page);
    const warningalculateLayoutPage = new WarningCalculateLayoutPage(page);

    await sidebar.goToStorage();
    await storage.changeDevice();
    await storage.selectAnotherDisk();
    await selectDev.selectDevice("/dev/vdb");
    await selectDev.confirm();
    await storage.verifySpaceAllocationFailed();

    await storage.changeDevice();
    await storage.selectAnotherDisk();
    await selectDev.selectDevice("/dev/vdc");
    await selectDev.confirm();
    assert.deepEqual(
      await getTextContent(warningalculateLayoutPage.alertFailedCalculateStorageLayoutText()),
      "Failed to calculate a storage layout",
    );
  });

  it("should change device back to install", async function () {
    const storage = new StoragePage(page);
    const selectDev = new SelectADiskToInstallTheSystemPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storage.changeDevice();
    await storage.selectAnotherDisk();
    await selectDev.selectDevice("/dev/vda");
    await selectDev.confirm();
  });
}
