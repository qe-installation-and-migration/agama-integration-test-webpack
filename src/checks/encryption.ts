import { it, page, getTextContent } from "../lib/helpers";
import { EncryptionSettingsPage } from "../pages/encryption_settings_page";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageSettingsPage } from "../pages/storage_settings_page";
import assert from "node:assert/strict";

export function enableEncryption(password: string) {
  it("should enable encryption", async function () {
    const storageSettings = new StorageSettingsPage(page);
    const encryptionSettings = new EncryptionSettingsPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storageSettings.editEncryption();
    await encryptionSettings.markEncryptTheSystem();
    await encryptionSettings.fillPassword(password);
    await encryptionSettings.fillPasswordConfirmation(password);
    await encryptionSettings.accept();
    await storageSettings.encryptionIsEnabledText().wait();
  });
}

export function verifyEncryptionEnabled() {
  it("should verify that encryption is enabled", async function () {
    const sidebar = new SidebarPage(page);
    const storageSettings = new StorageSettingsPage(page);

    await sidebar.goToStorage();
    await storageSettings.selectEncryption();
    const elementText = await getTextContent(storageSettings.encryptionIsEnabledText());
    assert.deepEqual(elementText, "Encryption is enabled");
  });
}

export function disableEncryption() {
  it("should disable encryption", async function () {
    const storageSettings = new StorageSettingsPage(page);
    const encryptionSettings = new EncryptionSettingsPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storageSettings.editEncryption();
    await encryptionSettings.unmarkEncryptTheSystem();
    await encryptionSettings.accept();

    const elementText = await getTextContent(storageSettings.encryptionIsDisabledText());
    assert.deepEqual(elementText, "Encryption is disabled");
  });
}
