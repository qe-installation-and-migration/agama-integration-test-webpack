import { it, page } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";
import { OptionsTogglePage } from "../pages/options_toggle_page";
import { InstallationJsonPage } from "../pages/installation_json_page";
import fs from "fs";
import path from "path";
import assert from "node:assert/strict";

export function showAgamaConfiguration() {
  it("should show json configuration", async function () {
    const overview = new OverviewPage(page);
    const agamaConfiguration = new OptionsTogglePage(page);
    const installationPage = new InstallationJsonPage(page);

    await overview.ensureSystemInformationPresent(70000);
    await agamaConfiguration.showConfiguration();
    const content = await installationPage.readJsonContent();
    assert(content.trim().length > 0, "The displayed configuration is empty.");
  });
}

export async function downloadJsonConfiguration() {
  it("should download json file", async function () {
    const downloadFolder = "/root/Downloads";

    const installationPage = new InstallationJsonPage(page);
    await installationPage.downloadJsonFile();

    const downloadedFiles = fs.readdirSync(downloadFolder);
    assert(downloadedFiles.length > 0, "No files found in the download directory.");

    const exactFilePath = path.join(downloadFolder, downloadedFiles[0]);
    const fileSize = fs.statSync(exactFilePath).size;
    assert(fileSize > 0, "Agama json file is empty.");
    installationPage.closeJsonFile();
  });
}
