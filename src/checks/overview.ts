import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";

export function ensureOverviewVisible() {
  it("should display overview", async function () {
    await new SidebarPage(page).waitOverviewVisible(40000);
  });
}
