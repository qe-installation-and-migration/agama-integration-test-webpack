import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StoragePage } from "../pages/storage_page";

export function verifyDecryptDestructiveActions(destructiveActions: string[]) {
  it("should display a list of destructive actions", async function () {
    await new SidebarPage(page).goToStorage();
    await new StoragePage(page).expandDestructiveActionsList();
    for (const action of destructiveActions) {
      await new StoragePage(page).verifyDestructiveAction(action);
    }
  });
}
