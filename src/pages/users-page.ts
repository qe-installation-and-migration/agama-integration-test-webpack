import puppeteer, { type Locator, type Page } from "puppeteer-core";

export class UsersPage {
    private readonly page: Page;
    private readonly firstUserLink = () => this.page.locator("a[href='#/users/first']");
    private readonly setAPasswordText = () => this.page.locator("button::-p-text(Set a password)");

    constructor(page: Page) {
        this.page = page;
    }

    async defineAUserNow() {
        await this.firstUserLink().click();
    }

    async setAPassword() {
        await this.setAPasswordText().click();
    }
}
