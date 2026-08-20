import { it, page, waitUntilOverlaySettled } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageSettingsPage } from "../pages/storage_settings_page";
import { StoragePage } from "../pages/storage_page";
import { StorageBootOptionsPage } from "../pages/storage_boot_options";
import { HeaderPage } from "../pages/header_page";

export function configureBootDevice() {
  it("should configure boot partition in a separated disk", async function () {
    const overview = new OverviewPage(page);
    const storageSettings = new StorageSettingsPage(page);
    const storageBootOptions = new StorageBootOptionsPage(page);
    const header = new HeaderPage(page);

    await overview.goToStorage();
    await storageSettings.selectBootOptions();
    await storageSettings.changeBootOptions();
    // Pass option 'value' (here 42 for vdd) instead of 'name (size)' in the select element
    // https://progress.opensuse.org/issues/205914
    await storageBootOptions.selectADisk("42");
    await waitUntilOverlaySettled(() => storageBootOptions.accept());
    await header.goToInstallation();
  });
}

export function configureBootDeviceWithSidebar() {
  it("should configure boot partition in a separated disk", async function () {
    const sidebar = new SidebarPage(page);
    const storage = new StoragePage(page);
    const storageBootOptions = new StorageBootOptionsPage(page);

    await sidebar.goToStorage();
    await storage.otherOptions();
    await storage.changeBootOptions();
    // Pass option 'value' (here 46 for vdd) instead of 'name (size)' in the select element
    // https://progress.opensuse.org/issues/205914
    await storageBootOptions.selectADisk("46");
    await storageBootOptions.accept();
  });
}
