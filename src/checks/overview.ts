import { it, page } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";

export function ensureLandingOnOverview() {
  it(
    "should display Overview",
    async function () {
      await new OverviewPage(page).ensureSystemInformationPresent(70000);
    },
    71 * 1000,
  );
}
