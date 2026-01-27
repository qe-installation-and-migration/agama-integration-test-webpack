import { IProductTestStrategy } from "../lib/product_strategy_factory";
import { setPermanentHostname } from "../checks/hostname";
import {
  verifyRegistrationWarniningAlerts,
  RegistrationOptions,
  enterProductRegistration,
  enterExtensionRegistrationHA,
} from "../checks/registration";
import { disableEncryption, enableEncryption, verifyEncryptionEnabled } from "../checks/encryption";
import { createFirstUser } from "../checks/first_user";
import { editRootUser, verifyPasswordStrength } from "../checks/root_authentication";
import { overviewLanding } from "../checks/product_selection";
import { finishInstallation, performInstallation } from "../checks/installation";
import { logInWithIncorrectPassword } from "../checks/login";
import { changeDiskToInstallTheSystem } from "../checks/storage_change_disk_to_install";
import { prepareDasdStorage } from "../checks/storage_dasd";
import { selectPatterns } from "../checks/software_selection";
import { verifyDecryptDestructiveActions } from "../checks/storage_result_destructive_actions_planned";

export class ProductReleaseStrategy implements IProductTestStrategy {
  setPermanentHostname(hostname: string) {
    setPermanentHostname(hostname);
  }

  verifyRegistrationWarniningAlerts(use_custom?: string, url?: string) {
    verifyRegistrationWarniningAlerts(use_custom, url);
  }

  enterProductRegistration({ use_custom, code, provide_code, url }: RegistrationOptions): void {
    enterProductRegistration({ use_custom, code, provide_code, url });
  }

  enableEncryption(password: string) {
    enableEncryption(password);
  }

  verifyEncryptionEnabled() {
    verifyEncryptionEnabled();
  }

  disableEncryption() {
    disableEncryption();
  }

  enterExtensionRegistrationHA(code: string) {
    enterExtensionRegistrationHA(code);
  }

  overviewLanding() {
    overviewLanding();
  }

  createFirstUser(password: string) {
    createFirstUser(password);
  }

  editRootUser(password: string) {
    editRootUser(password);
  }

  performInstallation() {
    performInstallation();
  }

  logInWithIncorrectPassword() {
    logInWithIncorrectPassword();
  }

  finishInstallation() {
    finishInstallation();
  }

  changeDiskToInstallTheSystem() {
    changeDiskToInstallTheSystem();
  }

  verifyPasswordStrength() {
    verifyPasswordStrength();
  }

  prepareZfcpStorage() {
    prepareDasdStorage();
  }

  selectPatterns(patterns: string[]) {
    selectPatterns(patterns);
  }

  verifyDecryptDestructiveActions(destructiveActions: string[]) {
    verifyDecryptDestructiveActions(destructiveActions);
  }
}
