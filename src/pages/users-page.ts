import puppeteer, { type Locator, type Page } from "puppeteer-core";

export class UsersPage {
    private readonly page: Page;
    private readonly firstUserLink = () => this.page.$eval("a[href='#/users/first']", (elem: any) => elem.click());
    private readonly setAPasswordText = () => this.page.locator("button::-p-text(Set a password)");

    constructor(page: Page) {
        this.page = page;
    }

    async defineAUserNow() {
        // ensure click handler will be fired
        await this.firstUserLink();
    }

    async setAPassword() {
        await this.setAPasswordText().click();
    }
}
