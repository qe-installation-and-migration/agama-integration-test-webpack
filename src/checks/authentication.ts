import { it, page, sleep, getTextContent } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { UsersPage } from "../pages/users_page";
import { CreateFirstUserPage } from "../pages/create_user_page";
import { SetARootPasswordPage } from "../pages/root_authentication_methods";
import assert from "node:assert/strict";

export function createFirstUser(password: string) {
  it("should create first user", async function () {
    const users = new UsersPage(page);
    const createFirstUser = new CreateFirstUserPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToUsers();

    await users.defineAUserNow();
    await createFirstUser.fillFullName("Bernhard M. Wiedemann");
    await createFirstUser.fillUserName("bernhard");
    await createFirstUser.fillPassword(password);
    await createFirstUser.fillPasswordConfirmation(password);
    await createFirstUser.accept();
    // puppeteer goes too fast and screen is unresponsive after submit, a small delay helps
    await sleep(2000);
  });
}

export function editRootUser(password: string) {
  it("should edit the root user", async function () {
    const sidebar = new SidebarPage(page);
    const users = new UsersPage(page);
    const setARootPassword = new SetARootPasswordPage(page);

    await sidebar.goToUsers();
    await users.editRootUser();
    await setARootPassword.usePassword();
    await setARootPassword.fillPassword(password);
    await setARootPassword.fillPasswordConfirmation(password);
    await setARootPassword.accept();
    // puppeteer goes too fast and screen is unresponsive after submit, a small delay helps
    await sleep(2000);
  });
}

export function verifyPasswordStrength() {
  it("should verify the strength of typed password", async function () {
    const sidebar = new SidebarPage(page);
    const users = new UsersPage(page);
    const setARootPassword = new SetARootPasswordPage(page);

    await sidebar.goToUsers();
    await users.editRootUser();

    await setARootPassword.fillPassword("a23b56c");
    const elementTextPasswordLess8Characters = await getTextContent(
      setARootPassword.alertPasswordLess8CharactersText(),
    );
    assert.deepEqual(
      elementTextPasswordLess8Characters,
      "Warning alert:The password is shorter than 8 characters",
    );

    await setARootPassword.fillPassword("a23b56ca");
    const elementTextPasswordIsWeak = await getTextContent(
      setARootPassword.alertPasswordIsWeakText(),
    );
    assert.deepEqual(elementTextPasswordIsWeak, "Warning alert:The password is weak");

    await setARootPassword.fillPassword("a23b5678");
    const elementTextPasswordFailDictionary = await getTextContent(
      setARootPassword.alertPasswordFailDictionaryCheckText(),
      50000,
    );
    assert.deepEqual(
      elementTextPasswordFailDictionary,
      "Warning alert:The password fails the dictionary check - it is too simplistic/systematic",
    );
  });
}
