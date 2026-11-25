import { it, page } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";
import { OverviewWithSidebarPage } from "../pages/overview_with_sidebar_page";

export function ensureLandingOnOverview() {
  it(
    "should display Overview",
    async function () {
      await new OverviewPage(page).ensureSystemInformationPresent(70000);
    },
    71 * 1000,
  );
}

export function ensureLandingOnOverviewWithSidebar() {
  it(
    "should display Overview",
    async function () {
      await new OverviewWithSidebarPage(page).waitVisible(70000);
    },
    71 * 1000,
  );
}
