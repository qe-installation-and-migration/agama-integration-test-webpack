import { it, page } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";
import { ProductRegistrationPage, ExtensionHaRegistrationPage } from "../pages/registration_page";
import { SidebarWithRegistrationPage } from "../pages/sidebar_page";

export function enterRegistration(code: string) {
  it("should allow setting registration", async function () {
    const sidebar = new SidebarWithRegistrationPage(page);
    const productRegistration = new ProductRegistrationPage(page);

    await sidebar.goToRegistration();
    await productRegistration.fillCode(code);
    await productRegistration.register();
  });

  it("should display Overview", async function () {
    await new OverviewPage(page).waitVisible(40000);
  });
}

export function enterRegistrationHa(code: string) {
  it("should allow setting registration HA", async function () {
    const sidebar = new SidebarWithRegistrationPage(page);
    const extensionRegistration = new ExtensionHaRegistrationPage(page);

    await sidebar.goToRegistration();
    await extensionRegistration.fillCode(code);
    await extensionRegistration.register();
    await extensionRegistration.verifyExtensionRegistration();
  });
}
