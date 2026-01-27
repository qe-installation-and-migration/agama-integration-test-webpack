import { it, page } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageResultPage } from "../pages/storage_result_page";
import { StorageResultPageWithSidebarPage } from "../pages/storage_result_page_with_sidebar_page";

export function verifyDecryptDestructiveActions(destructiveActions: string[]) {
  it("should display a list of destructive actions", async function () {
    const overview = new OverviewPage(page);
    await overview.goToStorage();
    const storage = new StorageResultPage(page);
    await storage.scrollToDestructiveActionsList();
    for (const action of destructiveActions) {
      await storage.destructiveActionText(action).wait();
    }
  });
}

export function verifyDecryptDestructiveActionsWithSidebar(destructiveActions: string[]) {
  it("should display a list of destructive actions", async function () {
    await new SidebarPage(page).goToStorage();
    const storage = new StorageResultPageWithSidebarPage(page);
    await storage.scrollToDestructiveActionsList();
    for (const action of destructiveActions) {
      await storage.destructiveActionText(action).wait();
    }
  });
}
