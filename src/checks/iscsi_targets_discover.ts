import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StoragePage } from "../pages/storage_page";
import { SelectInstallationDevicePage } from "../pages/select_installation_device_page";
import { IscsiPage } from "../pages/iscsi_page";
import { DiscoverIscsiTargetsPage } from "../pages/discover_iscsi_target_page";

export function discoverIscsiTargets(ipAddress: string) {
  it("should discover iSCSI Targets", async function () {
    const sidebar = new SidebarPage(page);
    const storage = new StoragePage(page);
    const selectInstallationDevice = new SelectInstallationDevicePage(page);
    const iscsi = new IscsiPage(page);
    const discoverIscsiTargets = new DiscoverIscsiTargetsPage(page);

    await sidebar.goToStorage();
    await storage.changeInstallationDevice();
    await selectInstallationDevice.selectStorageTechs();
    await iscsi.discoverTargets();
    await discoverIscsiTargets.fillIpAddress(ipAddress);
    await discoverIscsiTargets.confirm();
  });
}
