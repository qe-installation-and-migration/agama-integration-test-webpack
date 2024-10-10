import { it, page } from "../lib/helpers";
import { LoginAsRootPage } from "../pages/login-as-root-page";

export function login(password: string) {
    it("allows logging in", async function () {
        const loginAsRoot = new LoginAsRootPage(page);

        await loginAsRoot.fillPassword(password);
        await loginAsRoot.logIn();
    });
}
