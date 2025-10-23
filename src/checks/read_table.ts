import { it, page, sleep } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageResultPage } from "../pages/storage_result_page";
import { getElementInCell, getTextInCells } from "../lib/table";
import { StorageSettingsPage } from "../pages/storage_settings_page";
import { StorageSettingsChangeDiskPage } from "../pages/storage_settings_change_disk_page";
import { StorageNoDevicesFoundPage } from "../pages/storage_no_devices_found_page";
import { DasdPage } from "../pages/dasd_page";

export function readStorageResultTable() {
  it("should read result table", async function () {
    const sidebar = new SidebarPage(page);
    const storageResult = new StorageResultPage(page);

    await sidebar.goToStorage();
    await page.locator(storageResult.finalLayoutTabSelector).click();

    console.log(
      "\nSingle cell:",
      await getTextInCells(page, storageResult.resultTableSelector, "Device", "vda1", "Details"),
    );

    console.log(
      "\nMultiple cells:",
      await getTextInCells(page, storageResult.resultTableSelector, "Size", "40 GiB", [
        "Device",
        "Details",
        "Size",
      ]),
    );

    const buttonElement = await getElementInCell(
      page,
      storageResult.resultTableSelector,
      "Device",
      "/dev/vda",
      storageResult.resultTableColapseRowSelector,
    );
    await buttonElement.click();

    await sleep(2000);
  });
}

export function readChangeTheDiskToInstallTheSystemTable() {
  it("should read table to change disk", async function () {
    const sidebar = new SidebarPage(page);
    const storageSettings = new StorageSettingsPage(page);
    const storageSettingsChangeDisk = new StorageSettingsChangeDiskPage(page);

    await sidebar.goToStorage();
    await page.locator(storageSettings.useDiskSelector).click();
    await page.locator(storageSettings.changeDeviceMenuSelector).click();
    await page.locator(storageSettingsChangeDisk.diskTableSelector).wait();

    console.log(
      "\nSingle cell:",
      await getTextInCells(
        page,
        storageSettingsChangeDisk.diskTableSelector,
        "Device",
        "/dev/vda",
        "Description",
      ),
    );

    console.log(
      "\nMultiple cells:",
      await getTextInCells(
        page,
        storageSettingsChangeDisk.diskTableSelector,
        "Device",
        "/dev/vdb",
        ["Size", "Description", "Current content"],
      ),
    );

    const radioButton = await getElementInCell(
      page,
      storageSettingsChangeDisk.diskTableSelector,
      "Device",
      "/dev/vdb",
      "input[type='radio']",
    );
    await radioButton.click();

    await sleep(2000);
  });
}

export function readDasdTable() {
  it("should read table to change disk", async function () {
    const sidebar = new SidebarPage(page);
    const storageNoDevicesFound = new StorageNoDevicesFoundPage(page);
    const dasd = new DasdPage(page);

    await sidebar.goToStorage();
    await storageNoDevicesFound.NavigateDasdDevices();
    await page.locator(dasd.deviceTableSelector).wait();

    console.log(
      "\nSingle cell:",
      await getTextInCells(
        page,
        dasd.deviceTableSelector,
        "Channel ID",
        "0.0.0150",
        "Status",
      ),
    );

    console.log(
      "\nMultiple cells:",
      await getTextInCells(
        page,
        dasd.deviceTableSelector,
        "Channel ID",
        "0.0.0160",
        ["Status", "Device", "Type", "DIAG", "Formatted", "Partition Info"],
      ),
    );

    const checkbox = await getElementInCell(
      page,
      dasd.deviceTableSelector,
      "Channel ID",
      "0.0.0160",
      "input[type='checkbox']",
    );
    await checkbox.click();

    dasd.selectAllRows();

    await sleep(2000);
  });
}
