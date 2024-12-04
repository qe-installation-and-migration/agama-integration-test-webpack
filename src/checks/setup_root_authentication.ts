import { it, page } from "../lib/helpers";
import { SetupRootUserAuthenticationPage } from "../pages/setup_root_user_authentication_page";

export function setupRootAuthenticationPassword(password: string) {    
    it("should setup root user authentication password", async function () {
        const setupRootuserAuthentication = new SetupRootUserAuthenticationPage(page);
        // longer timeout to refresh repos when coming from product selection
        await setupRootuserAuthentication.wait(2 * 60 * 1000);
        await setupRootuserAuthentication.fillPassword(password);
        await setupRootuserAuthentication.submit();
    });
}
