import { it, page, waitOnFile } from "../lib/helpers";
import fs from "fs";
import path from "path";
import assert from "node:assert/strict";
import { ToolbarPage } from "../pages/toolbar_page";

export async function downloadLogs() {
  it("should download logs", async function () {
    const downloadFolder = "/root/Downloads";

    const optionsPage = new ToolbarPage(page);
    await optionsPage.downloadLogs();
    await optionsPage.successAlertHeading().wait();

    const downloadedFiles = fs.readdirSync(downloadFolder);
    assert(downloadedFiles.length > 0, "No files found in the download directory.");

    const exactFilePath = path.join(downloadFolder, downloadedFiles[0]);
    const fileSize = fs.statSync(exactFilePath).size;
    assert(fileSize > 0, "Agama Logfile is empty.");
  });
}

export async function downloadLogsWithSidebar() {
  it("should download logs", async function () {
    const filePathWithSidebar = "/root/Downloads/agama-logs.tar.gz";

    await new ToolbarPage(page).downloadLogs();
    await waitOnFile(filePathWithSidebar);

    const fileSize = fs.statSync(filePathWithSidebar).size;
    assert(fileSize > 0, "Agama Logfile is empty.");
  });
}
