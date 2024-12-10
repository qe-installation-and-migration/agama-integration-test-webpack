import { it, page } from "../lib/helpers";
import { RegistrationEnterCodePage } from "../pages/registration_enter_code_page";
import { RegistrationProductRegisteredPage } from "../pages/registration_product_registered_page";
import { SidebarWithRegistrationPage } from "../pages/sidebar_page";

export function enterRegistration(code: string, email?: string) {
    it("should allow setting registration", async function () {
        const sidebar = new SidebarWithRegistrationPage(page);
        const registration = new RegistrationEnterCodePage(page);

        await sidebar.goToRegistration();
        await registration.fillCode(code);
        await registration.register();
    });

    it("should display the product is registered", async function () {
        new RegistrationProductRegisteredPage(page).wait(2 * 60 * 1000);
    });
}
