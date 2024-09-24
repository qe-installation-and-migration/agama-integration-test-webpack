import { type Page } from "puppeteer-core";

export class SoftwarePage {
    private readonly page: Page;
    private readonly changeSelectionButton = () => this.page.locator("button::-p-text(ChangeSelection)");

    constructor(page: Page) {
        this.page = page;
    }

    async changeSelection() {
        await this.changeSelectionButton().click();
    }
}
