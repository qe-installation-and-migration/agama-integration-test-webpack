import { it, page, waitUntilOverlaySettled } from "../lib/helpers";
import { getElementByLabel } from "../lib/form";
import { SidebarPage } from "../pages/sidebar_page";
import { ConfigureLvmVolumeGroupPage } from "../pages/configure_lvm_volume_group_page";
import { StorageSettingsPage } from "../pages/storage_settings_page";
import { OverviewPage } from "../pages/overview_page";
import { HeaderPage } from "../pages/header_page";

export function addLVMVolumeGroup(disks?: string[]) {
  it("should add LVM volume group", async function () {
    const storage = new StorageSettingsPage(page);
    const lvm = new ConfigureLvmVolumeGroupPage(page);
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);

    await overview.goToStorage();
    await storage.selectMoreDevices();
    await storage.addLvmVolumeGroup();
    if (disks)
      for (const disk of disks)
        await (await getElementByLabel(page, lvm.diskCheckboxSelector, disk)).click();
    await waitUntilOverlaySettled(() => lvm.accept());
    await header.goToInstallation();
  });
}

export function addLVMVolumeGroupWithSidebar() {
  it("should add LVM volume group", async function () {
    const storage = new StorageSettingsPage(page);
    const lvm = new ConfigureLvmVolumeGroupPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storage.selectMoreDevices();
    await storage.addLvmVolumeGroup();
    await lvm.accept();
  });
}
