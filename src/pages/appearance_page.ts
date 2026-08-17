import { type Page } from "puppeteer-core";

export class AppearancePage {
  protected readonly page: Page;

  private readonly appearanceButton = () =>
    this.page.locator('::-p-aria([name="Appearance"][role="button"])');

  private readonly popover = () => this.page.locator('::-p-aria([role="dialog"])');
  private readonly closeButton = () =>
    this.page.locator('::-p-aria([name="Close"][role="button"])');

  private readonly darkColorSchemeButton = () =>
    this.page.locator('::-p-aria([name="Dark color scheme"][role="button"])');

  private readonly highContrastButton = () =>
    this.page.locator('::-p-aria([name="High contrast"][role="button"])');

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.appearanceButton().click();
    await this.popover().wait();
  }

  async close() {
    await this.closeButton().click();
  }

  async selectDarkColorScheme() {
    await this.darkColorSchemeButton().click();
  }

  async selectHighContrast() {
    await this.highContrastButton().click();
  }

  isDarkColorSchemeSelected(): Promise<boolean> {
    return this.darkColorSchemeButton()
      .map((element) => element.getAttribute("aria-pressed") === "true")
      .wait();
  }

  isHighContrastSelected(): Promise<boolean> {
    return this.highContrastButton()
      .map((element) => element.getAttribute("aria-pressed") === "true")
      .wait();
  }

  themeClasses(): Promise<string[]> {
    return this.page.evaluate(() => [...document.documentElement.classList]);
  }
}
