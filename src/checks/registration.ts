import { it, page } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";
import { RegistrationEnterCodePage } from "../pages/registration_enter_code_page";
import { SidebarWithRegistrationPage } from "../pages/sidebar_page";

export function enterRegistration(code: string) {
  it("should allow setting registration", async function () {
    const sidebar = new SidebarWithRegistrationPage(page);
    const registration = new RegistrationEnterCodePage(page);

    await sidebar.goToRegistration();
    await registration.fillCode(code);
    await registration.register();
  });

  it("should not display option to register in Overview", async function () {
    await new OverviewPage(page).waitWarningAlertToDisappear();
  });
}

export function enterRegistrationHa(code: string) {
  it("should allow setting registration HA", async function () {
    const sidebar = new SidebarWithRegistrationPage(page);
    const registration = new RegistrationEnterCodePage(page);

    await sidebar.goToRegistration();
    await registration.fillCodeHa(code);
    await registration.register();
  });
}
