import puppeteer, { type Locator, type Page } from "puppeteer-core";

export class CreateUserDialog {
    readonly page: Page;
    readonly inputUserFullName: Locator<Element>;
    readonly inputUserName: Locator<Element>;
    readonly inputPassword: Locator<Element>;
    readonly inputPasswordConfirmation: Locator<Element>;
    readonly acceptButton: Locator<Element>;

    constructor(page: Page) {
        this.page = page;
        this.inputUserFullName = page.locator("input#userFullName");
        this.inputUserName = page.locator("input#userName");
        this.inputPassword = page.locator("input#password");
        this.inputPasswordConfirmation = page.locator("input#passwordConfirmation");
        this.acceptButton = page.locator("button[form='firstUserForm']");
    }

    async createUser(userFullName: string, userName: string, password: string) {
        await this.inputUserFullName.fill(userFullName);
        await this.inputUserName.fill(userName);
        await this.inputPassword.fill(password);
        await this.inputPasswordConfirmation.fill(password);
        await this.acceptButton.click();
    }
}
