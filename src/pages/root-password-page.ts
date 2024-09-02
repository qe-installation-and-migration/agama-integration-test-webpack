import puppeteer, { type Locator, type Page } from "puppeteer-core";

export class RootPasswordDialog {
    readonly page: Page;
    readonly inputPassword: Locator<Element>;
    readonly inputPasswordConfirmation: Locator<Element>;
    readonly confirmText: Locator<Element>;
    readonly cancelText: Locator<Element>;

    constructor(page: Page) {
        this.page = page;
        this.inputPassword = page.locator("input#password");
        this.inputPasswordConfirmation = page.locator("input#passwordConfirmation");
        this.confirmText = page.locator("button::-p-text(Confirm)");
        this.cancelText = page.locator("button::-p-text(Cancel)");
    }

    async setRootPassword(password: string) {
        await this.inputPassword.fill(password);
        await this.inputPasswordConfirmation.fill(password);
        await this.confirmText.click();
    }
}
