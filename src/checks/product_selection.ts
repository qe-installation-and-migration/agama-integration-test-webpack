import { it, page } from "../lib/helpers";
import { ProductSelectionWithLicensePage } from "../pages/product_selection_page";

export function productSelectionWithLicense(productId: string) {
  it(`should allow to choose product ${productId}`, async function () {
    await new ProductSelectionWithLicensePage(page).choose(productId);
  });
  it(`should allow to review its license`, async function () {
    const productSelection = new ProductSelectionWithLicensePage(page);
    await productSelection.openLicense();
    await productSelection.verifyLicense();
    await productSelection.closeLicense();
  });
  it(`should allow to accept its license`, async function () {
    await new ProductSelectionWithLicensePage(page).acceptProductLicense();
  });
  it(`should allow to accept selected product`, async function () {
    await new ProductSelectionWithLicensePage(page).select();
  });
}
