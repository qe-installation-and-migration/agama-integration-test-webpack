import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { ConfigureLvmVolumeGroupPage } from "../pages/configure_lvm_volume_group_page";
import { StorageWithoutTabsPage } from "../pages/storage_without_tabs_page";

export function selectMoreDevices() {
  it("should add LVM volume group", async function () {
    const storage = new StorageWithoutTabsPage(page);
    const lvm = new ConfigureLvmVolumeGroupPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storage.selectMoreDevices();
    await storage.addLvmVolumeGroup();
    await lvm.accept();
  });
}
