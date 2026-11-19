import { type Page } from "puppeteer-core";

export class ToolbarPage {
  protected readonly page: Page;

  private readonly moreOptionsButton = () =>
    this.page.locator('::-p-aria(More options[role="button"])');

  private readonly showConfigurationMenuitem = () =>
    this.page.locator('::-p-aria(Show configuration[role="menuitem"])');

  private readonly optionsToggle = () => this.page.locator("::-p-aria(Options toggle)");
  private readonly downloadLogsMenuItem = () => this.page.locator("::-p-aria(Download logs)");
  public readonly successAlertHeading = () =>
    this.page.locator(".pf-v6-c-alert.pf-m-success h4::-p-text(Installation logs download)");

  private readonly statusIdleButton = () =>
    this.page.locator('::-p-aria([name="Status: Idle"][role="button"])');

  private readonly noPendingTasksDialog = () =>
    this.page.locator('::-p-aria([name="No pending tasks"][role="dialog"])');

  private readonly allTasksCompletedText = () =>
    this.page.locator(
      '::-p-aria([name="No pending tasks"][role="dialog"]) ::-p-text(All background tasks completed)',
    );

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

  async clickShowConfiguration() {
    await this.showConfigurationMenuitem().click();
  }

  async clickShowSystemIdle() {
    await this.statusIdleButton().setTimeout(60_000).click();
  }

  async waitUntilNoPendingTasks(timeout = 30_000) {
    await this.noPendingTasksDialog().setTimeout(timeout).wait();
    await this.allTasksCompletedText().setTimeout(timeout).wait();
  }
}
