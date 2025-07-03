import { it, page } from "../lib/helpers";
import { ConfiguringProductPage } from "../pages/configuring_product_page";
import { OverviewPage } from "../pages/overview_page";

export function ensureProductConfigurationStarted() {
  it("should start configuring the product", async function () {
    await new ConfiguringProductPage(page).wait();
  });

  it("should display Overview", async function () {
    await new OverviewPage(page).waitVisible(40000);
  });
}
