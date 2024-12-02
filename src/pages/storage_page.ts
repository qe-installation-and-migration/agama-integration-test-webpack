import { type Page } from "puppeteer-core";

export class StoragePage {
    private readonly page: Page;
    private readonly enableButton = () => this.page.locator("button::-p-text(Enable)");
    private readonly enabledDiv = () => this.page.locator("div::-p-text(enabled)");

    constructor(page: Page) {
        this.page = page;
    }

    async enableEncryption() {
        await this.enableButton().click();
    }

    async verifyEncryptionEnabled() {
        await this.enabledDiv().wait();
    }
}
