import { ProductReleaseStrategy } from "../variants/product_release_strategy";
import { StableReleaseStrategy } from "../variants/stable_release_strategy";
import { RegistrationOptions } from "../checks/registration";

export interface IProductTestStrategy {
  setPermanentHostname(hostname: string): void;
  verifyRegistrationWarniningAlerts(): void;
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
  finishInstallation(): void;
  changeDiskToInstallTheSystem(): void;
  verifyPasswordStrength(): void;
  prepareZfcpStorage(): void;
  prepareDasdStorage(): void;
  selectPatterns(patterns: string[]): void;
  changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize(): void;
  selectMoreDevices(): void;
  setOnlyInstallationNetwork(): void;
  verifyDecryptDestructiveActions(destructiveActions: string[]): void;
  ensureLandingOnOverview(): void;
}

export class ProductStrategyFactory {
  public static create(productVersion: string, agamaVersion: string): IProductTestStrategy {
    if (productVersion === "16.1" && agamaVersion.includes("19")) {
      return new ProductReleaseStrategy();
    }
    return new StableReleaseStrategy();
  }
}
