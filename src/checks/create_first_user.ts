import { it, page, sleep } from "../lib/helpers";
import { CreateFirstUserPage } from "../pages/create_user_page";
import { UsersPage } from "../pages/users_page";
import { SidebarPage } from "../pages/sidebar_page";

export function createFirstUser(fullName: string, userName: string, password: string) {
    it("should create first user", async function () {
        const users = new UsersPage(page);
        const createFirstUser = new CreateFirstUserPage(page);
        const sidebar = new SidebarPage(page);

        await sidebar.goToUsers();

        await users.defineAUserNow();
        await createFirstUser.fillFullName(fullName);
        await createFirstUser.fillUserName(userName);
        await createFirstUser.fillPassword(password);
        await createFirstUser.fillPasswordConfirmation(password);
        await createFirstUser.accept();
        // puppeteer goes too fast and screen is unresponsive after submit, a small delay helps
        await sleep(1000);
    });
}
