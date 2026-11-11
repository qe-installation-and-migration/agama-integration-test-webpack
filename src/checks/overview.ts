import { it, page } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";
import { ToolbarPage } from "../pages/toolbar_page";

export function ensureLandingOnOverview() {
  it("should display Overview", async function () {
    const overview = new OverviewPage(page);
    const toolbar = new ToolbarPage(page);

    await overview.ensureSystemInformationPresent(70_000);

    await toolbar.clickShowSystemIdle();
    await toolbar.waitUntilNoPendingTasks();
  }, 165_000);
}
