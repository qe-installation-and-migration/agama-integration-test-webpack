import { it, page } from "../lib/helpers";
import { HeaderPage } from "../pages/header_page";
import { OverviewPage } from "../pages/overview_page";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageResultPage } from "../pages/storage_result_page";

export function verifyDecryptDestructiveActions() {
  it("should display a list of destructive actions", async function () {
    await new OverviewPage(page).goToStorage();
    const storage = new StorageResultPage(page);
    await storage.scrollToDestructiveActionsList();
    for (const action of [
      "btrfs on /dev/system/lv",
      "logical volume lv",
      "swap on /dev/system/lv0",
      "logical volume lv0",
      "volume group system",
      "partition /dev/vda1",
      "partition /dev/vda2",
      "GPT",
    ]) {
      await storage.destructiveActionText(action).wait();
    }
    await new HeaderPage(page).goToInstallation();
  });
}

export function verifyDecryptDestructiveActionsWithSidebar() {
  it("should display a list of destructive actions", async function () {
    await new SidebarPage(page).goToStorage();
    const storage = new StorageResultPage(page);
    await storage.expandDestructiveActionsList();
    for (const action of [
      "btrfs on /dev/system/lv",
      "logical volume lv",
      "swap on /dev/system/lv0",
      "logical volume lv0",
      "volume group system",
      "partition /dev/vda1",
      "partition /dev/vda2",
      "GPT",
    ]) {
      await storage.destructiveActionText(action).wait();
    }
  });
}
