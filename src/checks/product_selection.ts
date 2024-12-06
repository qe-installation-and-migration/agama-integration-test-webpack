import { it, page } from "../lib/helpers";
import { ConfiguringProductPage } from "../pages/configuring_product_page";
import { ProductSelectionPage } from "../pages/product_selection_page";

export function productSelection(productId: string) {
    const productIdMap = {
        "Leap_16.0": "Leap 16.0 Alpha",
        "MicroOS": "openSUSE MicroOS",
        "SLES_16.0": "SUSE Linux Enterprise Server 16.0 Alpha",
        "SLES_SAP_16.0": "SUSE Linux Enterprise Server for SAP Applications 16.0 Alpha",
        "Slowroll": "Slowroll",
        "Tumbleweed": "openSUSE Tumbleweed"
    };

    it("should allow to select a product", async function () {
        await new ProductSelectionPage(page).selectProduct(productIdMap[productId]);
    });

    it("should start configuring the product", async function () {
        await new ConfiguringProductPage(page).wait();
    });
}
