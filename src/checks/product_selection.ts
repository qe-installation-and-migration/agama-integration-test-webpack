import { it, page } from "../lib/helpers";
import { ProductSelectionPage } from "../pages/product-selection-page";

export function productSelection(product: string) {
    it("should display the product selection dialog", async function () {
        const productselection = new ProductSelectionPage(page);
        let timeout = 2 * 60 * 1000;

        await productselection.selectProduct(product);

        // Check if configuration procedure is progressing
        await page.locator("::-p-text(Configuring the product)").wait();
        // refreshing the repositories might take long time
        await page.locator("h3::-p-text('Overview')").setTimeout(timeout).wait();
    });
}
