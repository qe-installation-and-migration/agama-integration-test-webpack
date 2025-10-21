import { it, page, sleep } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageResultPage } from "../pages/storage_result_page";
import { readCellbyRowSelection, getCellbyRowSelection } from "../lib/table";

export function readTable() {
  it("should read result table", async function () {
    const sidebar = new SidebarPage(page);
    const storageResult = new StorageResultPage(page);

    await sidebar.goToStorage();
    await storageResult.waitVisible();
    console.log(
      await readCellbyRowSelection(
        page,
        storageResult.resultTableSelector,
        "Mount Point",
        "/",
        "Size",
      ),
    );

    const cell = await getCellbyRowSelection(
      page,
      storageResult.resultTableSelector,
      "Device",
      "vda1",
      "Details"
    );
    // console.log(await cell.evaluate((node: Element) => node.textContent));
    // (await cell.waitForSelector("button")).click();
    cell.click();

    await sleep(2000);
  });
}
