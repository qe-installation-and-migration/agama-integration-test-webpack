import { type Page } from "puppeteer-core";

export class SoftwareDesktopSelectionPage {
  private readonly page: Page;
  private readonly desktopCheckbox = (desktop: string) => this.page.locator(`input#${desktop}`);
  private readonly acceptButton = () => this.page.locator("::-p-aria(Accept)");

  constructor(page: Page) {
    this.page = page;
  }

  async select(desktop: string) {
    const shortName = desktop.toLowerCase().includes("gnome") ? "gnome" : "kde";
    await this.desktopCheckbox(shortName).click();
    console.log(`[Agama POM] Successfully toggled target selector: input#${shortName}`);
  }

  async accept() {
    await this.acceptButton().click();
  }
}
