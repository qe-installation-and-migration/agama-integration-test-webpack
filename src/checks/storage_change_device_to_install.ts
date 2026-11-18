import { it, page, getTextContent } from "../lib/helpers";
import { getElementInCell } from "../lib/table";
import { HeaderPage } from "../pages/header_page";
import { OverviewPage } from "../pages/overview_page";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageChangeDiskPage } from "../pages/storage_change_disk_page";
import { StoragePage } from "../pages/storage_page";
import { StorageSettingsChangeDiskPage } from "../pages/storage_settings_change_disk_page";
import { StorageSettingsPage } from "../pages/storage_settings_page";
import { StorageResultPage } from "../pages/storage_result_page";
import assert from "node:assert/strict";

export function changeDeviceToInstallTheSystem() {
  it("should change the device to install the system to one which fails to calculate a storage layout", async function () {
    const storage = new StorageSettingsPage(page);
    const storageSettingsChangeDisk = new StorageSettingsChangeDiskPage(page);
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);

    await overview.goToStorage();
    await storage.selectInstallationDevices();
    await storage.selectUsedDisk();
    await storage.changeTheDeviceToInstallTheSystem();
    (
      await getElementInCell(
        page,
        storageSettingsChangeDisk.diskTableSelector,
        "Size",
        "5 GiB",
        "input[type='radio']",
      )
    ).click();
    await storageSettingsChangeDisk.changeTo();
    await storage.ensureStorageSettingsPresent();
    assert.deepEqual(
      await getTextContent(storage.storageAllocationWarningTextAlert()),
      'It is not possible to allocate space for the boot partition and for "/" (at least 12.5 GiB) and "swap" (1 GiB - 2 GiB).',
    );

    await storage.moreOptions();
    page.setDefaultTimeout(40000);
    await storage.resetToDefault();
    await storage.ensureStorageSettingsPresent();
    await header.goToInstallation();
    // prefer explicit wait over hard delay.
    await overview.ensureSystemInformationPresent(120000);
  }, 150000);
}

export function changeDeviceToInstallTheSystemWithSidebar() {
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

export function changeDeviceToInstallWithExistedLVM(action: string = "recreate") {
  const testLabelMap: Record<string, string> = {
    recreate: "should install on an existing lvm setup to recreate lvm with clean allocation",
    resize: "should configure lvm with shrink existing LVs to fit new allocation",
    reuse: "should configure lvm reuse existing LVs for specific mount points",
  };
  it(testLabelMap[action], async function () {
    const storageSetting = new StorageSettingsPage(page);
    const storageResult = new StorageResultPage(page);
    const storageSettingsChangeDisk = new StorageSettingsChangeDiskPage(page);
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);

    await overview.goToStorage();

    await storageSetting.selectInstallationDevices();
    await storageSetting.selectUsedDisk();

    await storageSettingsChangeDisk.selectLVMTab();
    await storageSettingsChangeDisk.changeTo();

    const lvmMenuTitleMap: Record<string, string> = {
      resize: "Shrink existing logical volumes",
      reuse: "Use available space",
    };

    if (action !== "recreate" && lvmMenuTitleMap[action]) {
      await storageSetting.openLvmDropdown();
      await storageSetting.selectRecreateLVMAction(lvmMenuTitleMap[action]);
    }

    let lvmDestructions: string[] = [];
    if (action === "recreate") {
      lvmDestructions = [
        "Delete btrfs on /dev/system/root",
        "Delete logical volume root",
        "Delete swap on /dev/system/swap",
        "Delete logical volume swap",
      ];
    } else if (action === "resize") {
      lvmDestructions = [
        "Shrink btrfs on /dev/system/root",
        "Shrink logical volume root on volume group system",
        "Create LVM logical volume /dev/system/root0",
      ];
    }
    if (lvmDestructions.length > 0) {
      await storageResult.scrollToDestructiveActionsList();
    }

    for (const destructionItem of lvmDestructions) {
      await storageResult.destructiveActionText(destructionItem).wait();
    }

    await header.goToInstallation();
  });
}
