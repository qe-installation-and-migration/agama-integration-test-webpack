import { type Page } from "puppeteer-core";
import { type GConstructor } from "../lib/helpers";

export class ProductSelectionPage {
  protected readonly page: Page;
  protected readonly productText = (name: string) => this.page.locator(`::-p-text(${name})`);
  protected readonly productId = (id: string) =>
    this.page.locator("input#" + id.replaceAll(".", "\\."));

  protected readonly selectButton = () => this.page.locator("button[form='productSelectionForm']");

  constructor(page: Page) {
    this.page = page;
  }

  async choose(id: string) {
    (await this.productId(id).waitHandle()).scrollIntoView();
    await this.productId(id).click();
  }

  async select() {
    await this.selectButton().click();
  }

  async selectByName(name: string) {
    await this.choose(name);
    await this.selectButton().click();
  }
}

function LicenseAcceptable<TBase extends GConstructor<ProductSelectionPage>>(Base: TBase) {
  return class extends Base {
    private readonly licenseAcceptanceCheckbox = () =>
      this.page.locator("::-p-text(I have read and)");

    private readonly licenseOpenButton = () => this.page.locator("::-p-text(license)");
    private readonly licenseCloseButton = () => this.page.locator("::-p-text(Close)");
    private readonly licenseText = () => this.page.locator("::-p-text(End User License Agreement)");

    async acceptLicense() {
      await this.licenseAcceptanceCheckbox().click();
    }

    async openLicense() {
      await this.licenseOpenButton().click();
    }

    async verifyLicense() {
      await this.licenseText().wait();
    }

    async closeLicense() {
      await this.licenseCloseButton().click();
    }

    async acceptProductLicense() {
      await this.acceptLicense();
    }
  };
}

export class ProductSelectionWithRegistrationPage extends LicenseAcceptable(ProductSelectionPage) {}
