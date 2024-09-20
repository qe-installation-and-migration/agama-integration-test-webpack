import { type Page } from "puppeteer-core";

export class SidebarPage {
    readonly page: Page;
    readonly overviewLink = () => this.page.locator("a[href='#/overview']");
    readonly localizationLink = () => this.page.locator("a[href='#/l10n']");
    readonly networkLink = () => this.page.locator("a[href='#/network']");
    readonly storageLink = () => this.page.locator("a[href='#/storage']");
    readonly softwareLink = () => this.page.locator("a[href='#/software']");
    readonly usersLink = () => this.page.locator("a[href='#/users']");

    constructor(page: Page) {
        this.page = page;
    }

    async goToOverview() {
        await this.overviewLink().click();
    }

    async goToLocalization() {
        await this.localizationLink().click();
    }

    async goToNetwork() {
        await this.networkLink().click();
    }

    async goToStorage() {
        await this.storageLink().click();
    }

    async goToSoftware() {
        await this.softwareLink().click();
    }

    async goToUsers() {
        await this.usersLink().click();
    }

}