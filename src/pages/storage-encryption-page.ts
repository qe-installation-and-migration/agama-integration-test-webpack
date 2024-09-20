import { type Page } from "puppeteer-core";

export class StorageEncryptionPage {
    readonly page: Page;
    readonly encryptTheSystemCheckbox = () => this.page.locator("label[class='pf-v5-c-switch'] > input[type='checkbox']");
    readonly passwordInput = () => this.page.locator("#password");
    readonly passwordConfirmationInput = () => this.page.locator("#passwordConfirmation");
    readonly acceptButton = () => this.page.locator("button::-p-text(Accept)");

    constructor(page: Page) {
        this.page = page;
    }

    async encrypt(password: string) {
        const value: string | null = await this.page.$eval("#password", (input) => {
            return input.getAttribute("value");
        });
        if (!value) {
            await this.encryptTheSystemCheckbox().click();
        }
        await this.passwordInput().fill(password);
        await this.passwordConfirmationInput().fill(password);
        await this.acceptButton().click();
    }
}