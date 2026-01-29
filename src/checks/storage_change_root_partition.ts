import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageSettingsPage } from "../pages/storage_settings_page";
import { ConfigurePartitionPage } from "../pages/configure_partition_page";
import { OverviewPage } from "../pages/overview_page";
import { HeaderPage } from "../pages/header_page";

export function changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize() {
  it("should change the file system to btrfs (without snapshots) and adjust it to min size", async function () {
    const storage = new StorageSettingsPage(page);
    const configRootPartition = new ConfigurePartitionPage(page);
    const header = new HeaderPage(page);
    const overview = new OverviewPage(page);

    await overview.goToStorage();
    await storage.expandPartitions();
    await storage.clickOptionForRoot();
    await storage.editRootPartition();
    await configRootPartition.changeFilesystemToBtrfs();
    await configRootPartition.selectSizeMode();
    await configRootPartition.changeSizeModeToManual();
    await configRootPartition.inputPartitionSize("5 GiB");
    await configRootPartition.disableAllowGrowing();
    await configRootPartition.accept();
    await header.goToOverview();
  });
}

export function changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSizeWithSidebar() {
  it("should change the file system to btrfs (without snapshots) and adjust it to min size", async function () {
    const storage = new StorageSettingsPage(page);
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
