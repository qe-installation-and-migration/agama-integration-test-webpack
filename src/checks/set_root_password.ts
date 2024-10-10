import { it, page } from "../lib/helpers";
import { SetARootPasswordPage } from "../pages/root-password-page";
import { SidebarPage } from "../pages/sidebar-page";
import { UsersPage } from "../pages/users-page";

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
    });
}
