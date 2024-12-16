import { type Page } from "puppeteer-core";

export class SelectInstallationDevicePage {
    private readonly page: Page;
    //private readonly createLvm = () => this.page.locator("label[class='pf-v5-c-radio__input'] > input[type='radio']");
    //private readonly createLvm = () => this.page.locator('::-p-aria(A new LVM Volume Group)');
    //private readonly createLvm = () => this.page.locator('#create-lvm');
    //private readonly createLvm = () => this.page.locator('label[for="create-lvm"] input');
    //private readonly createLvm = () => this.page.locator(('span:has-text("A new LVM Volume Group")').locator('../input');
    //private readonly createLvm = () => this.page.locator("a[href='#create-lvm']");
    //private readonly createLvm = () => this.page.locator("label[class='pf-v5-c-radio' for='create-lvm'] > input[value='2']");
    //private readonly createLvm = () => this.page.locator("span[class='pf-v5-c-radio__input', has-text('A new LVM Volume Group')] > input[type='radio']");
    //private readonly createLvm = () => this.page.locator("span:has-text('A new LVM Volume Group') > input[type='radio']");
    private readonly createLvm = () => this.page.locator('::-p-xpath(//*[@id=\\"create-lvm\\"])');
    private readonly selectRow0 = () => this.page.locator("label[class='pf-v5-c-table__td pf-v5-c-table__check'] > input[type='checkbox']");
    private readonly acceptButton = () => this.page.locator("button::-p-text(Accept)");

    constructor(page: Page) {
        this.page = page;
    }

    async createLvmDevice() {
        await this.createLvm().click();
        await this.selectRow0().click();
        await this.acceptButton().click();
    }
}
