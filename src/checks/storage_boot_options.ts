import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StoragePage } from "../pages/storage_page";
import { StorageBootOptionsPage } from "../pages/storage_boot_options";

export function configureBootDevice() {
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
