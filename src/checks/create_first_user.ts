import { it, page, sleep } from "../lib/helpers";
import { CreateFirstUserPage } from "../pages/create-user-page";
import { UsersPage } from "../pages/users-page";

export function createFirstUser(fullName: string, userName: string, password: string) {
    it("should create first user", async function () {
        const users = new UsersPage(page);
        const createFirstUser = new CreateFirstUserPage(page);

        // todo: button is moving in the page and fails in slow machines
        await sleep(2000);
        await users.defineAUserNow();
        await createFirstUser.fillFullName(fullName);
        await createFirstUser.fillUserName(userName);
        await createFirstUser.fillPassword(password);
        await createFirstUser.fillPasswordConfirmation(password);
        await createFirstUser.accept();
    });
}
