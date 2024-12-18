import { it, page } from "../lib/helpers";
import { ElementHandle } from "puppeteer-core";

export function setRootPassword(password: string) {
  it("allows setting the root password", async function () {
    await page.locator("a[href='#/users']").click();

    const button: ElementHandle = await Promise.any([
      page.waitForSelector("button::-p-text(Set a password)"),
      page.waitForSelector("button#actions-for-root-password"),
    ]);

    await button!.click();

    const id = await button!.evaluate((x) => x.id);
    // drop the handler to avoid memory leaks
    button!.dispose();

    // if the menu button was clicked we need to additionally press the "Change" menu item
    if (id === "actions-for-root-password") {
      await page.locator("button[role='menuitem']::-p-text('Change')").click();
    }

    await page.type("input#password", password);
    await page.type("input#passwordConfirmation", password);

    await page.locator("button::-p-text(Confirm)").click();

    // wait until the password popup disappears
    await page.locator("input#passwordConfirmation").setVisibility("hidden").wait();
  });
}

export function setInitialRootPassword(password: string) {
  it("should require setting the root password in the initial dialog", async function () {
    await page
      .locator("input#rootPassword")
      // refreshing the repositories before showing the password configuration might take long time
      .setTimeout(60000)
      .waitHandle()
      // type the new password
      .then((h) => h.type(password));

    await page.locator("button[type='submit']").setWaitForEnabled(true).click();
  });
}
