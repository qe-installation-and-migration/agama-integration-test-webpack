import { it, page, getTextContent } from "../lib/helpers";
import { getElementInCell } from "../lib/table";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageChangeDiskPage } from "../pages/storage_change_disk_page";
import { StoragePage } from "../pages/storage_page";
import assert from "node:assert/strict";

export function changeDeviceToInstallTheSystem() {
  it("should change the disk to install the system to one which fails to calculate a storage layout", async function () {
    const storage = new StoragePage(page);
    const storageChangeDisk = new StorageChangeDiskPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storage.selectChangeDisk();
    await storage.selectADiskToInstallTheSystem();

    (
      await getElementInCell(
        page,
        storageChangeDisk.diskTableSelector,
        "Size",
        "5 GiB",
        "input[type='radio']",
      )
    ).click();
    await storageChangeDisk.confirm();
    assert.deepEqual(
      await getTextContent(storage.storageAllocationWarningHeading()),
      'It is not possible to allocate space for the boot partition and for "/" (at least 12.5 GiB) and "swap" (1 GiB - 2 GiB).',
    );

    await storage.otherOptions();
    await storage.resetToDefault();
  });
}
