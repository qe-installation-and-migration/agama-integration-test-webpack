import { type Page } from "puppeteer-core";

export class ConfirmInstallationPage {
    private readonly page: Page;
    private readonly continueButton = () => this.page.locator("button::-p-text('Continue')");

    constructor(page: Page) {
        this.page = page;
    }

    async continue() {
        await this.continueButton().click();
    }
}
