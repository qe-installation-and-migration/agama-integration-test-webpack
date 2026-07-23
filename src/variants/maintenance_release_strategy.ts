import { IProductTestStrategy } from "../lib/product_strategy_factory";
import { setPermanentHostnameWithSidebar } from "../checks/system";
import {
  verifyRegistrationWarniningAlertsWithSidebar,
  RegistrationOptions,
  enterProductRegistrationWithSidebar,
  enterExtensionRegistrationHAWithSidebar,
  enterExtensionRegistrationPHubWithSidebar,
} from "../checks/registration";
import {
  disableEncryptionWithSidebar,
  enableEncryptionWithSidebar,
  verifyEncryptionEnabledWithSidebar,
} from "../checks/encryption";
import {
  createFirstUserWithSidebar,
  editRootUserWithSidebar,
  verifyPasswordStrengthWithSidebar,
} from "../checks/authentication";
import {
  checkInstallationWithSidebar,
  finishInstallationCongratulation,
  performInstallationWithSidebar,
} from "../checks/installation";
import { logInWithIncorrectPasswordWithSidebar } from "../checks/login";
import { changeDeviceToInstallTheSystemWithSidebar } from "../checks/storage_change_device_to_install";
import { prepareZfcpStorageWithSidebar } from "../checks/storage_zfcp";
import { selectPatternsWithSidebar } from "../checks/software";
import { changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSizeWithSidebar } from "../checks/storage_change_root_partition";
import { ensureLandingOnOverviewWithSidebar } from "../checks/overview";
import { selectMoreDevicesWithSidebar } from "../checks/storage_select_installation_device";
import { setOnlyInstallationNetworkWithSidebar } from "../checks/network";
import { verifyDecryptDestructiveActionsWithSidebar } from "../checks/storage_result_destructive_actions_planned";
import { verifyStorageOutOfSyncWithSidebar } from "../checks/storage_out_of_sync";
import { downloadLogsWithSidebar } from "../checks/download_logs";

export class MaintenanceReleaseStrategy implements IProductTestStrategy {
  setStaticHostname(hostname: string) {
    setPermanentHostnameWithSidebar(hostname);
  }

  verifyRegistrationWarniningAlerts(use_custom?: string, url?: string) {
    verifyRegistrationWarniningAlertsWithSidebar(use_custom, url);
  }

  enterProductRegistration({ use_custom, code, provide_code, url }: RegistrationOptions): void {
    enterProductRegistrationWithSidebar({ use_custom, code, provide_code, url });
  }

  enableEncryption(password: string) {
    enableEncryptionWithSidebar(password);
  }

  verifyEncryptionEnabled() {
    verifyEncryptionEnabledWithSidebar();
  }

  disableEncryption() {
    disableEncryptionWithSidebar();
  }

  enterExtensionRegistrationHA(code: string) {
    enterExtensionRegistrationHAWithSidebar(code);
  }

  enterExtensionRegistrationPHub() {
    enterExtensionRegistrationPHubWithSidebar();
  }

  createFirstUser(password: string) {
    createFirstUserWithSidebar(password);
  }

  editRootUser(password: string) {
    editRootUserWithSidebar(password);
  }

  checkInstallation() {
    checkInstallationWithSidebar();
  }

  performInstallation() {
    performInstallationWithSidebar();
  }

  logInWithIncorrectPassword() {
    logInWithIncorrectPasswordWithSidebar();
  }

  finishInstallation() {
    finishInstallationCongratulation();
  }

  changeDeviceToInstallTheSystem() {
    changeDeviceToInstallTheSystemWithSidebar();
  }

  verifyPasswordStrength() {
    verifyPasswordStrengthWithSidebar();
  }

  prepareZfcpStorage() {
    prepareZfcpStorageWithSidebar();
  }

  prepareDasdStorage() {}

  changePatterns(patterns: string[]) {
    selectPatternsWithSidebar(patterns);
  }

  changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize() {
    changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSizeWithSidebar();
  }

  selectMoreDevices() {
    selectMoreDevicesWithSidebar();
  }

  setOnlyInstallationNetwork() {
    setOnlyInstallationNetworkWithSidebar();
  }

  verifyDecryptDestructiveActions(destructiveActions: string[]) {
    verifyDecryptDestructiveActionsWithSidebar(destructiveActions);
  }

  verifyStorageOutOfSync() {
    verifyStorageOutOfSyncWithSidebar();
  }

  ensureLandingOnOverview() {
    ensureLandingOnOverviewWithSidebar();
  }

  downloadLogs() {
    downloadLogsWithSidebar();
  }
}
