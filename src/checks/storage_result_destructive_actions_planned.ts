import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StoragePage } from "../pages/storage_page";

export function verifyDecryptDestructiveActions(patterns: string[]) {
  it("should unfold list of destructive actions", async function () {
    await new SidebarPage(page).goToStorage();
    await new StoragePage(page).expandDestructiveActionsList();
  });

  it("should delete defined patterns", async function () {
    for (const action of patterns) {
      await new StoragePage(page).verifyDestructiveAction(action);
    }
  });
}
