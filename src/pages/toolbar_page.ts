import { type Page } from "puppeteer-core";

export class ToolbarPage {
  protected readonly page: Page;

  private readonly moreOptionsButton = () =>
    this.page.locator('::-p-aria(More options[role="button"])');

  private readonly showConfigurationMenuItem = () =>
    this.page.locator('::-p-aria(Show configuration[role="menuitem"])');

  private readonly optionsToggle = () => this.page.locator("::-p-aria(Options toggle)");
  private readonly downloadLogsMenuItem = () => this.page.locator("::-p-aria(Download logs)");
  public readonly successAlertHeading = () =>
    this.page.locator(".pf-v6-c-alert.pf-m-success h4::-p-text(Installation logs download)");

  constructor(page: Page) {
    this.page = page;
  }

  async openMoreOptions() {
    const toggle = await Promise.any([
      this.moreOptionsButton().waitHandle(),
      this.optionsToggle().waitHandle(),
    ]);
    await toggle.click();
  }

  async downloadLogs() {
    await this.openMoreOptions();
    await this.downloadLogsMenuItem().click();
  }

  async showConfiguration() {
    await this.openMoreOptions();
    await this.showConfigurationMenuItem().click();
  }
}
