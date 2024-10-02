import puppeteer, { type Locator, type Page } from "puppeteer-core";

export class ConfirmInstallationPopup {
    private readonly page: Page;
    private readonly continueText = () => this.page.locator("button::-p-text('Continue')");

    constructor(page: Page) {
        this.page = page;
    }

    async continue() {
        await this.continueText().click();
    }
}
