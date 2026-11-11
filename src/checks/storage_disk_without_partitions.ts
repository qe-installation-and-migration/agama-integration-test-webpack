import { it, page, waitUntilOverlaySettled } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";
import { StorageSettingsPage } from "../pages/storage_settings_page";
import { SelectAnotherDiskPage } from "../pages/select_another_disk_page";
import { ConfigureDiskPage } from "../pages/configure_disk_page";
import { HeaderPage } from "../pages/header_page";

export function setupWholeDiskForHome() {
  it("should use without partitions another disk to mount home", async function () {
    const overview = new OverviewPage(page);
    const storageSettings = new StorageSettingsPage(page);
    const selectAnotherDisk = new SelectAnotherDiskPage(page);
    const configureDisk = new ConfigureDiskPage(page);
    const header = new HeaderPage(page);

    await overview.goToStorage();
    await storageSettings.selectMoreDevices();
    await storageSettings.selectAnotherDisk();
    await waitUntilOverlaySettled(() => selectAnotherDisk.addDisk("Add vdb (30 GiB)"));
    await storageSettings.selectDiskNotConfiguredYet();
    await storageSettings.useTheDiskWithoutPartitions();
    await configureDisk.fillMountPoint("/home");
    await waitUntilOverlaySettled(() => configureDisk.accept());
    await header.goToInstallation();
  });
}
