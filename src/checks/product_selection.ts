import { it, page } from "../lib/helpers";
import { ConfiguringProductPage } from "../pages/configuring_product_page";
import { ProductSelectionPage } from "../pages/product_selection_page";

export function productSelection(productName: string) {
  it(`should allow to select product ${productName}`, async function () {
    await new ProductSelectionPage(page).selectProduct(productName);
  });

  it("should start configuring the product", async function () {
    await new ConfiguringProductPage(page).wait();
  });
}
