import puppeteer, { type Locator, type Page } from "puppeteer-core";

export class OverviewPage {
    readonly page: Page;
    readonly installText: Locator<Element>;

    constructor(page: Page) {
        this.page = page;
        this.installText = page.locator("button::-p-text('Install')");
    }

    async install() {
        await this.installText.click();
    }
}
