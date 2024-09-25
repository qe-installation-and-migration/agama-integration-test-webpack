import puppeteer, { type Locator, type Page } from "puppeteer-core";

export class SetARootPassword {
    private readonly page: Page;
    private readonly passwordInput = () => this.page.locator("input#password");
    private readonly passwordConfirmationInput = () => this.page.locator("input#passwordConfirmation");
    private readonly confirmText = () => this.page.locator("button::-p-text(Confirm)");
    private readonly cancelText = () => this.page.locator("button::-p-text(Cancel)");

    constructor(page: Page) {
        this.page = page;
    }

    async fillPassword(password: string) {
        await this.passwordInput().fill(password);
    }

    async fillPasswordConfirmation(password: string) {
        await this.passwordConfirmationInput().fill(password);
    }

    async confirm() {
        await this.confirmText().click();
    }

    async set(password: string) {
        await this.passwordInput().fill(password);
        await this.passwordConfirmationInput().fill(password);
        await this.confirmText().click();
    }
}
