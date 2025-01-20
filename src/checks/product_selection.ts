import { it, page } from "../lib/helpers";
import { ConfiguringProductPage } from "../pages/configuring_product_page";
import {
  ProductSelectionPage,
  ProductSelectionWithRegistrationPage,
} from "../pages/product_selection_page";

function configuringProductStarted() {
  it("should start configuring the product", async function () {
    await new ConfiguringProductPage(page).wait();
  });
}

export function productSelectionByName(productName: string) {
  it(`should allow to select product ${productName}`, async function () {
    await new ProductSelectionPage(page).selectByName(productName);
  });

  configuringProductStarted();
}

export function productSelection(productId: string) {
  it(`should allow to select product ${productId}`, async function () {
    await new ProductSelectionPage(page).select(productId);
  });

  configuringProductStarted();
}

export function productSelectionWithLicense(productId: string) {
  it(`should allow to select product ${productId} accepting its license`, async function () {
    await new ProductSelectionWithRegistrationPage(page).select(productId);
  });

  configuringProductStarted();
}
