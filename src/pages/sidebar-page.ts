import puppeteer, { type Locator, type Page } from "puppeteer-core";

export class Sidebar {
    readonly page: Page;
    readonly overviewLink: Locator<Element>;
    readonly usersLink: Locator<Element>;

    constructor(page: Page) {
        this.page = page;
        this.overviewLink = page.locator("a[href='#/overview']")
        this.usersLink = page.locator("a[href='#/users']");
    }

    async navigateToOverview() {
        await this.overviewLink.click();
    }

    async navigateToUsers() {
        await this.usersLink.click();
    }
}
