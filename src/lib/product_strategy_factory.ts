import { DevelopmentReleaseStrategy } from "../variants/development_release_strategy";
import { ProductionReleaseStrategy } from "../variants/production_release_strategy";
import { MaintenanceReleaseStrategy } from "../variants/maintenance_release_strategy";
import { RegistrationOptions } from "../checks/registration";

export interface IProductTestStrategy {
  setStaticHostname(hostname: string): void;
  configureTimeSynchronizationServers?(ntpServerAddresses: string[]): void;
  verifyRegistrationWarniningAlerts(use_custom?: string, url?: string): void;
  enterProductRegistration({ use_custom, code, provide_code, url }: RegistrationOptions): void;
  enableEncryption(password: string): void;
  verifyEncryptionEnabled(): void;
  disableEncryption(): void;
  enterExtensionRegistrationHA(code: string): void;
  enterExtensionRegistrationPHub(): void;
  createFirstUser(password: string): void;
  editRootUser(password: string): void;
  performInstallation(): void;
  logInWithIncorrectPassword(): void;
  checkInstallation(): void;
  finishInstallation(): void;
  changeDeviceToInstallTheSystem(): void;
  verifyPasswordStrength(): void;
  prepareZfcpStorage(): void;
  prepareDasdStorage(): void;
  changePatterns(patterns: string[]): void;
  selectDesktop?(desktop: string): void;
  changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize(): void;
  selectMoreDevices(): void;
  setOnlyInstallationNetwork(): void;
  verifyDecryptDestructiveActions(destructiveActions: string[]): void;
  verifyStorageOutOfSync?(): void;
  ensureLandingOnOverview(): void;
  downloadLogs(): void;
  verifyAppearanceChanges?(): void;
}

export class ProductStrategyFactory {
  public static create(productVersion: string, agamaWebUiPackageVersion: string): IProductTestStrategy {
    if (productVersion === "16.0") {
      return new MaintenanceReleaseStrategy();
    }

    if (productVersion === "16.1") {
      const [versionPart, commitPart] = agamaWebUiPackageVersion.split("+");
      const [webUiVersion, webUiCommit] = [Number(versionPart), Number(commitPart?.split(".")[0])];

      // tracks preparation changes not yet in production since the version/commit
      // where we can find a relevant UI update.
      const isPreProduction = webUiVersion === 22 || (webUiVersion === 21 && webUiCommit >= 155);

      return isPreProduction
        ? new DevelopmentReleaseStrategy()
        : new ProductionReleaseStrategy();
    }

    throw new Error(`Unsupported product version: ${productVersion}`);
  }
}
