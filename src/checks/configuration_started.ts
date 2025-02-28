import { it, page } from "../lib/helpers";
import { ConfiguringProductPage } from "../pages/configuring_product_page";

export function ensureProductConfigurationStarted() {
  it("should start configuring the product", async function () {
    await new ConfiguringProductPage(page).wait();
  });
}
