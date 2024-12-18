import { skip } from "node:test";
import { it, page } from "../lib/helpers";

export function optionalProductSelection(productName: string) {
  it("should optionally display the product selection dialog", async function () {
    // Either the root password setting is displayed or there is
    // the product selection page.
    const productSelectionDisplayed = await Promise.any([
      page.waitForSelector("input#rootPassword").then((s) => {
        s!.dispose();
        return false;
      }),
      page.waitForSelector("button[form='productSelectionForm']").then((s) => {
        s!.dispose();
        return true;
      }),
    ]);

    if (productSelectionDisplayed) {
      const product = await page.locator(`::-p-text('${productName}')`).waitHandle();
      // scroll the page so the product is visible
      await product.scrollIntoView();
      await product.click();

      await page
        .locator("button[form='productSelectionForm']")
        // wait until the button is enabled
        .setWaitForEnabled(true)
        .click();
    } else {
      // no product selection displayed, mark the test as skipped
      skip();
    }
  });
}
