import { skip } from "node:test";
import { it, page } from "../lib/helpers";

export function optionalProductSelection(product: string) {
  it("should optionally display the product selection dialog", async function () {
    // Either the main page is displayed (with the storage link) or there is
    // the product selection page.
    let productSelectionDisplayed = await Promise.any([
      page.waitForSelector("a[href='#/storage']").then((s) => {
        s!.dispose();
        return false;
      }),
      page.waitForSelector("button[form='productSelectionForm']").then((s) => {
        s!.dispose();
        return true;
      }),
    ]);

    if (productSelectionDisplayed) {
      await page.locator(`::-p-text('${product}')`).click();
      await page
        .locator("button[form='productSelectionForm']")
        // wait until the button is enabled
        .setWaitForEnabled(true)
        .click();
      // refreshing the repositories might take long time
      await page.locator("h3::-p-text('Overview')").setTimeout(60000).wait();
    } else {
      // no product selection displayed, mark the test as skipped
      skip();
    }
  });
}
