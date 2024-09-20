import { type Page } from "puppeteer-core";

export class StoragePage {
    readonly page: Page;
    readonly enableButton = "button::-p-text(Enable)";
    readonly modifyButton = "button::-p-text(Modify)";
    readonly enabledDiv = "div::-p-text(enabled)";

    constructor(page: Page) {
        this.page = page;
    }

    async enableEncryption() {
        const button: any = await Promise.any([
            this.page.waitForSelector(this.enableButton),
            this.page.waitForSelector(this.modifyButton)
        ]);
        await button.click();
    }

    async isEncryptionEnabled() {
        await this.page.locator(this.enabledDiv).wait();
    }
}