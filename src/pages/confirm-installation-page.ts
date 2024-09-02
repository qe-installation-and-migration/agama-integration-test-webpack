import puppeteer, { type Locator, type Page } from "puppeteer-core";

export class ConfirmInstallationPopup {
    readonly page: Page;
    readonly continueText: Locator<Element>;

    constructor(page: Page) {
        this.page = page;
        this.continueText = page.locator("button::-p-text('Continue')");
    }

    async continue() {
        await this.continueText.click();
    }
}
