import { it, page, sleep } from "../lib/helpers";
import { SetARootPasswordPage } from "../pages/root_password_page";
import { SidebarPage } from "../pages/sidebar_page";
import { UsersPage } from "../pages/users_page";

export function setRootPassword(password: string) {
    it("should allow setting the root password", async function () {
        const sidebar = new SidebarPage(page);
        const users = new UsersPage(page);
        const setARootPassword = new SetARootPasswordPage(page);

        await sidebar.goToUsers();
        await users.setAPassword();
        await setARootPassword.fillPassword(password);
        await setARootPassword.fillPasswordConfirmation(password);
        await setARootPassword.confirm();
        // puppeteer goes too fast and screen is unresponsive after submit, a small delay helps
        await sleep(1000);
    });
}
