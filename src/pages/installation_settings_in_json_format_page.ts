import { type Page } from "puppeteer-core";

export class InstallationSettingsInJsonFormatPage {
  protected readonly page: Page;

  private readonly dialogSelector = 'div[role="dialog"]';

  private readonly downloadConfigurationButton = () =>
    this.page.locator("::-p-aria([name='Download configuration'][role='button'])");

  // the dialog exposes two buttons named "Close", the header "X" and this one
  private readonly closeButton = () => this.page.locator("button.pf-m-primary::-p-text(Close)");

  protected readonly editorContent = () =>
    this.page.locator('::-p-aria([name="Editor content"][role="textbox"])');

  protected readonly configurationDialog = () => this.page.locator(this.dialogSelector);

  protected readonly configuration = () =>
    this.page.locator(".pf-v6-c-code-editor__code .view-lines");

  constructor(page: Page) {
    this.page = page;
  }

  async downloadConfiguration() {
    await this.downloadConfigurationButton().click();
  }

  async close() {
    await this.closeButton().click();
    // the dialog is removed from the DOM on close; a locator cannot wait for an element that no
    // longer exists, whereas waitForSelector({ hidden }) accepts both hidden and absent elements
    await this.page.waitForSelector(this.dialogSelector, { hidden: true });
  }

  async displayedConfiguration(): Promise<string> {
    return this.configuration()
      .map((element) => element.textContent ?? "")
      .wait();
  }
}
