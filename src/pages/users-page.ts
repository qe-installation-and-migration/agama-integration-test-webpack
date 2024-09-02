import puppeteer, { type Locator, type Page } from "puppeteer-core";

export class UsersPage {
    readonly page: Page;
    readonly firstUserLink: Locator<Element>;
    readonly setAPasswordText: Locator<Element>;

    constructor(page: Page) {
        this.page = page;
        this.firstUserLink = page.locator("a[href='#/users/first']");
        this.setAPasswordText = page.locator("button::-p-text(Set a password)");
    }

    async defineAUser() {
        await this.firstUserLink.click();
    }

    async setPassword() {
        await this.setAPasswordText.click();
    }
}
