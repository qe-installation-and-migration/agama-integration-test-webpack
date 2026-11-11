import { it, page, getTextContent } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";
import { EncryptionSettingsPage } from "../pages/encryption_settings_page";
import { StorageSettingsPage } from "../pages/storage_settings_page";
import assert from "node:assert/strict";
import { HeaderPage } from "../pages/header_page";

export function enableEncryption(password: string) {
  it("should enable encryption", async function () {
    const storageSettings = new StorageSettingsPage(page);
    const encryptionSettings = new EncryptionSettingsPage(page);
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);

    await overview.goToStorage();
    await storageSettings.selectEncryption();
    await storageSettings.changeEncryption();
    await encryptionSettings.markEncryptTheSystem();
    await encryptionSettings.fillPassword(password);
    await encryptionSettings.fillPasswordConfirmation(password);
    await encryptionSettings.accept();
    await storageSettings.encryptionIsEnabledText().wait();
    await header.goToInstallation();
  });
}

export function verifyEncryptionEnabled() {
  it("should verify that encryption is enabled", async function () {
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);
    const storageSettings = new StorageSettingsPage(page);

    await overview.goToStorage();
    await storageSettings.selectEncryption();
    const elementText = await getTextContent(storageSettings.encryptionIsEnabledText());
    assert.deepEqual(elementText, "Encryption is enabled");
    await header.goToInstallation();
  });
}

export function disableEncryption() {
  it("should disable encryption", async function () {
    const storageSettings = new StorageSettingsPage(page);
    const encryptionSettings = new EncryptionSettingsPage(page);
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);

    await overview.goToStorage();
    await storageSettings.selectEncryption();
    await storageSettings.changeEncryption();
    await encryptionSettings.unmarkEncryptTheSystem();
    await encryptionSettings.accept();

    const elementText = await getTextContent(storageSettings.encryptionIsDisabledText());
    assert.deepEqual(elementText, "Encryption is disabled");
    await header.goToInstallation();
  });
}
