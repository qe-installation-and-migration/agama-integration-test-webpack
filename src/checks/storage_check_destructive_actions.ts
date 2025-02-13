import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StoragePage } from "../pages/storage_page";

export function checkDestructiveActions() {
  it("should have correct destructive actions", async function () {
    const storage = new StoragePage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storage.verifyDecrytDestructiveActions();
  });
}
