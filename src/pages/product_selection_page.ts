import { type Page } from "puppeteer-core";

export class ProductSelectionPage {
    private readonly page: Page;
    private readonly productText = (product: string) => this.page.locator(`::-p-text('${product}')`);
    private readonly selectButton = () => this.page.locator("button[aria-disabled=\"false\"]::-p-text('Select')");

    constructor(page: Page) {
        this.page = page;
    }

    async selectProduct(product: string) {
        await this.productText(product).click();
        await this.selectButton().click();
    }
}
