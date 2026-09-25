import { it, page, sleep } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";
import { OptionsTogglePage } from "../pages/options_toggle_page";
import { InstallationJsonPage } from "../pages/installation_settings_in_json_format_page";
import fs from "fs";
import path from "path";
import assert from "node:assert/strict";

export function showConfiguration() {
  it("should show json configuration", async function () {
    const overview = new OverviewPage(page);
    const agamaConfiguration = new OptionsTogglePage(page);
    const installationPage = new InstallationJsonPage(page);

    await overview.ensureSystemInformationPresent(70000);
    await agamaConfiguration.showConfiguration();
    const content = await installationPage.displayedConfiguration();
    assert(content.trim().length > 0, "The displayed configuration is empty.");
  });
}

export function downloadJsonConfiguration() {
  it("should download json file", async function () {
    const downloadFolder = "/root/Downloads";

    const installationPage = new InstallationJsonPage(page);
    await installationPage.downloadJsonFile();

    await sleep(2000);
    const fileJsonName = fs
      .readdirSync(downloadFolder)
      .find((file) => file.startsWith("agama-config") && file.endsWith(".json"));
    console.log("File found in download directory:", fileJsonName);
    assert(fileJsonName.length > 0, "No json file found in the download directory.");

    const exactFilePath = path.join(downloadFolder, fileJsonName);
    const fileSize = fs.statSync(exactFilePath).size;
    console.log(`Downloaded file: ${exactFilePath} (Size: ${fileSize} bytes)`);
    assert(fileSize > 0, "Agama json file is empty.");
    await installationPage.closeJsonFile();
  });
}
