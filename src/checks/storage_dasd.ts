import { it, page, waitUntilOverlaySettled } from "../lib/helpers";
import { StorageSettingsPage } from "../pages/storage_settings_page";
import { DasdPage } from "../pages/dasd_page";
import { OverviewPage } from "../pages/overview_page";
import { HeaderPage } from "../pages/header_page";

export function prepareDasdStorage() {
  it(
    "should prepare DASD storage",
    async function () {
      const storage = new StorageSettingsPage(page);
      const dasd = new DasdPage(page);
      const overview = new OverviewPage(page);
      const header = new HeaderPage(page);

      await overview.goToStorage();
      await storage.manageDasd();
      await dasd.selectDevice();
      await waitUntilOverlaySettled(() => dasd.activateDevice());

      await dasd.selectDeviceToFormat();
      page.setDefaultTimeout(6 * 60 * 1000);
      await waitUntilOverlaySettled(() => dasd.formatNowDevice());

      await header.goToStorage();
      await storage.waitForElement("::-p-text(Installation devices)", 60000);
      await header.goToInstallation();
    },
    7 * 60 * 1000,
  );
}
