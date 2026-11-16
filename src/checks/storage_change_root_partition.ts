import { it, page, waitUntilOverlaySettled } from "../lib/helpers";
import { StorageSettingsPage } from "../pages/storage_settings_page";
import { ConfigurePartitionPage } from "../pages/configure_partition_page";
import { OverviewPage } from "../pages/overview_page";
import { HeaderPage } from "../pages/header_page";

export function changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize() {
  it("should change the file system to btrfs (without snapshots) and adjust it to min size", async function () {
    const storage = new StorageSettingsPage(page);
    const configurePartition = new ConfigurePartitionPage(page);
    const header = new HeaderPage(page);
    const overview = new OverviewPage(page);

    await overview.goToStorage();
    await storage.expandPartitions();
    await storage.clickOptionForRoot();
    await storage.editRootPartition();
    await configurePartition.setASpecificSize("5 GiB");
    await configurePartition.changeFileSystemToBtrfs();
    await waitUntilOverlaySettled(() => configurePartition.accept());
    await header.goToInstallation();
  });
}
