import { it, page, getTextContent } from "../lib/helpers";
import util from "util";
import assert from "node:assert/strict";
import { exec } from "child_process";

import { StorageWarningOutOfSyncPage } from "../pages/storage_warning_out_of_sync_page";

export function verifyStorageOutOfSync() {
  it("should verify no storage out of sync popup", async function () {
    const execPromise = util.promisify(exec);
    await execPromise("agama probe");
  });
}

export function verifyStorageOutOfSyncWithSidebar() {
  it("should verify storage out of sync popup", async function () {
    const storageWarningOutOfSyncPage = new StorageWarningOutOfSyncPage(page);
    const execPromise = util.promisify(exec);

    await execPromise("agama probe");

    assert.deepEqual(
      await getTextContent(storageWarningOutOfSyncPage.configurationOutOfSyncWarningAlert()),
      "Configuration out of sync",
    );

    await storageWarningOutOfSyncPage.reload();
  });
}
