import { type Page } from "puppeteer-core";

export class SelectInstallationDevicePage {
    private readonly page: Page;
    private readonly newLvmVolumeGroupInput = () => this.page.locator("::-p-text(A new LVM Volume Group)");
    private readonly selectDiskInput = () => this.page.locator('::-p-aria(Select row 0[role=\\"checkbox\\"])');
    private readonly acceptButton = () => this.page.locator("button::-p-text(Accept)");

    constructor(page: Page) {
        this.page = page;
    }

    async installOnNewLvm() {
        await this.newLvmVolumeGroupInput().click();
        await this.selectDiskInput().click();
        await this.acceptButton().click();
    }
}
