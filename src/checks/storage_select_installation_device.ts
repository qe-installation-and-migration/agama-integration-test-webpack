import { it, page, getTextContent, dumpPage, sleep } from "../lib/helpers";
import assert from "node:assert/strict";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageLvmConfigureVolumeGroupPage } from "../pages/configure_lvm_volume_group_page";
import { StorageSettingsPage } from "../pages/storage_settings_page";
import { OverviewPage } from "../pages/overview_page";
import { HeaderPage } from "../pages/header_page";

export function selectMoreDevices() {
  it("should add LVM volume group", async function () {
    const storageSettings = new StorageSettingsPage(page);
    const storageLvmConfigureVolumeGroup = new StorageLvmConfigureVolumeGroupPage(page);
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);
    const logDir = "/run/agama/scripts";

    await overview.goToStorage();
    console.log("1. in storage");
    await storageSettings.selectMoreDevices();
    console.log("2. more device");
    await storageSettings.addLvmVolumeGroup();
    console.log("3. Add lvm volume group");
    await storageLvmConfigureVolumeGroup.accept();
    console.log("4. accept");
    assert.deepEqual(
      await getTextContent(storageSettings.createLVMVolumeGroupSystemHeading(), 360000),
      "Create LVM volume group system",
    );
    console.log("Create LVM volume group system");
    await header.reviewAndInstall();
    console.log("reviewAndInstall");
    await overview.ensureSystemInformationPresent();
    console.log("ensureSystemInformationPresent");
  }, 360000);
}

export function selectMoreDevicesWithSidebar() {
  it("should add LVM volume group", async function () {
    const storageSettings = new StorageSettingsPage(page);
    const storageLvmConfigureVolumeGroup = new StorageLvmConfigureVolumeGroupPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storageSettings.selectMoreDevices();
    await storageSettings.addLvmVolumeGroup();
    await storageLvmConfigureVolumeGroup.accept();
  });
}
