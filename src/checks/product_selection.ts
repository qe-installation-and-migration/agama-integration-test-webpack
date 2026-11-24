import { it, page } from "../lib/helpers";
import { ProductSelectionWithLicenseAndModePage } from "../pages/product_selection_page";

export function productSelectionWithLicenseAndMode(
  productId: string,
  productMode: string,
  productVersion: string,
) {
  it(`should allow to choose product ${productId}`, async function () {
    await new ProductSelectionWithLicenseAndModePage(page).choose(productId);
  });
  it(`should allow to select mode ${productMode}`, async function () {
    await new ProductSelectionWithLicenseAndModePage(page).selectMode(productMode);
  });
  it(`should allow to review its license`, async function () {
    const productSelection = new ProductSelectionWithLicenseAndModePage(page);
    await productSelection.openLicense();
    await productSelection.verifyLicense();
    await productSelection.closeLicense();
  });
  it(`should allow to accept its license`, async function () {
    await new ProductSelectionWithLicenseAndModePage(page).acceptProductLicense();
  });
  it(`should allow to accept selected product`, async function () {
    await new ProductSelectionWithLicenseAndModePage(page).select(productMode, productVersion);
  });
}
