import { type Page } from "puppeteer-core";

export class StorageEncryptionPage {
    private readonly page: Page;
    private readonly encryptTheSystemCheckbox = () => this.page.locator("label[class='pf-v5-c-switch'] > input[type='checkbox']");
    private readonly passwordInput = () => this.page.locator("#password");
    private readonly passwordConfirmationInput = () => this.page.locator("#passwordConfirmation");
    private readonly acceptButton = () => this.page.locator("button::-p-text(Accept)");

    constructor(page: Page) {
        this.page = page;
    }

    async encrypt(password: string) {
        await this.encryptTheSystemCheckbox().click();
        await this.passwordInput().fill(password);
        await this.passwordConfirmationInput().fill(password);
        await this.acceptButton().click();
    }
}
