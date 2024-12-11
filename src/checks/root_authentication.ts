import { it, page, sleep } from "../lib/helpers";
import { SetupRootUserAuthenticationPage } from "../pages/setup_root_user_authentication_page";
import { SetARootPasswordPage } from "../pages/root_password_page";
import { SidebarPage } from "../pages/sidebar_page";
import { UsersPage } from "../pages/users_page";

export function setupRootPasswordAtALaterStage(password: string) {
    it("should allow setting the root password", async function () {
        const sidebar = new SidebarPage(page);
        const users = new UsersPage(page);
        const setARootPassword = new SetARootPasswordPage(page);

        await setARootPassword.fillPassword(password);
        await setARootPassword.confirm();
    });
}

export function setupRootPassword(password: string) {
    it("should setup root user authentication password", async function () {
        const setupRootuserAuthentication = new SetupRootUserAuthenticationPage(page);

        // longer timeout to refresh repos when coming from product selection
        await setupRootuserAuthentication.wait(2 * 60 * 1000);
        await setupRootuserAuthentication.fillPassword(password);
        await setupRootuserAuthentication.submit();
    });
}
