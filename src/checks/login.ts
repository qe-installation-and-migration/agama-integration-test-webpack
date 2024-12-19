import assert from "node:assert/strict";
import { it, page } from "../lib/helpers";
import { LoginAsRootPage } from "../pages/login_as_root_page";

export function logIn(password: string) {
  it("should have Agama page title", async function () {
    assert.deepEqual(await page.title(), "Agama");
  });

  it("should allow logging in", async function () {
    const loginAsRoot = new LoginAsRootPage(page);

    await loginAsRoot.fillPassword(password);
    await loginAsRoot.logIn();
  });
}
