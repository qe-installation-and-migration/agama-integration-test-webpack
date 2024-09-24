import { type Page } from "puppeteer-core";

export class SoftwareSelectionPage {
    private readonly page: Page;
    private readonly patternCheckbox = (name = 'GNOME Desktop Environment (Wayland)') => this.page.locator(`checkbox::-p-text(${name})`);
    private readonly patternCheckbox = (name = 'KDE Applications and Plasma Desktop') => this.page.locator(`checkbox::-p-text(${name})`);
    private readonly closeButton = () => this.page.locator("button::-p-text(Close)");

    constructor(page: Page) {
        this.page = page;
    }

    async selectGnomeDesktopEnvironment() {
        await this.patternCheckbox(name: 'GNOME Desktop Environment (Wayland)').click();
    }
    async close() {
	await this.closeButton().click();
    }
}
