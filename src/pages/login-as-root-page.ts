import puppeteer, { type Page } from "puppeteer-core";

export class LoginAsRootPage {
    readonly page: Page;
    readonly passwordInput = () => this.page.locator("input#password");
    readonly logInButton = () => this.page.locator("button[type='submit']");

    constructor(page: Page) {
        this.page = page;
    }

    async logIn(password: string) {
        await this.passwordInput().fill(password);
        await this.logInButton().click();
    }
}
