import { it, page, waitUntilOverlaySettled } from "../lib/helpers";
import { HeaderPage } from "../pages/header_page";
import { OverviewPage } from "../pages/overview_page";
import { StorageSettingsPage as StorageNoDevicesFound } from "../pages/storage_settings_page";
import { StorageZfcpActivateControllersPage } from "../pages/storage_zfcp_activate_controllers_page";
import { ActivateControllersPage as StorageZfcpControllersNotActivatedPage } from "../pages/activate_controllers_page";
import { StorageActivateMultipathPage } from "../pages/storage_activate_multipath_page";

export function prepareZfcpStorage() {
  it("should prepare zFCP storage", async function () {
    const storageNoDeviceFound = new StorageNoDevicesFound(page);
    const storageZfcpControllersNotActivated = new StorageZfcpControllersNotActivatedPage(page);
    const storageZfcpActivateControllers = new StorageZfcpActivateControllersPage(page);
    const header = new HeaderPage(page);
    const overview = new OverviewPage(page);
    const storageActivateMultipath = new StorageActivateMultipathPage(page);

    await overview.goToStorage();
    await storageNoDeviceFound.activateZfcpDisks();
    await storageZfcpControllersNotActivated.activateControllers();
    await storageZfcpActivateControllers.select(["0.0.fa00", "0.0.fc00"]);
    await waitUntilOverlaySettled(() => storageZfcpActivateControllers.accept(), true);
    await waitUntilOverlaySettled(() => storageActivateMultipath.yes());
    await header.goToInstallation();
  });
}
