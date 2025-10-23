import { Locator, type Page } from "puppeteer-core";

export class DasdPage {
  private readonly page: Page;

  private readonly selectRow = (index) =>
    this.page.locator(`::-p-aria(Select row ${index}[role=\\"checkbox\\"])`);

  private readonly performAnActionToggleButton = () =>
    this.page.locator("::-p-text('Perform an action')");

  private readonly activateDisk = () => this.page.locator("::-p-text(Activate)");

  private readonly backButton = () => this.page.locator("button::-p-text(Back)");

  private readonly selectAllRowsCheckbox: Locator<Element>;

  public readonly deviceTableSelector: string;

  constructor(page: Page) {
    this.page = page;
    this.deviceTableSelector = 'table[data-type="agama/expandable-selector"]';
    this.selectAllRowsCheckbox = this.page.locator('table[data-type="agama/expandable-selector"] thead input[name="check-all"]');
  }

  async selectAllRows() {
    await this.selectAllRowsCheckbox.click();
  }

  async activateDevice() {
    await this.selectRow(0).click();
    await this.performAnActionToggleButton().click();
    await this.activateDisk().click();
  }

  async back() {
    await this.backButton().click();
  }
}
