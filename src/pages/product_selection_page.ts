import { type Page } from "puppeteer-core";
import { type GConstructor } from "../lib/helpers";

export class ProductSelectionPage {
  protected readonly page: Page;
  protected readonly productText = (name: string) => this.page.locator(`::-p-text(${name})`);
  protected readonly productId = (id: string) => this.page.locator(`input#${id}`);
  protected readonly selectButton = () => this.page.locator("button[form='productSelectionForm']");

  constructor(page: Page) {
    this.page = page;
  }

  async choose(id: string) {
    (await this.productId(id).waitHandle()).scrollIntoView();
    await this.productId(id).click();
  }

  async select(id: string) {
    await this.choose(id);
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

    async acceptLicense() {
      await this.licenseAcceptanceCheckbox().click();
    }

    async select(id: string) {
      await this.choose(id);
      await this.acceptLicense();
      await this.selectButton().click();
    }
  };
}

export class ProductSelectionWithRegistrationPage extends LicenseAcceptable(ProductSelectionPage) {}
