import { it, page, Lazy } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";
import { OverviewWithSidebarPage } from "../pages/overview_with_sidebar_page";
import {
  ProductSelectionPage,
  ProductSelectionWithLicenseAndModePage,
  ProductSelectionWithLicensePage,
} from "../pages/product_selection_page";

function chooseProduct(pageProvider: Lazy<ProductSelectionPage>, productId: string) {
  it(`should allow to choose product ${productId}`, async function () {
    await pageProvider.get().choose(productId);
  });
}

function reviewAndAcceptlicenseAndAcceptProduct(
  pageProvider: Lazy<ProductSelectionWithLicensePage>,
) {
  it(`should allow to review its license`, async function () {
    const po = pageProvider.get();
    await po.openLicense();
    await po.verifyLicense();
    await po.closeLicense();
  });
  it(`should allow to accept its license`, async function () {
    await pageProvider.get().acceptProductLicense();
  });
  it(`should allow to accept selected product`, async function () {
    await pageProvider.get().select();
  });
}

export function ensureLandingOnOverview() {
  it(
    "should display Overview",
    async function () {
      await new OverviewPage(page).waitVisible(70000);
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

export function productSelection(productId: string) {
  it(`should allow to select product ${productId}`, async function () {
    const productSelectionPage = new ProductSelectionPage(page);
    await productSelectionPage.choose(productId);
    await productSelectionPage.select();
  });
}

export function productSelectionWithSidebar(productId: string) {
  it(`should allow to select product ${productId}`, async function () {
    const productSelectionPage = new ProductSelectionPage(page);
    await productSelectionPage.choose(productId);
    await productSelectionPage.select();
  });
}

export function productSelectionWithLicense(productId: string) {
  const pageProvider = new Lazy(ProductSelectionWithLicensePage);
  chooseProduct(pageProvider, productId);
  reviewAndAcceptlicenseAndAcceptProduct(pageProvider);
}

export function productSelectionWithLicenseAndMode(productId: string, productMode: string) {
  const pageProvider = new Lazy(ProductSelectionWithLicenseAndModePage);
  chooseProduct(pageProvider, productId);
  it(`should allow to select mode ${productMode}`, async function () {
    await pageProvider.get().selectMode(productMode);
  });
  reviewAndAcceptlicenseAndAcceptProduct(pageProvider);
}

export function productSelectionWithLicenseWithSidebar(productId: string) {
  it(`should allow to choose product ${productId}`, async function () {
    await new ProductSelectionWithLicensePage(page).choose(productId);
  });
  it(`should allow to review its license`, async function () {
    const productSelectionWithLicensePage = new ProductSelectionWithLicensePage(page);
    await productSelectionWithLicensePage.openLicense();
    await productSelectionWithLicensePage.verifyLicense();
    await productSelectionWithLicensePage.closeLicense();
  });
  it(`should allow to accept its license`, async function () {
    await new ProductSelectionWithLicensePage(page).acceptProductLicense();
  });
  it(`should allow to select product`, async function () {
    await new ProductSelectionWithLicensePage(page).select();
  });
}
