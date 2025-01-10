import { type Page } from "puppeteer-core";

export class ProductSelectionPage {
  private readonly page: Page;
  private readonly productText = (name: string) => this.page.locator(`::-p-text(${name})`);
  private readonly productId = (id: string) => this.page.locator(`input#${id}`);
  private readonly selectButton = () => this.page.locator("button[form='productSelectionForm']");

  constructor(page: Page) {
    this.page = page;
  }

  async selectProduct(id: string) {
    (await this.productId(id).waitHandle()).scrollIntoView();
    await this.productId(id).click();
    await this.selectButton().click();
  }

  async selectProductByName(name: string) {
    (await this.productText(name).waitHandle()).scrollIntoView();
    await this.productText(name).click();
    await this.selectButton().click();
  }
}
