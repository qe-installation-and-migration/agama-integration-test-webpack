import { type Page } from "puppeteer-core";

export class InstallingPage {
    private readonly page: Page;
    private readonly installingTheSystemText = () => this.page.locator("::-p-text(Installing the)");

    constructor(page: Page) {
        this.page = page;
    }

    async wait() {
        await this.installingTheSystemText().wait();
    }
}
