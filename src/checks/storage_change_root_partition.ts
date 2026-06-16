import { it, page, waitUntilOverlaySettled, dumpPage } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageSettingsPage } from "../pages/storage_settings_page";
import { ConfigurePartitionPage } from "../pages/configure_partition_page";
import { OverviewPage } from "../pages/overview_page";
import { HeaderPage } from "../pages/header_page";
import { StoragePage } from "../pages/storage_page";

export function takeStorageScreenshot() {
  it("should move to Storage and take a screenshot for sporadic failure", async function () {
    const header = new HeaderPage(page);
    const overview = new OverviewPage(page);
    const storage = new StorageSettingsPage(page);
    const logDir = "/run/agama/scripts";

    await overview.goToStorage();

    await dumpPage(logDir, "storage_screen_before_install");
    console.log("Successfully dumped a screenshot for the Storage page before install.");

    await storage.clickFinalLayout();
    await dumpPage(logDir, "storage_final_layout");
    console.log("Successfully dumped a screenshot for the Storage final layout before install.");

    await header.goToInstallation();
  });
}

export function changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize() {
  it("should change the file system to btrfs (without snapshots) and adjust it to min size", async function () {
    const storage = new StorageSettingsPage(page);
    const configRootPartition = new ConfigurePartitionPage(page);
    const header = new HeaderPage(page);
    const overview = new OverviewPage(page);
    const logDir = "/run/agama/scripts";

    await overview.goToStorage();
    await storage.expandPartitions();
    await storage.clickOptionForRoot();
    await storage.editRootPartition();
    await configRootPartition.changeFilesystemToBtrfs();
    await configRootPartition.selectSizeMode();
    await configRootPartition.changeSizeModeToManual();
    await configRootPartition.inputPartitionSize("5.3 GiB");
    await configRootPartition.disableAllowGrowing();
    await waitUntilOverlaySettled(() => configRootPartition.accept());
    await dumpPage(logDir, "after_accept");
    await header.goToInstallation();
  });
}

export function changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSizeWithSidebar() {
  it("should change the file system to btrfs (without snapshots) and adjust it to min size", async function () {
    const storage = new StoragePage(page);
    const configRootPartition = new ConfigurePartitionPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storage.expandPartitions();
    await storage.editRootPartition();
    await configRootPartition.changeFilesystemToBtrfs();
    await configRootPartition.selectSizeMode();
    await configRootPartition.changeSizeModeToManual();
    await configRootPartition.inputPartitionSize("5 GiB");
    await configRootPartition.disableAllowGrowing();
    await configRootPartition.accept();
  });
}
