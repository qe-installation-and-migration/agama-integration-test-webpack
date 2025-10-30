import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageResultPage } from "../pages/storage_result_page";

export function verifyDecryptDestructiveActions(destructiveActions: string[]) {
  it("should display a list of destructive actions", async function () {
    await new SidebarPage(page).goToStorage();
    const storage = new StorageResultPage(page);
    await storage.scrollToDestructiveActionsList();
    for (const action of destructiveActions) {
      await storage.destructiveActionText(action).wait();
    }
  });
}
