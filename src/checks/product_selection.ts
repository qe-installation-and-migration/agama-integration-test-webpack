import { it, page } from "../lib/helpers";
import {
  ProductSelectionPage,
  ProductSelectionWithRegistrationPage,
} from "../pages/product_selection_page";

export function productSelectionByName(productName: string) {
  it(`should allow to select product ${productName}`, async function () {
    await new ProductSelectionPage(page).selectByName(productName);
  });
}

export function productSelection(productId: string) {
  it(`should allow to select product ${productId}`, async function () {
    const productSelectionPage = new ProductSelectionPage(page);
    await productSelectionPage.choose(productId);
    await productSelectionPage.select();
  });
}

export function productSelectionWithLicense(productId: string) {
  it(`should allow to choose product ${productId}`, async function () {
    await new ProductSelectionWithRegistrationPage(page).choose(productId);
  });
  it(`should allow to review its license`, async function () {
    const productSelectionWithRegistrationPage = new ProductSelectionWithRegistrationPage(page);
    await productSelectionWithRegistrationPage.openLicense();
    await productSelectionWithRegistrationPage.verifyLicense();
    await productSelectionWithRegistrationPage.closeLicense();
  });
  it(`should allow to accept its license`, async function () {
    await new ProductSelectionWithRegistrationPage(page).acceptProductLicense();
  });
  it(`should allow to select product`, async function () {
    await new ProductSelectionWithRegistrationPage(page).select();
  });
}
