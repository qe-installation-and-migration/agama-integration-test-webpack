import { it, page, waitOnFile } from "../lib/helpers";
import fs from "fs";
import assert from "node:assert/strict";
import { ToolbarPage } from "../pages/toolbar_page";

export async function downloadLogs() {
  it("should download logs", async function () {
    const filePathWithSidebar = "/root/Downloads/agama-logs.tar.gz";

    await new ToolbarPage(page).downloadLogs();
    await waitOnFile(filePathWithSidebar);

    const fileSize = fs.statSync(filePathWithSidebar).size;
    assert(fileSize > 0, "Agama Logfile is empty.");
  });
}
