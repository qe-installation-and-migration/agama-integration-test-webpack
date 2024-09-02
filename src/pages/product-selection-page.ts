import puppeteer, { type Locator, type Page } from "puppeteer-core";

export class ProductSelectionPage {
    readonly page: Page;
    readonly leapText: Locator<Element>
    readonly microOsText: Locator<Element>
    readonly tumbleweedText: Locator<Element>
    readonly selectButton: Locator<Element>;

    constructor(page: Page) {
        this.page = page;
        this.leapText = page.locator("::-p-text('Leap 16.0 Alpha')");
        this.microOsText = page.locator("::-p-text('openSUSE MicroOS')");
        this.tumbleweedText = page.locator("::-p-text('openSUSE Tumbleweed')");
        this.selectButton = page.locator("button[form='productSelectionForm']");
    }

    async selectLeap() {
        await this.leapText.click();
        await this.selectButton.click();
    }

    async selectMicroOs() {
        await this.microOsText.click();
        await this.selectButton.click();
    }

    async selectTumbleweed() {
        await this.tumbleweedText.click();
        await this.selectButton.click();
    }
}

