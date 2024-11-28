import { type Page } from "puppeteer-core";

export class SidebarPage {
    private readonly page: Page;
    private readonly overviewLink = () => this.page.locator("a[href='#/overview']");
    private readonly overviewText = () => this.page.locator("h3::-p-text('Overview')");
    private readonly localizationLink = () => this.page.locator("a[href='#/l10n']");
    private readonly networkLink = () => this.page.locator("a[href='#/network']");
    private readonly storageLink = () => this.page.locator("a[href='#/storage']");
    private readonly softwareLink = () => this.page.locator("a[href='#/software']");
    private readonly usersLink = () => this.page.locator("a[href='#/users']");

    constructor(page: Page) {
        this.page = page;
    }

    async goToOverview() {
        await this.overviewLink().click();
    }

    async waitOverviewVisible(timeout: number) {
        await this.overviewText().setTimeout(timeout).wait();
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
