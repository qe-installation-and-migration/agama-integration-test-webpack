import { it, page, waitOnNewFile } from "../lib/helpers";
import { ToolbarPage } from "../pages/toolbar_page";
import { InstallationSettingsInJsonFormatPage } from "../pages/installation_settings_in_json_format_page";
import fs from "fs";
import os from "os";
import path from "path";
import assert from "node:assert/strict";

export function showConfiguration() {
  it("should show JSON configuration", async function () {
    const agamaConfiguration = new ToolbarPage(page);
    const installationSettingsInJsonFormat = new InstallationSettingsInJsonFormatPage(page);

    await agamaConfiguration.openMoreOptions();
    await agamaConfiguration.clickShowConfiguration();

    const content = await installationSettingsInJsonFormat.displayedConfiguration();
    assert(content.trim().length > 0, "The displayed configuration is empty.");
  });
}

export function downloadConfiguration() {
  it("should download the installation configuration", async function () {
    const installation = new InstallationSettingsInJsonFormatPage(page);
    await installation.downloadConfiguration();

    const downloadedFile = await waitOnNewFile(
      () => installation.downloadConfiguration(),
      path.join(os.homedir(), "Downloads"),
      "agama-config-",
    );
    console.log("File found in download directory:", downloadedFile);
    assert(downloadedFile.length > 0, "No json file has been found in the download directory.");

    const downloadedConfiguration = fs.readFileSync(downloadedFile, "utf8");
    assert(
      downloadedConfiguration.includes('"product"'),
      `Downloaded configuration has no product section: ${downloadedConfiguration}`,
    );

    await installation.close();
  });
}
