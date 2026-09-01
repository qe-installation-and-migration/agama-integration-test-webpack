import { it, page, waitUntilOverlaySettled } from "../lib/helpers";
import {
  ProductSelectionPage,
  ProductSelectionWithLicensePage,
  ProductSelectionWithLicenseAndModePage,
} from "../pages/product_selection_page";

export function productSelection(productId: string) {
  it(`should allow to select product ${productId}`, async function () {
    const productSelectionPage = new ProductSelectionPage(page);
    await productSelectionPage.choose(productId);
    await productSelectionPage.select();
  });
}

export function productSelectionWithLicenseAndMode(productId: string, productMode: string) {
  let productSelection: ProductSelectionWithLicensePage | ProductSelectionWithLicenseAndModePage;

  it(`should allow to choose product ${productId}`, async function () {
    productSelection =
      productMode !== "none"
        ? new ProductSelectionWithLicenseAndModePage(page)
        : new ProductSelectionWithLicensePage(page);
    await productSelection.choose(productId);
  });
  if (productMode !== "none") {
    it(`should allow to select mode ${productMode}`, async function () {
      await (productSelection as ProductSelectionWithLicenseAndModePage).selectMode(productMode);
    });
  }
  it(`should allow to review its license`, async function () {
    await productSelection.openLicense();
    await productSelection.verifyLicense();
    await productSelection.closeLicense();
  });
  it(`should allow to accept its license`, async function () {
    await productSelection.acceptProductLicense();
  });
  it(`should allow to accept selected product`, async function () {
    await waitUntilOverlaySettled(async () => {
      await productSelection.select();
    });
  });
}
