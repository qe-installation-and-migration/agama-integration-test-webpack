import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { ConfigurePartitionWithSidebarPage } from "../pages/configure_partition_with_sidebar_page";
import { StoragePage } from "../pages/storage_page";

export function changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize() {
  it("should change the file system to btrfs (without snapshots) and adjust it to min size", async function () {
    const storage = new StoragePage(page);
    const configRootPartition = new ConfigurePartitionWithSidebarPage(page);
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
