import puppeteer, { type Locator, type Page } from "puppeteer-core";

export class LoginAsRootPage {
    readonly page: Page;
    readonly passwordInput: Locator<Element>;
    readonly logInButton: Locator<Element>;

    constructor(page: Page) {
        this.page = page;
        this.passwordInput = page.locator("input#password");
        this.logInButton = page.locator("button[type='submit']");
    }

    async logIn(password: string) {
        await this.passwordInput.fill(password);
        await this.logInButton.click();
    }
}
