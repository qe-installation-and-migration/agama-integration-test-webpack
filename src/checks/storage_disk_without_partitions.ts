import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StoragePage } from "../pages/storage_page";
import { SelectAnotherDiskWithSidebarPage } from "../pages/select_another_disk_with_sidebar_page";
import { ConfigureDiskPage } from "../pages/configure_disk_page";

export function setupWholeDiskForHome() {
  it("should use without partitions another disk to mount home", async function () {
    const sidebar = new SidebarPage(page);
    const storage = new StoragePage(page);
    const selectAnotherDisk = new SelectAnotherDiskWithSidebarPage(page);
    const configureDisk = new ConfigureDiskPage(page);

    await sidebar.goToStorage();
    await storage.selectMoreDevices();
    await storage.selectAnotherDisk();
    await selectAnotherDisk.confirm();
    await storage.selectDiskNotConfiguredYet();
    await storage.useTheDiskWithoutPartitions();
    await configureDisk.selectHomeMountPoint();
    await configureDisk.accept();
  });
}
