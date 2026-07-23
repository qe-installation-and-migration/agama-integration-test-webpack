#! /usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/checks/authentication.ts"
/*!**************************************!*\
  !*** ./src/checks/authentication.ts ***!
  \**************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createAdministratorAccount = createAdministratorAccount;
exports.createFirstUserWithSidebar = createFirstUserWithSidebar;
exports.editRootUserLoginMethod = editRootUserLoginMethod;
exports.editRootUserWithSidebar = editRootUserWithSidebar;
exports.verifyPasswordStrength = verifyPasswordStrength;
exports.verifyPasswordStrengthWithSidebar = verifyPasswordStrengthWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const header_page_1 = __webpack_require__(/*! ../pages/header_page */ "./src/pages/header_page.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const users_page_1 = __webpack_require__(/*! ../pages/users_page */ "./src/pages/users_page.ts");
const create_user_page_1 = __webpack_require__(/*! ../pages/create_user_page */ "./src/pages/create_user_page.ts");
const root_authentication_methods_1 = __webpack_require__(/*! ../pages/root_authentication_methods */ "./src/pages/root_authentication_methods.ts");
const authentication_page_1 = __webpack_require__(/*! ../pages/authentication_page */ "./src/pages/authentication_page.ts");
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
function createAdministratorAccount(password) {
    (0, helpers_1.it)("should define an administrator user", async function () {
        const defineAdministratorUser = new authentication_page_1.AuthenticationWithRootLoginPassword(helpers_1.page);
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        await overview.goToAuthentication();
        await defineAdministratorUser.defineAnAdministratorUser();
        await defineAdministratorUser.fillFullName("Bernhard M. Wiedemann");
        await defineAdministratorUser.fillUserName("bernhard");
        await defineAdministratorUser.fillPassword(password);
        await defineAdministratorUser.fillPasswordConfirmation(password);
        await (0, helpers_1.waitUntilOverlaySettled)(() => defineAdministratorUser.accept());
        await header.goToInstallation();
    });
}
function createFirstUserWithSidebar(password) {
    (0, helpers_1.it)("should create first user", async function () {
        const users = new users_page_1.UsersPage(helpers_1.page);
        const createFirstUser = new create_user_page_1.CreateFirstUserPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToUsers();
        await users.defineAUserNow();
        await createFirstUser.fillFullName("Bernhard M. Wiedemann");
        await createFirstUser.fillUserName("bernhard");
        await createFirstUser.fillPassword(password);
        await createFirstUser.fillPasswordConfirmation(password);
        await createFirstUser.accept();
        // puppeteer goes too fast and screen is unresponsive after submit, a small delay helps
        await (0, helpers_1.sleep)(2000);
    });
}
function editRootUserLoginMethod(password) {
    (0, helpers_1.it)("should enable the root account", async function () {
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const setARootPassword = new authentication_page_1.AuthenticationWithRootLoginPassword(helpers_1.page);
        await overview.goToAuthentication();
        await setARootPassword.selectRootLoginMethod();
        await setARootPassword.selectPasswordAsRootLoginMethod();
        await setARootPassword.fillRootPassword(password);
        await setARootPassword.fillRootPasswordConfirmation(password);
        await (0, helpers_1.waitUntilOverlaySettled)(() => setARootPassword.accept());
        await header.goToInstallation();
    });
}
function editRootUserWithSidebar(password) {
    (0, helpers_1.it)("should edit the root user", async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const users = new users_page_1.UsersPage(helpers_1.page);
        const setARootPassword = new root_authentication_methods_1.SetARootPasswordPage(helpers_1.page);
        await sidebar.goToUsers();
        await users.editRootUser();
        await setARootPassword.usePassword();
        await setARootPassword.fillPassword(password);
        await setARootPassword.fillPasswordConfirmation(password);
        await setARootPassword.accept();
        // puppeteer goes too fast and screen is unresponsive after submit, a small delay helps
        await (0, helpers_1.sleep)(2000);
    });
}
function verifyPasswordStrength() {
    (0, helpers_1.it)("should verify the strength of typed password", async function () {
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const setARootPassword = new authentication_page_1.AuthenticationWithRootLoginPassword(helpers_1.page);
        await overview.goToAuthentication();
        await setARootPassword.selectRootLoginMethod();
        await setARootPassword.selectPasswordAsRootLoginMethod();
        await setARootPassword.fillRootPassword("a23b56c");
        const elementTextPasswordLess8Characters = await (0, helpers_1.getTextContent)(setARootPassword.alertPasswordLess8Characters());
        strict_1.default.deepEqual(elementTextPasswordLess8Characters, "The password is shorter than 8 characters");
        await setARootPassword.fillPassword("a23b56ca");
        const elementTextPasswordIsWeak = await (0, helpers_1.getTextContent)(setARootPassword.alertPasswordIsWeak());
        strict_1.default.deepEqual(elementTextPasswordIsWeak, "The password is weak");
        await setARootPassword.fillPassword("a23b5678");
        const elementTextPasswordFailDictionary = await (0, helpers_1.getTextContent)(setARootPassword.alertPasswordFailDictionaryCheck());
        strict_1.default.deepEqual(elementTextPasswordFailDictionary, "The password fails the dictionary check - it is too simplistic/systematic");
        await header.goToInstallation();
    });
}
function verifyPasswordStrengthWithSidebar() {
    (0, helpers_1.it)("should verify the strength of typed password", async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const users = new users_page_1.UsersPage(helpers_1.page);
        const setARootPassword = new root_authentication_methods_1.SetARootPasswordPage(helpers_1.page);
        await sidebar.goToUsers();
        await users.editRootUser();
        await setARootPassword.fillPassword("a23b56c");
        const elementTextPasswordLess8Characters = await (0, helpers_1.getTextContent)(setARootPassword.alertPasswordLess8Characters());
        strict_1.default.deepEqual(elementTextPasswordLess8Characters, "Warning alert:The password is shorter than 8 characters");
        await setARootPassword.fillPassword("a23b56ca");
        const elementTextPasswordIsWeak = await (0, helpers_1.getTextContent)(setARootPassword.alertPasswordIsWeak());
        strict_1.default.deepEqual(elementTextPasswordIsWeak, "Warning alert:The password is weak");
        await setARootPassword.fillPassword("a23b5678");
        const elementTextPasswordFailDictionary = await (0, helpers_1.getTextContent)(setARootPassword.alertPasswordFailDictionaryCheck(), 50000);
        strict_1.default.deepEqual(elementTextPasswordFailDictionary, "Warning alert:The password fails the dictionary check - it is too simplistic/systematic");
    });
}


/***/ },

/***/ "./src/checks/download_logs.ts"
/*!*************************************!*\
  !*** ./src/checks/download_logs.ts ***!
  \*************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.downloadLogs = downloadLogs;
exports.downloadLogsWithSidebar = downloadLogsWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
const options_toggle_page_1 = __webpack_require__(/*! ../pages/options_toggle_page */ "./src/pages/options_toggle_page.ts");
async function downloadLogs() {
    (0, helpers_1.it)("should download logs", async function () {
        const downloadFolder = "/root/Downloads";
        const optionsPage = new options_toggle_page_1.OptionsTogglePage(helpers_1.page);
        await optionsPage.downloadLogs();
        await optionsPage.successAlertHeading().wait();
        const downloadedFiles = fs_1.default.readdirSync(downloadFolder);
        (0, strict_1.default)(downloadedFiles.length > 0, "No files found in the download directory.");
        const exactFilePath = path_1.default.join(downloadFolder, downloadedFiles[0]);
        const fileSize = fs_1.default.statSync(exactFilePath).size;
        (0, strict_1.default)(fileSize > 0, "Agama Logfile is empty.");
    });
}
async function downloadLogsWithSidebar() {
    (0, helpers_1.it)("should download logs", async function () {
        const filePathWithSidebar = "/root/Downloads/agama-logs.tar.gz";
        await new options_toggle_page_1.OptionsTogglePage(helpers_1.page).downloadLogs();
        await (0, helpers_1.waitOnFile)(filePathWithSidebar);
        const fileSize = fs_1.default.statSync(filePathWithSidebar).size;
        (0, strict_1.default)(fileSize > 0, "Agama Logfile is empty.");
    });
}


/***/ },

/***/ "./src/checks/encryption.ts"
/*!**********************************!*\
  !*** ./src/checks/encryption.ts ***!
  \**********************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.enableEncryption = enableEncryption;
exports.enableEncryptionWithSidebar = enableEncryptionWithSidebar;
exports.verifyEncryptionEnabled = verifyEncryptionEnabled;
exports.verifyEncryptionEnabledWithSidebar = verifyEncryptionEnabledWithSidebar;
exports.disableEncryption = disableEncryption;
exports.disableEncryptionWithSidebar = disableEncryptionWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const encryption_settings_page_1 = __webpack_require__(/*! ../pages/encryption_settings_page */ "./src/pages/encryption_settings_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const storage_settings_page_1 = __webpack_require__(/*! ../pages/storage_settings_page */ "./src/pages/storage_settings_page.ts");
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
const header_page_1 = __webpack_require__(/*! ../pages/header_page */ "./src/pages/header_page.ts");
function enableEncryption(password) {
    (0, helpers_1.it)("should enable encryption", async function () {
        const storageSettings = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        const encryptionSettings = new encryption_settings_page_1.EncryptionSettingsPage(helpers_1.page);
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
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
function enableEncryptionWithSidebar(password) {
    (0, helpers_1.it)("should enable encryption", async function () {
        const storageSettings = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        const encryptionSettings = new encryption_settings_page_1.EncryptionSettingsPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToStorage();
        await storageSettings.editEncryption();
        await encryptionSettings.markEncryptTheSystem();
        await encryptionSettings.fillPassword(password);
        await encryptionSettings.fillPasswordConfirmation(password);
        await encryptionSettings.accept();
        await storageSettings.encryptionIsEnabledText().wait();
    });
}
function verifyEncryptionEnabled() {
    (0, helpers_1.it)("should verify that encryption is enabled", async function () {
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const storageSettings = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        await overview.goToStorage();
        await storageSettings.selectEncryption();
        const elementText = await (0, helpers_1.getTextContent)(storageSettings.encryptionIsEnabledText());
        strict_1.default.deepEqual(elementText, "Encryption is enabled");
        await header.goToInstallation();
    });
}
function verifyEncryptionEnabledWithSidebar() {
    (0, helpers_1.it)("should verify that encryption is enabled", async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const storageSettings = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        await sidebar.goToStorage();
        await storageSettings.selectEncryption();
        const elementText = await (0, helpers_1.getTextContent)(storageSettings.encryptionIsEnabledText());
        strict_1.default.deepEqual(elementText, "Encryption is enabled");
    });
}
function disableEncryption() {
    (0, helpers_1.it)("should disable encryption", async function () {
        const storageSettings = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        const encryptionSettings = new encryption_settings_page_1.EncryptionSettingsPage(helpers_1.page);
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        await overview.goToStorage();
        await storageSettings.selectEncryption();
        await storageSettings.changeEncryption();
        await encryptionSettings.unmarkEncryptTheSystem();
        await encryptionSettings.accept();
        const elementText = await (0, helpers_1.getTextContent)(storageSettings.encryptionIsDisabledText());
        strict_1.default.deepEqual(elementText, "Encryption is disabled");
        await header.goToInstallation();
    });
}
function disableEncryptionWithSidebar() {
    (0, helpers_1.it)("should disable encryption", async function () {
        const storageSettings = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        const encryptionSettings = new encryption_settings_page_1.EncryptionSettingsPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToStorage();
        await storageSettings.editEncryption();
        await encryptionSettings.unmarkEncryptTheSystem();
        await encryptionSettings.accept();
        const elementText = await (0, helpers_1.getTextContent)(storageSettings.encryptionIsDisabledText());
        strict_1.default.deepEqual(elementText, "Encryption is disabled");
    });
}


/***/ },

/***/ "./src/checks/installation.ts"
/*!************************************!*\
  !*** ./src/checks/installation.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.performInstallation = performInstallation;
exports.performInstallationWithSidebar = performInstallationWithSidebar;
exports.checkInstallation = checkInstallation;
exports.checkInstallationWithSidebar = checkInstallationWithSidebar;
exports.finishInstallation = finishInstallation;
exports.finishInstallationCongratulation = finishInstallationCongratulation;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const confirm_installation_page_1 = __webpack_require__(/*! ../pages/confirm_installation_page */ "./src/pages/confirm_installation_page.ts");
const congratulation_page_1 = __webpack_require__(/*! ../pages/congratulation_page */ "./src/pages/congratulation_page.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const overview_with_sidebar_page_1 = __webpack_require__(/*! ../pages/overview_with_sidebar_page */ "./src/pages/overview_with_sidebar_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const installation_page_1 = __webpack_require__(/*! ../pages/installation_page */ "./src/pages/installation_page.ts");
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
const confirm_installation_with_sidebar_page_1 = __webpack_require__(/*! ../pages/confirm_installation_with_sidebar_page */ "./src/pages/confirm_installation_with_sidebar_page.ts");
const installation_complete_page_1 = __webpack_require__(/*! ../pages/installation_complete_page */ "./src/pages/installation_complete_page.ts");
const installation_in_progress_page_1 = __webpack_require__(/*! ../pages/installation_in_progress_page */ "./src/pages/installation_in_progress_page.ts");
function performInstallation() {
    (0, helpers_1.it)("should start installation", async function () {
        const confirmInstallation = new confirm_installation_page_1.ConfirmInstallationPage(helpers_1.page);
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        await overview.install();
        await confirmInstallation.confirmAndInstall();
    });
}
function performInstallationWithSidebar() {
    (0, helpers_1.it)("should start installation", async function () {
        const confirmInstallation = new confirm_installation_with_sidebar_page_1.ConfirmInstallationWithSidebarPage(helpers_1.page);
        const overview = new overview_with_sidebar_page_1.OverviewWithSidebarPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToOverview();
        await overview.install();
        await confirmInstallation.continue();
    });
}
function checkInstallation() {
    (0, helpers_1.it)("should check installation progress", async function () {
        const installationInProgress = new installation_in_progress_page_1.InstallationInProgressPage(helpers_1.page);
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(installationInProgress.installationInProgressText()), "Installation in progress");
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(installationInProgress.prepareTheSystemText()), "Prepare the system");
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(installationInProgress.installSoftwareText()), "Install software");
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(installationInProgress.configureTheSystemText()), "Configure the system");
    });
}
function checkInstallationWithSidebar() {
    (0, helpers_1.it)("should check installation progress", async function () {
        const installation = new installation_page_1.InstallationPage(helpers_1.page);
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(installation.prepareDisksText()), "Prepare disks");
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(installation.installingSystemText()), "Installing the system, please wait...");
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(installation.installSoftwareText()), "Install software");
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(installation.configureTheSystemText()), "Configure the system");
    });
}
function finishInstallation() {
    (0, helpers_1.it)("should finish installation", async function () {
        const installationComplete = new installation_complete_page_1.InstallationCompletePage(helpers_1.page);
        await installationComplete.wait(20 * 60 * 1000);
    }, 21 * 60 * 1000);
}
function finishInstallationCongratulation() {
    (0, helpers_1.it)("should finish installation", async function () {
        const congratulation = new congratulation_page_1.CongratulationPage(helpers_1.page);
        await congratulation.wait(20 * 60 * 1000);
    }, 21 * 60 * 1000);
}


/***/ },

/***/ "./src/checks/login.ts"
/*!*****************************!*\
  !*** ./src/checks/login.ts ***!
  \*****************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logIn = logIn;
exports.logInWithIncorrectPassword = logInWithIncorrectPassword;
exports.logInWithIncorrectPasswordWithSidebar = logInWithIncorrectPasswordWithSidebar;
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const login_as_root_page_1 = __webpack_require__(/*! ../pages/login_as_root_page */ "./src/pages/login_as_root_page.ts");
function verifyAgamaTitle() {
    (0, helpers_1.it)("should have Agama page title", async function () {
        strict_1.default.deepEqual(await helpers_1.page.title(), "Agama");
    });
}
function logIn(password) {
    verifyAgamaTitle();
    (0, helpers_1.it)("should allow logging in", async function () {
        const loginAsRoot = new login_as_root_page_1.LoginAsRootPage(helpers_1.page);
        await loginAsRoot.fillPassword(password);
        await loginAsRoot.logIn();
    });
}
function logInWithIncorrectPassword() {
    verifyAgamaTitle();
    (0, helpers_1.it)("should show warning alert for logging with wrong password", async function () {
        const loginAsRoot = new login_as_root_page_1.LoginAsRootPage(helpers_1.page);
        const invalidpassword = "invalid password";
        await loginAsRoot.fillPassword(invalidpassword);
        await loginAsRoot.logIn();
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(loginAsRoot.couldNotLoginText()), "Danger alert:Could not log in");
        await loginAsRoot.togglePasswordVisibility();
        strict_1.default.deepEqual(await (0, helpers_1.getValue)(loginAsRoot.passwordInput()), invalidpassword);
    });
}
function logInWithIncorrectPasswordWithSidebar() {
    verifyAgamaTitle();
    (0, helpers_1.it)("should show warning alert for logging with wrong password", async function () {
        const loginAsRoot = new login_as_root_page_1.LoginAsRootPage(helpers_1.page);
        const invalidpassword = "invalid password";
        await loginAsRoot.fillPassword(invalidpassword);
        await loginAsRoot.logIn();
        const alertText = await (0, helpers_1.getTextContent)(loginAsRoot.couldNotLoginText());
        strict_1.default.deepEqual(alertText, "Danger alert:Could not log in. Please, make sure that the password is correct.");
        await loginAsRoot.togglePasswordVisibility();
        const passwordInputValue = await (0, helpers_1.getValue)(loginAsRoot.passwordInput());
        strict_1.default.deepEqual(passwordInputValue, invalidpassword);
    });
}


/***/ },

/***/ "./src/checks/network.ts"
/*!*******************************!*\
  !*** ./src/checks/network.ts ***!
  \*******************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setOnlyInstallationNetwork = setOnlyInstallationNetwork;
exports.setOnlyInstallationNetworkWithSidebar = setOnlyInstallationNetworkWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const header_page_1 = __webpack_require__(/*! ../pages/header_page */ "./src/pages/header_page.ts");
const network_page_1 = __webpack_require__(/*! ../pages/network_page */ "./src/pages/network_page.ts");
const network_wired_connection_page_1 = __webpack_require__(/*! ../pages/network_wired_connection_page */ "./src/pages/network_wired_connection_page.ts");
const network_with_sidebar_page_1 = __webpack_require__(/*! ../pages/network_with_sidebar_page */ "./src/pages/network_with_sidebar_page.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
function setOnlyInstallationNetwork() {
    (0, helpers_1.it)("should allow setting only installation network", async function () {
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const networkPage = new network_page_1.NetworkPage(helpers_1.page);
        const networkWiredConnectionPage = new network_wired_connection_page_1.NetworkWiredConnectionPage(helpers_1.page);
        await overview.goToNetwork();
        await networkPage.selectConnectionDetails();
        await networkWiredConnectionPage.selectInstallationOnly();
        await header.goToInstallation();
    });
    (0, helpers_1.it)("should alert no network after installation", async function () {
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const networkPage = new network_page_1.NetworkPage(helpers_1.page);
        await overview.goToNetwork();
        await networkPage.verifyWarningAlert();
        await header.goToInstallation();
    });
}
function setOnlyInstallationNetworkWithSidebar() {
    (0, helpers_1.it)("should allow setting only installation network", async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const networkPage = new network_with_sidebar_page_1.NetworkWithSidebarPage(helpers_1.page);
        await sidebar.goToNetwork();
        await networkPage.selectWiredConnection();
        await networkPage.selectInstallationOnly();
    });
    (0, helpers_1.it)("should alert no network after installation", async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const networkPage = new network_with_sidebar_page_1.NetworkWithSidebarPage(helpers_1.page);
        await sidebar.goToNetwork();
        await networkPage.verifyWarningAlert();
    });
}


/***/ },

/***/ "./src/checks/overview.ts"
/*!********************************!*\
  !*** ./src/checks/overview.ts ***!
  \********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ensureLandingOnOverview = ensureLandingOnOverview;
exports.ensureLandingOnOverviewWithSidebar = ensureLandingOnOverviewWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const overview_with_sidebar_page_1 = __webpack_require__(/*! ../pages/overview_with_sidebar_page */ "./src/pages/overview_with_sidebar_page.ts");
function ensureLandingOnOverview() {
    (0, helpers_1.it)("should display Overview", async function () {
        await new overview_page_1.OverviewPage(helpers_1.page).ensureSystemInformationPresent(70000);
    }, 71 * 1000);
}
function ensureLandingOnOverviewWithSidebar() {
    (0, helpers_1.it)("should display Overview", async function () {
        await new overview_with_sidebar_page_1.OverviewWithSidebarPage(helpers_1.page).waitVisible(70000);
    }, 71 * 1000);
}


/***/ },

/***/ "./src/checks/registration.ts"
/*!************************************!*\
  !*** ./src/checks/registration.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.enterProductRegistration = enterProductRegistration;
exports.enterExtensionRegistrationHA = enterExtensionRegistrationHA;
exports.enterExtensionRegistrationPHub = enterExtensionRegistrationPHub;
exports.verifyRegistrationWarniningAlerts = verifyRegistrationWarniningAlerts;
exports.enterProductRegistrationWithSidebar = enterProductRegistrationWithSidebar;
exports.enterExtensionRegistrationHAWithSidebar = enterExtensionRegistrationHAWithSidebar;
exports.enterExtensionRegistrationPHubWithSidebar = enterExtensionRegistrationPHubWithSidebar;
exports.verifyRegistrationWarniningAlertsWithSidebar = verifyRegistrationWarniningAlertsWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const registration_page_1 = __webpack_require__(/*! ../pages/registration_page */ "./src/pages/registration_page.ts");
const extension_registration_phub_page_1 = __webpack_require__(/*! ../pages/extension_registration_phub_page */ "./src/pages/extension_registration_phub_page.ts");
const extension_registration_ha_page_1 = __webpack_require__(/*! ../pages/extension_registration_ha_page */ "./src/pages/extension_registration_ha_page.ts");
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
const trust_registration_certificate_page_1 = __webpack_require__(/*! ../pages/trust_registration_certificate_page */ "./src/pages/trust_registration_certificate_page.ts");
const header_page_1 = __webpack_require__(/*! ../pages/header_page */ "./src/pages/header_page.ts");
const product_registration_legacy_page_1 = __webpack_require__(/*! ../pages/product_registration_legacy_page */ "./src/pages/product_registration_legacy_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const overview_with_sidebar_page_1 = __webpack_require__(/*! ../pages/overview_with_sidebar_page */ "./src/pages/overview_with_sidebar_page.ts");
function enterProductRegistration({ use_custom, code, provide_code, url, }) {
    (0, helpers_1.it)("should allow setting registration", async function () {
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        let productRegistration;
        await overview.goToRegistration();
        if (use_custom) {
            productRegistration = new registration_page_1.RegistrationCustomPage(helpers_1.page);
            if (url) {
                await productRegistration.selectCustomRegistrationServer();
                await productRegistration.fillServerUrl(url);
            }
            if (provide_code) {
                await productRegistration.fillCode(code);
            }
        }
        else {
            productRegistration = new registration_page_1.RegistrationSCCPage(helpers_1.page);
            await productRegistration.fillCode(code);
        }
        await productRegistration.register();
    });
    if (url?.startsWith("https")) {
        (0, helpers_1.it)("should handle HTTPS certificate trust for custom registration server", async function () {
            const trustRegistration = new trust_registration_certificate_page_1.TrustRegistrationCertificatePage(helpers_1.page);
            strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(trustRegistration.titleText()), "Registration certificate");
            strict_1.default.match(await (0, helpers_1.getTextContent)(trustRegistration.questionText()), /Trying to import a self.signed certificate\. Do you want to trust it and register the product\?/);
            strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(trustRegistration.issuerText()), "RMT Certificate Authority");
            await trustRegistration.trustCertificate();
        });
    }
    (0, helpers_1.it)("should display product has been registered", async function () {
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const productRegistrationSCC = new registration_page_1.RegistrationSCCPage(helpers_1.page);
        const registeredText = await (0, helpers_1.getTextContent)(productRegistrationSCC.infoHasBeenRegisteredText());
        strict_1.default.match(registeredText, /SUSE Linux Enterprise Server.*has been registered with below information/);
        await header.goToInstallation();
    });
}
function enterExtensionRegistrationHA(code) {
    (0, helpers_1.it)("should allow registering HA extension", async function () {
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const extensionRegistrationHA = new extension_registration_ha_page_1.ExtensionRegistrationHAPage(helpers_1.page);
        await overview.goToRegistration();
        await extensionRegistrationHA.fillCode(code);
        await extensionRegistrationHA.register();
        strict_1.default.match(await (0, helpers_1.getTextContent)(extensionRegistrationHA.extensionRegisteredText()), /The extension has been registered/);
        await header.goToInstallation();
    });
}
function enterExtensionRegistrationPHub() {
    (0, helpers_1.it)("should allow registering Package Hub extension", async function () {
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const extensionRegistrationPHub = new extension_registration_phub_page_1.ExtensionRegistrationPHubPage(helpers_1.page);
        await overview.goToRegistration();
        await extensionRegistrationPHub.register();
        strict_1.default.match(await (0, helpers_1.getTextContent)(extensionRegistrationPHub.trustKeyText()), /is unknown. Do you want to trust this key?/);
        await extensionRegistrationPHub.trustKey();
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(extensionRegistrationPHub.registeredText()), "The extension was registered without any registration code.");
        await header.goToInstallation();
    });
}
function verifyRegistrationWarniningAlerts() {
    (0, helpers_1.it)("should show warning alert for missing registration code", async function () {
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const productRegistrationCustom = new registration_page_1.RegistrationCustomPage(helpers_1.page);
        await overview.goToRegistration();
        await productRegistrationCustom.register();
        const warningText = await (0, helpers_1.getTextContent)(productRegistrationCustom.alertWarningEnterARegistrationCodeText());
        strict_1.default.deepEqual(warningText, "Please provide Registration Code.");
    });
    (0, helpers_1.it)("should show warning alert for invalid registration code", async function () {
        const productRegistrationCustom = new registration_page_1.RegistrationCustomPage(helpers_1.page);
        await productRegistrationCustom.fillCode("1234invalid4321");
        await productRegistrationCustom.register();
        const warningText = await (0, helpers_1.getTextContent)(productRegistrationCustom.alertWarningUnknownRegistrationCodeText());
        strict_1.default.deepEqual(warningText, "Unknown Registration Code.");
    });
    (0, helpers_1.it)("should show warning alert for invalid custom registration server", async function () {
        const productRegistrationCustom = new registration_page_1.RegistrationCustomPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        await productRegistrationCustom.fillServerUrl("http://scc.example.net");
        await productRegistrationCustom.register();
        const warningText = await (0, helpers_1.getTextContent)(productRegistrationCustom.alertWarningNetworkErrorText());
        strict_1.default.match(warningText, /Network error: dial tcp: lookup .+ on .+: no such host/);
        await header.goToInstallation();
    }, 90000);
}
function enterProductRegistrationWithSidebar({ use_custom, code, provide_code, url, }) {
    (0, helpers_1.it)("should allow setting registration", async function () {
        const sidebar = new sidebar_page_1.SidebarWithRegistrationPage(helpers_1.page);
        const productRegistration = new product_registration_legacy_page_1.ProductRegistrationLegacyPage(helpers_1.page);
        await sidebar.goToRegistration();
        if (use_custom) {
            if (url) {
                const customRegistration = new product_registration_legacy_page_1.CustomRegistrationLegacyPage(helpers_1.page);
                await customRegistration.selectCustomRegistrationServer();
                await customRegistration.fillServerUrl(url);
            }
            if (provide_code) {
                await productRegistration.checkProvideRegistrationCode();
                await productRegistration.fillCode(code);
            }
        }
        else {
            await productRegistration.fillCode(code);
        }
        await productRegistration.register();
    });
    if (url?.startsWith("https")) {
        (0, helpers_1.it)("should handle HTTPS certificate trust for custom registration server", async function () {
            const trustRegistration = new trust_registration_certificate_page_1.TrustRegistrationCertificatePage(helpers_1.page);
            strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(trustRegistration.titleText()), "Registration certificate");
            strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(trustRegistration.questionText()), "Trying to import a self signed certificate. Do you want to trust it and register the product?");
            strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(trustRegistration.issuerText()), "RMT Certificate Authority");
            strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(trustRegistration.urlText(url)), url);
            await trustRegistration.trustCertificate();
        });
    }
    (0, helpers_1.it)("should display product has been registered", async function () {
        const sidebar = new sidebar_page_1.SidebarWithRegistrationPage(helpers_1.page);
        const productRegistration = new product_registration_legacy_page_1.ProductRegistrationLegacyPage(helpers_1.page);
        await new overview_with_sidebar_page_1.OverviewWithSidebarPage(helpers_1.page).waitVisible(59000);
        await sidebar.goToRegistration();
        const registeredText = await (0, helpers_1.getTextContent)(productRegistration.infoHasBeenRegisteredText());
        strict_1.default.match(registeredText, /SUSE Linux Enterprise Server.*has been registered with below information/);
    });
}
function enterExtensionRegistrationHAWithSidebar(code) {
    (0, helpers_1.it)("should allow registering HA extension", async function () {
        const sidebar = new sidebar_page_1.SidebarWithRegistrationPage(helpers_1.page);
        const extensionRegistrationHA = new extension_registration_ha_page_1.ExtensionRegistrationHAPage(helpers_1.page);
        await sidebar.goToRegistration();
        await extensionRegistrationHA.fillCode(code);
        await extensionRegistrationHA.register();
        strict_1.default.match(await (0, helpers_1.getTextContent)(extensionRegistrationHA.extensionRegisteredText()), /The extension has been registered/);
    });
}
function enterExtensionRegistrationPHubWithSidebar() {
    (0, helpers_1.it)("should allow registering Package Hub extension", async function () {
        const sidebar = new sidebar_page_1.SidebarWithRegistrationPage(helpers_1.page);
        const extensionRegistrationPHub = new extension_registration_phub_page_1.ExtensionRegistrationPHubPage(helpers_1.page);
        await sidebar.goToRegistration();
        await extensionRegistrationPHub.register();
        strict_1.default.match(await (0, helpers_1.getTextContent)(extensionRegistrationPHub.trustKeyText()), /is unknown. Do you want to trust this key?/);
        await extensionRegistrationPHub.trustKey();
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(extensionRegistrationPHub.registeredText()), "The extension was registered without any registration code.");
    });
}
function verifyRegistrationWarniningAlertsWithSidebar(use_custom, url) {
    (0, helpers_1.it)("should show warning alert for missing registration code", async function () {
        const sidebar = new sidebar_page_1.SidebarWithRegistrationPage(helpers_1.page);
        const customRegistration = new product_registration_legacy_page_1.CustomRegistrationLegacyPage(helpers_1.page);
        await sidebar.goToRegistration();
        if (use_custom)
            await customRegistration.checkProvideRegistrationCode();
        await customRegistration.register();
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(customRegistration.alertWarningEnterARegistrationCodeText()), "Enter a registration code");
    });
    (0, helpers_1.it)("should show warning alert for invalid registration code", async function () {
        const customRegistration = new product_registration_legacy_page_1.CustomRegistrationLegacyPage(helpers_1.page);
        await customRegistration.fillCode("1234invalid4321");
        await customRegistration.register();
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(customRegistration.connectionToRegistrationServerFailedText()), "Warning alert:Connection to registration server failed: Unknown Registration Code.");
    });
    (0, helpers_1.it)("should show warning alert for invalid custom registration server", async function () {
        const customRegistration = new product_registration_legacy_page_1.CustomRegistrationLegacyPage(helpers_1.page);
        await customRegistration.selectCustomRegistrationServer();
        await customRegistration.uncheckProvideRegistrationCode();
        await customRegistration.fillServerUrl("http://scc.example.net");
        await customRegistration.register();
        strict_1.default.match(await (0, helpers_1.getTextContent)(customRegistration.connectionToRegistrationServerFailedText()), /Connection to registration server failed: dial tcp: lookup .+ on .+: no such host \(network error\)/);
        if (use_custom) {
            await customRegistration.fillServerUrl(url);
        }
        else {
            await customRegistration.selectSCCRegistrationServer();
            await customRegistration.fillCode("1234invalid4321");
        }
        await customRegistration.register();
    });
}


/***/ },

/***/ "./src/checks/software.ts"
/*!********************************!*\
  !*** ./src/checks/software.ts ***!
  \********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.selectADesktop = selectADesktop;
exports.changePatterns = changePatterns;
exports.selectPatternsWithSidebar = selectPatternsWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const header_page_1 = __webpack_require__(/*! ../pages/header_page */ "./src/pages/header_page.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const software_page_1 = __webpack_require__(/*! ../pages/software_page */ "./src/pages/software_page.ts");
const software_legacy_page_1 = __webpack_require__(/*! ../pages/software_legacy_page */ "./src/pages/software_legacy_page.ts");
const software_patterns_selection_page_1 = __webpack_require__(/*! ../pages/software_patterns_selection_page */ "./src/pages/software_patterns_selection_page.ts");
const software_patterns_selection_legacy_page_1 = __webpack_require__(/*! ../pages/software_patterns_selection_legacy_page */ "./src/pages/software_patterns_selection_legacy_page.ts");
const software_desktop_selection_page_1 = __webpack_require__(/*! ../pages/software_desktop_selection_page */ "./src/pages/software_desktop_selection_page.ts");
function selectADesktop(desktop) {
    (0, helpers_1.it)(`should select a desktop ${desktop}`, async function () {
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const software = new software_page_1.SoftwarePage(helpers_1.page);
        const softwareDesktopSelectionPage = new software_desktop_selection_page_1.SoftwareDesktopSelectionPage(helpers_1.page);
        await overview.goToSoftware();
        await software.selectADesktop();
        await (0, helpers_1.waitUntilOverlaySettled)(() => softwareDesktopSelectionPage.select(desktop));
        await (0, helpers_1.waitUntilOverlaySettled)(() => softwareDesktopSelectionPage.accept());
        await header.goToInstallation();
    });
}
function changePatterns(patterns) {
    (0, helpers_1.it)(`should change patterns by selecting ${patterns.join(", ")}`, async function () {
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const software = new software_page_1.SoftwarePage(helpers_1.page);
        const softwarePatternsSelection = new software_patterns_selection_page_1.SoftwarePatternsSelectionPage(helpers_1.page);
        await overview.goToSoftware();
        await software.changePatterns();
        for (const pattern of patterns)
            await softwarePatternsSelection.select(pattern);
        await (0, helpers_1.waitUntilOverlaySettled)(() => softwarePatternsSelection.accept());
        header.goToInstallation();
    });
}
function selectPatternsWithSidebar(patterns) {
    (0, helpers_1.it)(`should select patterns ${patterns.join(", ")}`, async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const software = new software_legacy_page_1.SoftwareLegacyPage(helpers_1.page);
        const softwarePatternsSelection = new software_patterns_selection_legacy_page_1.SoftwarePatternsSelectionLegacyPage(helpers_1.page);
        await sidebar.goToSoftware();
        await software.changeSelection();
        for (const pattern of patterns)
            await softwarePatternsSelection.selectPattern(pattern);
        await softwarePatternsSelection.close();
    });
}


/***/ },

/***/ "./src/checks/storage_change_device_to_install.ts"
/*!********************************************************!*\
  !*** ./src/checks/storage_change_device_to_install.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.changeDeviceToInstallTheSystem = changeDeviceToInstallTheSystem;
exports.changeDeviceToInstallTheSystemWithSidebar = changeDeviceToInstallTheSystemWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const table_1 = __webpack_require__(/*! ../lib/table */ "./src/lib/table.ts");
const header_page_1 = __webpack_require__(/*! ../pages/header_page */ "./src/pages/header_page.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const storage_change_disk_page_1 = __webpack_require__(/*! ../pages/storage_change_disk_page */ "./src/pages/storage_change_disk_page.ts");
const storage_page_1 = __webpack_require__(/*! ../pages/storage_page */ "./src/pages/storage_page.ts");
const storage_settings_change_disk_page_1 = __webpack_require__(/*! ../pages/storage_settings_change_disk_page */ "./src/pages/storage_settings_change_disk_page.ts");
const storage_settings_page_1 = __webpack_require__(/*! ../pages/storage_settings_page */ "./src/pages/storage_settings_page.ts");
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
function changeDeviceToInstallTheSystem() {
    (0, helpers_1.it)("should change the device to install the system to one which fails to calculate a storage layout", async function () {
        const storage = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        const storageSettingsChangeDisk = new storage_settings_change_disk_page_1.StorageSettingsChangeDiskPage(helpers_1.page);
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        await overview.goToStorage();
        await storage.selectInstallationDevices();
        await storage.selectUsedDisk();
        await storage.changeTheDeviceToInstallTheSystem();
        (await (0, table_1.getElementInCell)(helpers_1.page, storageSettingsChangeDisk.diskTableSelector, "Size", "5 GiB", "input[type='radio']")).click();
        await storageSettingsChangeDisk.changeTo();
        await storage.ensureStorageSettingsPresent();
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(storage.storageAllocationWarningText()), 'It is not possible to allocate space for the boot partition and for "/" (at least 12.5 GiB) and "swap" (1 GiB - 2 GiB).');
        await storage.moreOptions();
        helpers_1.page.setDefaultTimeout(40000);
        await storage.resetToDefault();
        await storage.ensureStorageSettingsPresent();
        await header.goToInstallation();
        // prefer explicit wait over hard delay.
        await overview.ensureSystemInformationPresent(120000);
    }, 150000);
}
function changeDeviceToInstallTheSystemWithSidebar() {
    (0, helpers_1.it)("should change the disk to install the system to one which fails to calculate a storage layout", async function () {
        const storage = new storage_page_1.StoragePage(helpers_1.page);
        const storageChangeDisk = new storage_change_disk_page_1.StorageChangeDiskPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToStorage();
        await storage.selectChangeDisk();
        await storage.selectADiskToInstallTheSystem();
        (await (0, table_1.getElementInCell)(helpers_1.page, storageChangeDisk.diskTableSelector, "Size", "5 GiB", "input[type='radio']")).click();
        await storageChangeDisk.confirm();
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(storage.storageAllocationWarningText()), 'It is not possible to allocate space for the boot partition and for "/" (at least 12.5 GiB) and "swap" (1 GiB - 2 GiB).');
        await storage.otherOptions();
        await storage.resetToDefault();
    });
}


/***/ },

/***/ "./src/checks/storage_change_root_partition.ts"
/*!*****************************************************!*\
  !*** ./src/checks/storage_change_root_partition.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize = changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize;
exports.changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSizeWithSidebar = changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSizeWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const storage_settings_page_1 = __webpack_require__(/*! ../pages/storage_settings_page */ "./src/pages/storage_settings_page.ts");
const configure_partition_page_1 = __webpack_require__(/*! ../pages/configure_partition_page */ "./src/pages/configure_partition_page.ts");
const configure_partition_with_sidebar_page_1 = __webpack_require__(/*! ../pages/configure_partition_with_sidebar_page */ "./src/pages/configure_partition_with_sidebar_page.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const header_page_1 = __webpack_require__(/*! ../pages/header_page */ "./src/pages/header_page.ts");
const storage_page_1 = __webpack_require__(/*! ../pages/storage_page */ "./src/pages/storage_page.ts");
function changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize() {
    (0, helpers_1.it)("should change the file system to btrfs (without snapshots) and adjust it to min size", async function () {
        const storage = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        const configurePartition = new configure_partition_page_1.ConfigurePartitionPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        await overview.goToStorage();
        await storage.expandPartitions();
        await storage.clickOptionForRoot();
        await storage.editRootPartition();
        await configurePartition.setASpecificSize("5 GiB");
        await configurePartition.changeFileSystemToBtrfs();
        await (0, helpers_1.waitUntilOverlaySettled)(() => configurePartition.accept());
        await header.goToInstallation();
    });
}
function changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSizeWithSidebar() {
    (0, helpers_1.it)("should change the file system to btrfs (without snapshots) and adjust it to min size", async function () {
        const storage = new storage_page_1.StoragePage(helpers_1.page);
        const configRootPartition = new configure_partition_with_sidebar_page_1.ConfigurePartitionWithSidebarPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToStorage();
        await storage.expandPartitions();
        await storage.editRootPartition();
        await configRootPartition.changeFilesystemToBtrfs();
        await configRootPartition.selectSizeMode();
        await configRootPartition.changeSizeModeToManual();
        await configRootPartition.inputPartitionSize("5 GiB");
        await configRootPartition.disableAllowGrowing();
        await configRootPartition.accept();
    });
}


/***/ },

/***/ "./src/checks/storage_dasd.ts"
/*!************************************!*\
  !*** ./src/checks/storage_dasd.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareDasdStorage = prepareDasdStorage;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const storage_settings_page_1 = __webpack_require__(/*! ../pages/storage_settings_page */ "./src/pages/storage_settings_page.ts");
const dasd_page_1 = __webpack_require__(/*! ../pages/dasd_page */ "./src/pages/dasd_page.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const header_page_1 = __webpack_require__(/*! ../pages/header_page */ "./src/pages/header_page.ts");
function prepareDasdStorage() {
    (0, helpers_1.it)("should prepare DASD storage", async function () {
        const storage = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        const dasd = new dasd_page_1.DasdPage(helpers_1.page);
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        await overview.goToStorage();
        await storage.manageDasd();
        await dasd.selectDevice();
        await (0, helpers_1.waitUntilOverlaySettled)(() => dasd.activateDevice());
        await dasd.selectDeviceToFormat();
        helpers_1.page.setDefaultTimeout(6 * 60 * 1000);
        await (0, helpers_1.waitUntilOverlaySettled)(() => dasd.formatNowDevice());
        await header.goToStorage();
        await storage.waitForElement("::-p-text(Installation devices)", 60000);
        await header.goToInstallation();
    }, 7 * 60 * 1000);
}


/***/ },

/***/ "./src/checks/storage_out_of_sync.ts"
/*!*******************************************!*\
  !*** ./src/checks/storage_out_of_sync.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.verifyStorageOutOfSync = verifyStorageOutOfSync;
exports.verifyStorageOutOfSyncWithSidebar = verifyStorageOutOfSyncWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const util_1 = __importDefault(__webpack_require__(/*! util */ "util"));
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
const storage_warning_out_of_sync_page_1 = __webpack_require__(/*! ../pages/storage_warning_out_of_sync_page */ "./src/pages/storage_warning_out_of_sync_page.ts");
function verifyStorageOutOfSync() { }
function verifyStorageOutOfSyncWithSidebar() {
    (0, helpers_1.it)("should verify storage out of sync popup", async function () {
        const storageWarningOutOfSyncPage = new storage_warning_out_of_sync_page_1.StorageWarningOutOfSyncPage(helpers_1.page);
        const execPromise = util_1.default.promisify(child_process_1.exec);
        await execPromise("agama probe");
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(storageWarningOutOfSyncPage.configurationOutOfSyncWarningAlert()), "Configuration out of sync");
        await storageWarningOutOfSyncPage.reload();
    });
}


/***/ },

/***/ "./src/checks/storage_result_destructive_actions_planned.ts"
/*!******************************************************************!*\
  !*** ./src/checks/storage_result_destructive_actions_planned.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.verifyDecryptDestructiveActions = verifyDecryptDestructiveActions;
exports.verifyDecryptDestructiveActionsWithSidebar = verifyDecryptDestructiveActionsWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const header_page_1 = __webpack_require__(/*! ../pages/header_page */ "./src/pages/header_page.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const storage_result_page_1 = __webpack_require__(/*! ../pages/storage_result_page */ "./src/pages/storage_result_page.ts");
function verifyDecryptDestructiveActions(destructiveActions) {
    (0, helpers_1.it)("should display a list of destructive actions", async function () {
        await new overview_page_1.OverviewPage(helpers_1.page).goToStorage();
        const storage = new storage_result_page_1.StorageResultPage(helpers_1.page);
        await storage.scrollToDestructiveActionsList();
        for (const action of destructiveActions) {
            await storage.destructiveActionText(action).wait();
        }
        await new header_page_1.HeaderPage(helpers_1.page).goToInstallation();
    });
}
function verifyDecryptDestructiveActionsWithSidebar(destructiveActions) {
    (0, helpers_1.it)("should display a list of destructive actions", async function () {
        await new sidebar_page_1.SidebarPage(helpers_1.page).goToStorage();
        const storage = new storage_result_page_1.StorageResultPage(helpers_1.page);
        await storage.expandDestructiveActionsList();
        for (const action of destructiveActions) {
            await storage.destructiveActionText(action).wait();
        }
    });
}


/***/ },

/***/ "./src/checks/storage_select_installation_device.ts"
/*!**********************************************************!*\
  !*** ./src/checks/storage_select_installation_device.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.selectMoreDevices = selectMoreDevices;
exports.selectMoreDevicesWithSidebar = selectMoreDevicesWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const configure_lvm_volume_group_page_1 = __webpack_require__(/*! ../pages/configure_lvm_volume_group_page */ "./src/pages/configure_lvm_volume_group_page.ts");
const storage_settings_page_1 = __webpack_require__(/*! ../pages/storage_settings_page */ "./src/pages/storage_settings_page.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const header_page_1 = __webpack_require__(/*! ../pages/header_page */ "./src/pages/header_page.ts");
function selectMoreDevices() {
    (0, helpers_1.it)("should add LVM volume group", async function () {
        const storage = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        const lvm = new configure_lvm_volume_group_page_1.ConfigureLvmVolumeGroupPage(helpers_1.page);
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        await overview.goToStorage();
        await storage.selectMoreDevices();
        await storage.addLvmVolumeGroup();
        await lvm.accept();
        await header.goToInstallation();
        await overview.ensureSystemInformationPresent();
    });
}
function selectMoreDevicesWithSidebar() {
    (0, helpers_1.it)("should add LVM volume group", async function () {
        const storage = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        const lvm = new configure_lvm_volume_group_page_1.ConfigureLvmVolumeGroupPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToStorage();
        await storage.selectMoreDevices();
        await storage.addLvmVolumeGroup();
        await lvm.accept();
    });
}


/***/ },

/***/ "./src/checks/storage_zfcp.ts"
/*!************************************!*\
  !*** ./src/checks/storage_zfcp.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareZfcpStorage = prepareZfcpStorage;
exports.prepareZfcpStorageWithSidebar = prepareZfcpStorageWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const header_page_1 = __webpack_require__(/*! ../pages/header_page */ "./src/pages/header_page.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const storage_settings_page_1 = __webpack_require__(/*! ../pages/storage_settings_page */ "./src/pages/storage_settings_page.ts");
const storage_zfcp_activate_controllers_page_1 = __webpack_require__(/*! ../pages/storage_zfcp_activate_controllers_page */ "./src/pages/storage_zfcp_activate_controllers_page.ts");
const zfcp_page_1 = __webpack_require__(/*! ../pages/zfcp_page */ "./src/pages/zfcp_page.ts");
const activate_controllers_page_1 = __webpack_require__(/*! ../pages/activate_controllers_page */ "./src/pages/activate_controllers_page.ts");
const storage_activate_multipath_page_1 = __webpack_require__(/*! ../pages/storage_activate_multipath_page */ "./src/pages/storage_activate_multipath_page.ts");
function prepareZfcpStorage() {
    (0, helpers_1.it)("should prepare zFCP storage", async function () {
        const storageNoDeviceFound = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        const storageZfcpControllersNotActivated = new activate_controllers_page_1.ActivateControllersPage(helpers_1.page);
        const storageZfcpActivateControllers = new storage_zfcp_activate_controllers_page_1.StorageZfcpActivateControllersPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const storageActivateMultipath = new storage_activate_multipath_page_1.StorageActivateMultipathPage(helpers_1.page);
        await overview.goToStorage();
        await storageNoDeviceFound.activateZfcpDisks();
        await storageZfcpControllersNotActivated.activateControllers();
        await storageZfcpActivateControllers.select(["0.0.fa00", "0.0.fc00"]);
        await (0, helpers_1.waitUntilOverlaySettled)(() => storageZfcpActivateControllers.accept(), true);
        await (0, helpers_1.waitUntilOverlaySettled)(() => storageActivateMultipath.yes());
        await header.goToInstallation();
    });
}
function prepareZfcpStorageWithSidebar() {
    (0, helpers_1.it)("should prepare zFCP storage", async function () {
        const storage = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        const zfcp = new zfcp_page_1.ZfcpPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToStorage();
        await storage.activateZfcpDisks();
        await zfcp.activateDevice("0.0.fa00");
        await zfcp.activateDevice("0.0.fc00");
        await zfcp.back();
        await zfcp.activateMultipath();
        // Workaround to wait for page to load, sometimes workers take more than 60 seconds to load storage
        await storage.waitForElement("::-p-text(Activate zFCP disks)", 100000);
    }, 3 * 60 * 1000);
}


/***/ },

/***/ "./src/checks/system.ts"
/*!******************************!*\
  !*** ./src/checks/system.ts ***!
  \******************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setStaticHostname = setStaticHostname;
exports.setPermanentHostnameWithSidebar = setPermanentHostnameWithSidebar;
exports.configureTimeSynchronizationServers = configureTimeSynchronizationServers;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const hostname_page_1 = __webpack_require__(/*! ../pages/hostname_page */ "./src/pages/hostname_page.ts");
const system_page_1 = __webpack_require__(/*! ../pages/system_page */ "./src/pages/system_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const header_page_1 = __webpack_require__(/*! ../pages/header_page */ "./src/pages/header_page.ts");
function setStaticHostname(hostname) {
    (0, helpers_1.it)("should allow setting static hostname", async function () {
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const systemPage = new system_page_1.SystemPage(helpers_1.page);
        await overview.goToSystem();
        await systemPage.selectStaticMode();
        await systemPage.fill(hostname);
        await (0, helpers_1.waitUntilOverlaySettled)(() => systemPage.accept());
        await header.goToInstallation();
    });
}
function setPermanentHostnameWithSidebar(hostname) {
    (0, helpers_1.it)("should allow setting static hostname", async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const hostnamePage = new hostname_page_1.HostnamePage(helpers_1.page);
        await sidebar.goToHostname();
        await hostnamePage.useStaticHostname();
        await hostnamePage.fill(hostname);
        await hostnamePage.accept();
    });
}
function configureTimeSynchronizationServers(serverAddresses) {
    (0, helpers_1.it)("should allow to configure the NTP servers", async function () {
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const system = new system_page_1.SystemPage(helpers_1.page);
        await overview.goToSystem();
        await system.selectCustomMode();
        for (const server of serverAddresses)
            await system.addServerAddress(server);
        await system.accept();
        await header.goToInstallation();
    });
}


/***/ },

/***/ "./src/lib/cmdline.ts"
/*!****************************!*\
  !*** ./src/lib/cmdline.ts ***!
  \****************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.commaSeparatedList = commaSeparatedList;
exports.parse = parse;
const commander_1 = __webpack_require__(/*! commander */ "./node_modules/commander/index.js");
const commander = __importStar(__webpack_require__(/*! commander */ "./node_modules/commander/index.js"));
const helpers_1 = __webpack_require__(/*! ./helpers */ "./src/lib/helpers.ts");
// parse command line argument as an integer
function getInt(value) {
    // parse the value as a decimal number (base 10)
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
        throw new commander.InvalidArgumentError("Enter a valid number.");
    }
    return parsed;
}
function commaSeparatedList(value) {
    return value.includes(";") ? value.split(";") : value.split(",");
}
/**
 * Parse command line options. When an invalid command line option is used the script aborts.
 * @param callback callback for adding custom command line options
 * @returns [commander.OptionValues] parsed command line
 * @see https://github.com/tj/commander.js
 */
function parse(callback) {
    // define the command line arguments and parse them
    const prg = commander_1.program
        .description("Run Agama integration test")
        .option("-u, --url <url>", "Agama server URL", "http://localhost")
        .option("-p, --password <password>", "Agama login password", "linux")
        .option("-a, --agama-image-version <version>", "Agama image version")
        .option("-w, --agama-web-ui-package-version <version>", "Agama Web UI package version")
        .option("-v, --product-version <version>", "Product version")
        .addOption(new commander_1.Option("-b, --browser <browser>", "Browser used for running the test")
        .choices(["firefox", "chrome", "chromium"])
        .default("firefox"))
        .option("-r, --root-password <password>", "Target root login password", "linux")
        .option("-h, --headed", "Run the browser in headed mode with UI (the default is headless mode)")
        .addOption(new commander_1.Option("-d, --delay <miliseconds>", "Delay between the browser actions, useful in headed mode")
        .argParser(getInt)
        .default(0))
        .option("-c, --continue", "Continue the test after a failure (the default is abort on error)", false);
    if (callback)
        callback(prg);
    prg.parse(process.argv);
    (0, helpers_1.setContinueOnError)(commander_1.program.opts().continue);
    // parse options from the command line
    return commander_1.program.opts();
}


/***/ },

/***/ "./src/lib/helpers.ts"
/*!****************************!*\
  !*** ./src/lib/helpers.ts ***!
  \****************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.page = void 0;
exports.test_init = test_init;
exports.setContinueOnError = setContinueOnError;
exports.dumpPage = dumpPage;
exports.it = it;
exports.sleep = sleep;
exports.getTextContent = getTextContent;
exports.getValue = getValue;
exports.waitUntilOverlaySettled = waitUntilOverlaySettled;
exports.waitOnFile = waitOnFile;
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const http_1 = __importDefault(__webpack_require__(/*! http */ "http"));
const https_1 = __importDefault(__webpack_require__(/*! https */ "https"));
const zlib_1 = __importDefault(__webpack_require__(/*! zlib */ "zlib"));
const wait_on_1 = __importDefault(__webpack_require__(/*! wait-on */ "./node_modules/wait-on/lib/wait-on.js"));
const puppeteer = __importStar(__webpack_require__(/*! puppeteer-core */ "./node_modules/puppeteer-core/lib/cjs/puppeteer/puppeteer-core.js"));
// see https://nodejs.org/docs/latest-v20.x/api/test.html
const node_test_1 = __webpack_require__(/*! node:test */ "node:test");
let browser;
let url;
// directory for storing the dumped data after a failure
const dir = "log";
/**
 * Debug logging utility for development and troubleshooting.
 *
 * Set DEBUG_AGAMA=1 or DEBUG_AGAMA=true to enable debug output.
 *
 * Example:
 *   DEBUG_AGAMA=1 ./dist/test_default_installation.js
 *
 * @param message - The debug message to log
 */
function debugLog(message) {
    if (process.env.DEBUG_AGAMA === "1" || process.env.DEBUG_AGAMA === "true") {
        console.log(`[Debug]: ${message}`);
    }
}
// helper function for configuring the browser
function browserSettings(name) {
    switch (name.toLowerCase()) {
        case "firefox":
            return {
                browser: "firefox",
                executablePath: "/usr/bin/firefox",
            };
        case "chrome":
            return {
                browser: "chrome",
                executablePath: "/usr/bin/google-chrome-stable",
            };
        case "chromium":
            return {
                browser: "chrome",
                executablePath: "/usr/bin/chromium",
            };
        default:
            throw new Error(`Unsupported browser type: ${name}`);
    }
}
async function startBrowser(headless, slowMo, agamaBrowser, agamaServer) {
    url = agamaServer;
    browser = await puppeteer.launch({
        // "webDriverBiDi" does not work with old FireFox, comment it out if needed
        protocol: "webDriverBiDi",
        headless,
        acceptInsecureCerts: true,
        timeout: 30000,
        // This timeout is increased due to DASD format step review in future changes
        protocolTimeout: 360000,
        slowMo,
        defaultViewport: {
            width: 1280,
            height: 800,
        },
        ...browserSettings(agamaBrowser),
    });
    exports.page = await browser.newPage();
    exports.page.setDefaultTimeout(30000);
    await exports.page.goto(agamaServer, {
        timeout: 60000,
        waitUntil: "domcontentloaded",
    });
    return { page: exports.page, browser };
}
async function finishBrowser() {
    if (exports.page)
        await exports.page.close();
    if (browser)
        await browser.close();
}
function test_init(options) {
    // Create log directory at the start of test suite
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir);
    (0, node_test_1.before)(async function () {
        ({ page: exports.page } = await startBrowser(!options.headed, options.delay, options.browser, options.url));
    });
    (0, node_test_1.after)(async function () {
        await finishBrowser();
    });
}
let failed = false;
let continueOnError = false;
function setContinueOnError(enabled) {
    continueOnError = enabled;
}
// helper function, dump the index.css file so the HTML dump can properly displayed
async function dumpCSS() {
    const cssData = [];
    const downloader = url.startsWith("https://") ? https_1.default : http_1.default;
    return new Promise((resolve, reject) => {
        downloader
            .get(url + "/index.css", {
            // ignore HTTPS errors (self-signed certificate)
            rejectUnauthorized: false,
            // use gzip compression
            headers: { "Accept-Encoding": "gzip" },
        }, (res) => {
            res.on("data", (chunk) => {
                cssData.push(Buffer.from(chunk, "binary"));
            });
            res.on("end", () => {
                // merge all chunks
                const data = Buffer.concat(cssData);
                const cssFile = dir + "/index.css";
                if (res.headers["content-encoding"] === "gzip") {
                    zlib_1.default.gunzip(data, (err, unpacked) => {
                        if (err) {
                            console.error("Cannot decompress index.css: ", err.cause);
                            reject(err.cause);
                        }
                        else {
                            fs_1.default.writeFileSync(cssFile, unpacked);
                            resolve(cssFile);
                        }
                    });
                }
                else {
                    fs_1.default.writeFileSync(cssFile, data);
                    resolve(cssFile);
                }
            });
        })
            .on("error", (e) => {
            console.error("Cannot download index.css: ", e);
            reject(e);
        });
    });
}
// dump the current page displayed in puppeteer
// ts-prune-ignore-next
async function dumpPage(label) {
    // base file name for the dumps
    const name = path_1.default.join(dir, label.replace(/[^a-zA-Z0-9]/g, "_"));
    await exports.page.screenshot({ path: name + ".png" });
    const html = await exports.page.content();
    fs_1.default.writeFileSync(name + ".html", html);
}
// define it() as a wrapper which dumps the page on a failure
async function it(label, test, timeout) {
    (0, node_test_1.it)(label, 
    // abort when the test takes more than one minute
    { timeout: timeout || 60000 }, async (t) => {
        try {
            // do not run any test after first failure
            if (failed)
                t.skip();
            else
                await test();
        }
        catch (error) {
            // remember the failure for the next tests
            if (!continueOnError)
                failed = true;
            if (exports.page) {
                // dump the page and the CSS in parallel
                await Promise.allSettled([dumpPage(label), dumpCSS()]);
            }
            throw new Error("Test failed!", { cause: error });
        }
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getTextContent(locator, timeout = 30000) {
    return locator
        .map((element) => element.textContent)
        .setTimeout(timeout)
        .wait();
}
function getValue(locator) {
    return locator.map((element) => element.value).wait();
}
async function waitUntilOverlaySettled(action, expectQuestionInterruption = false) {
    const selector = '[role="alert"].agm-main-content-overlay';
    const start = Date.now();
    // Start watching for overlay BEFORE executing the action
    const appearancePromise = exports.page.waitForSelector(selector, { visible: true, timeout: 10000 })
        .catch(() => {
        debugLog("Overlay did not appear within 10000ms after action. Moving on...");
        return null;
    });
    // Execute the action (e.g., clicking accept button)
    await action();
    // Wait for the overlay we started watching for
    const appeared = await appearancePromise;
    if (appeared && !expectQuestionInterruption) {
        debugLog("Overlay detected. Waiting for it to disappear...");
        await exports.page.waitForSelector(selector, { hidden: true });
        const duration = Date.now() - start;
        debugLog(`Overlay cleared after ${duration}ms`);
    }
    else if (appeared && expectQuestionInterruption) {
        debugLog("Overlay expected and not waiting for it to disappear.");
    }
}
async function waitOnFile(filePath) {
    const opts = {
        resources: [filePath],
        delay: 3000,
        timeout: 30000,
        window: 4000,
    };
    try {
        await (0, wait_on_1.default)(opts);
    }
    catch (error) {
        throw new Error("waitOnFile failed!", { cause: error });
    }
}
;


/***/ },

/***/ "./src/lib/product_strategy_factory.ts"
/*!*********************************************!*\
  !*** ./src/lib/product_strategy_factory.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductStrategyFactory = void 0;
const development_release_strategy_1 = __webpack_require__(/*! ../variants/development_release_strategy */ "./src/variants/development_release_strategy.ts");
const production_release_strategy_1 = __webpack_require__(/*! ../variants/production_release_strategy */ "./src/variants/production_release_strategy.ts");
const maintenance_release_strategy_1 = __webpack_require__(/*! ../variants/maintenance_release_strategy */ "./src/variants/maintenance_release_strategy.ts");
class ProductStrategyFactory {
    static create(productVersion, agamaWebUiPackageVersion) {
        if (productVersion === "16.0") {
            return new maintenance_release_strategy_1.MaintenanceReleaseStrategy();
        }
        if (productVersion === "16.1") {
            const [versionPart, commitPart] = agamaWebUiPackageVersion.split("+");
            const [webUiVersion, webUiCommit] = [Number(versionPart), Number(commitPart?.split(".")[0])];
            // tracks preparation changes not yet in production since the version/commit
            // where we can find a relevant UI update.
            const isPreProduction = webUiVersion === 22 || (webUiVersion === 21 && webUiCommit >= 155);
            return isPreProduction
                ? new development_release_strategy_1.DevelopmentReleaseStrategy()
                : new production_release_strategy_1.ProductionReleaseStrategy();
        }
        throw new Error(`Unsupported product version: ${productVersion}`);
    }
}
exports.ProductStrategyFactory = ProductStrategyFactory;


/***/ },

/***/ "./src/lib/table.ts"
/*!**************************!*\
  !*** ./src/lib/table.ts ***!
  \**************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTextInCells = getTextInCells;
exports.getElementInCell = getElementInCell;
async function getHeaders(page, tableSelector) {
    const headers = await page.$$eval(`${tableSelector} th[scope="col"]`, (ths) => ths.map((th) => th.innerText.trim() || th.getAttribute('aria-label')));
    return headers.map((h) => (h || "").trim());
}
async function getColumnIndex(page, tableSelector, column) {
    const headers = await getHeaders(page, tableSelector);
    const index = headers.indexOf(column);
    if (index === -1) {
        throw new Error(`Column "${column}" not found in table "${tableSelector}"`);
    }
    return index;
}
async function selectRow(page, tableSelector, column, value) {
    const columnIndex = await getColumnIndex(page, tableSelector, column);
    const rows = await page.$$(`${tableSelector} tbody tr`);
    for (const row of rows) {
        const selector = `*:nth-child(${columnIndex + 1})`;
        const cell = await row.$(selector);
        if (cell) {
            const cellText = await cell.evaluate((c) => c.innerText);
            if (cellText.trim() === value.trim()) {
                return row;
            }
        }
    }
    throw new Error(`Row with "${column}: ${value}" not found in table "${tableSelector}"`);
}
async function readCells(page, tableSelector, row, columns) {
    const headers = await getHeaders(page, tableSelector);
    const columnInfo = columns.map((column) => {
        const index = headers.indexOf(column);
        if (index === -1) {
            throw new Error(`Column "${column}" not found in table "${tableSelector}"`);
        }
        return { column, index };
    });
    return row.evaluate((r, colInfo) => {
        const data = [];
        for (const { index } of colInfo) {
            const cell = r.querySelector(`*:nth-child(${index + 1})`);
            if (cell) {
                data.push(cell.innerText);
            }
            else {
                data.push("");
            }
        }
        return data;
    }, columnInfo);
}
async function readCell(page, tableSelector, row, column) {
    const columnIndex = await getColumnIndex(page, tableSelector, column);
    const selector = `*:nth-child(${columnIndex + 1})`;
    const cell = await row.$(selector);
    if (!cell) {
        throw new Error(`Cell in column "${column}" not found for the selected row.`);
    }
    return cell.evaluate((c) => c.innerText);
}
async function getCell(page, tableSelector, row, column) {
    const columnIndex = await getColumnIndex(page, tableSelector, column);
    const selector = `*:nth-child(${columnIndex + 1})`;
    const cell = await row.$(selector);
    if (!cell) {
        throw new Error(`Cell in column "${column}" not found for the selected row.`);
    }
    return cell;
}
async function getTextInCells(page, tableSelector, rowColumn, rowValue, targetColumns) {
    const row = await selectRow(page, tableSelector, rowColumn, rowValue);
    if (Array.isArray(targetColumns)) {
        return readCells(page, tableSelector, row, targetColumns);
    }
    return readCell(page, tableSelector, row, targetColumns);
}
// ts-prune-ignore-next
async function getElementInCell(page, tableSelector, rowColumn, rowValue, elementSelector, targetColumn) {
    const row = await selectRow(page, tableSelector, rowColumn, rowValue);
    let searchContext = row;
    if (targetColumn) {
        searchContext = await getCell(page, tableSelector, row, targetColumn);
    }
    const element = await searchContext.$(elementSelector);
    if (!element) {
        let errorMessage = `Element with selector "${elementSelector}" not found`;
        if (targetColumn) {
            errorMessage += ` in column "${targetColumn}"`;
        }
        errorMessage += ` in the row identified by "${rowColumn}: ${rowValue}".`;
        throw new Error(errorMessage);
    }
    return element;
}


/***/ },

/***/ "./src/pages/activate_controllers_page.ts"
/*!************************************************!*\
  !*** ./src/pages/activate_controllers_page.ts ***!
  \************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivateControllersPage = void 0;
class ActivateControllersPage {
    page;
    activateControllersLink = () => this.page.locator("::-p-aria(Activate controllers)");
    constructor(page) {
        this.page = page;
    }
    async activateControllers() {
        await this.activateControllersLink().click();
    }
}
exports.ActivateControllersPage = ActivateControllersPage;


/***/ },

/***/ "./src/pages/authentication_page.ts"
/*!******************************************!*\
  !*** ./src/pages/authentication_page.ts ***!
  \******************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticationWithRootLoginPassword = void 0;
class AuthenticationAdministratorAccountPage {
    page;
    defineAnAdministratorUserCheckbox = () => this.page.locator("::-p-aria(Define an administrator user[role='checkbox'])");
    rootLoginMethodButton = () => this.page.locator("::-p-aria(Root login method[role='button'])");
    fullNameTextbox = () => this.page.locator("::-p-aria(Full name[role='textbox'])");
    usernameCombobox = () => this.page.locator("::-p-aria(Username[role='combobox'])");
    userPasswordInput = () => this.page.locator("input#userPassword");
    userPasswordConfirmationInput = () => this.page.locator("input#userPasswordConfirmation");
    acceptButton = () => this.page.locator("::-p-aria(Accept[role='button'])");
    alertPasswordLess8Characters = () => this.page.locator("::-p-text(The password is shorter than 8 characters)");
    alertPasswordIsWeak = () => this.page.locator("::-p-text(The password is weak)");
    alertPasswordFailDictionaryCheck = () => this.page.locator("::-p-text(it is too simplistic/systematic)");
    constructor(page) {
        this.page = page;
    }
    async defineAnAdministratorUser() {
        await this.defineAnAdministratorUserCheckbox().click();
    }
    async selectRootLoginMethod() {
        await this.rootLoginMethodButton().click();
    }
    async fillFullName(fullName) {
        await this.fullNameTextbox().fill(fullName);
    }
    async fillUserName(userName) {
        await this.usernameCombobox().fill(userName);
    }
    async fillPassword(password) {
        await this.userPasswordInput().fill(password);
    }
    async fillPasswordConfirmation(password) {
        await this.userPasswordConfirmationInput().fill(password);
    }
    async accept() {
        await this.acceptButton().click();
    }
}
function RootLoginMethodPasswordDefinable(Base) {
    return class extends Base {
        rootPasswordOption = () => this.page.locator("::-p-aria(Password Log in using a password[role='option'])");
        rootPasswordInput = () => this.page.locator("input#rootPassword");
        rootPasswordConfirmationInput = () => this.page.locator("input#rootPasswordConfirmation");
        async selectPasswordAsRootLoginMethod() {
            await this.rootPasswordOption().click();
        }
        async fillRootPassword(password) {
            await this.rootPasswordInput().fill(password);
        }
        async fillRootPasswordConfirmation(password) {
            await this.rootPasswordConfirmationInput().fill(password);
        }
    };
}
class AuthenticationWithRootLoginPassword extends RootLoginMethodPasswordDefinable(AuthenticationAdministratorAccountPage) {
}
exports.AuthenticationWithRootLoginPassword = AuthenticationWithRootLoginPassword;


/***/ },

/***/ "./src/pages/configure_lvm_volume_group_page.ts"
/*!******************************************************!*\
  !*** ./src/pages/configure_lvm_volume_group_page.ts ***!
  \******************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigureLvmVolumeGroupPage = void 0;
class ConfigureLvmVolumeGroupPage {
    page;
    acceptButton = () => this.page.locator("button::-p-text(Accept)");
    constructor(page) {
        this.page = page;
    }
    async accept() {
        await this.acceptButton().click();
    }
}
exports.ConfigureLvmVolumeGroupPage = ConfigureLvmVolumeGroupPage;


/***/ },

/***/ "./src/pages/configure_partition_page.ts"
/*!***********************************************!*\
  !*** ./src/pages/configure_partition_page.ts ***!
  \***********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurePartitionPage = void 0;
class ConfigurePartitionPage {
    page;
    sizeModeButton = () => this.page.locator("::-p-aria(Size[role='button'])");
    fixedOption = () => this.page.locator("::-p-aria(Fixed Set a specific size[role='option'])");
    valueTextbox = () => this.page.locator("::-p-aria(Value[role='textbox'])");
    fileSystemButton = () => this.page.locator("::-p-aria(File system[role='button'])");
    btrfsOption = () => this.page.locator("::-p-aria(Btrfs[role='option'])");
    acceptButton = () => this.page.locator("::-p-aria(Accept[role='button'])");
    constructor(page) {
        this.page = page;
    }
    async setASpecificSize(value) {
        await this.sizeModeButton().click();
        await this.fixedOption().click();
        await this.valueTextbox().fill(value);
    }
    async changeFileSystemToBtrfs() {
        await this.fileSystemButton().click();
        await this.btrfsOption().click();
    }
    async accept() {
        await this.acceptButton().click();
    }
}
exports.ConfigurePartitionPage = ConfigurePartitionPage;


/***/ },

/***/ "./src/pages/configure_partition_with_sidebar_page.ts"
/*!************************************************************!*\
  !*** ./src/pages/configure_partition_with_sidebar_page.ts ***!
  \************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurePartitionWithSidebarPage = void 0;
class ConfigurePartitionWithSidebarPage {
    page;
    fileSystemButton = () => this.page.locator("::-p-aria(File system)");
    btrfsOption = () => this.page.locator('::-p-aria(Btrfs[role="option"])');
    sizeModeToggleMenu = () => this.page.locator("::-p-aria(Size mode)");
    manualMenuItem = () => this.page.locator("::-p-aria(Manual Define a custom size)");
    sizeGiBTextbox = () => this.page.locator("::-p-aria(Size)[type='text']");
    allowGrowingCheckBox = () => this.page.locator("::-p-aria(Allow growing)");
    acceptButton = () => this.page.locator("::-p-aria(Accept)");
    constructor(page) {
        this.page = page;
    }
    async changeFilesystemToBtrfs() {
        // page is not ready until accept button is enabled
        await this.acceptButton().wait();
        await this.fileSystemButton().click();
        await this.btrfsOption().click();
    }
    async selectSizeMode() {
        await this.sizeModeToggleMenu().click();
    }
    async changeSizeModeToManual() {
        await this.manualMenuItem().click();
    }
    async inputPartitionSize(size) {
        await this.sizeGiBTextbox().fill(size);
    }
    async disableAllowGrowing() {
        await this.allowGrowingCheckBox().click();
    }
    async accept() {
        await this.acceptButton().click();
    }
}
exports.ConfigurePartitionWithSidebarPage = ConfigurePartitionWithSidebarPage;


/***/ },

/***/ "./src/pages/confirm_installation_page.ts"
/*!************************************************!*\
  !*** ./src/pages/confirm_installation_page.ts ***!
  \************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfirmInstallationPage = void 0;
class ConfirmInstallationPage {
    page;
    continueButton = () => this.page.locator('::-p-aria([name="Confirm and install"][role="button"])');
    constructor(page) {
        this.page = page;
    }
    async confirmAndInstall() {
        await this.continueButton().click();
    }
}
exports.ConfirmInstallationPage = ConfirmInstallationPage;


/***/ },

/***/ "./src/pages/confirm_installation_with_sidebar_page.ts"
/*!*************************************************************!*\
  !*** ./src/pages/confirm_installation_with_sidebar_page.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfirmInstallationWithSidebarPage = void 0;
class ConfirmInstallationWithSidebarPage {
    page;
    continueButton = () => this.page.locator("button::-p-text('Continue')");
    constructor(page) {
        this.page = page;
    }
    async continue() {
        await this.continueButton().click();
    }
}
exports.ConfirmInstallationWithSidebarPage = ConfirmInstallationWithSidebarPage;


/***/ },

/***/ "./src/pages/congratulation_page.ts"
/*!******************************************!*\
  !*** ./src/pages/congratulation_page.ts ***!
  \******************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CongratulationPage = void 0;
class CongratulationPage {
    page;
    congratulationText = () => this.page.locator("::-p-text('Congratulations!')");
    constructor(page) {
        this.page = page;
    }
    async wait(timeout) {
        await this.congratulationText().setTimeout(timeout).wait();
    }
}
exports.CongratulationPage = CongratulationPage;


/***/ },

/***/ "./src/pages/create_user_page.ts"
/*!***************************************!*\
  !*** ./src/pages/create_user_page.ts ***!
  \***************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateFirstUserPage = void 0;
class CreateFirstUserPage {
    page;
    fullNameInput = () => this.page.locator("input#userFullName");
    usernameInput = () => this.page.locator("input#userName");
    passwordInput = () => this.page.locator("input#password");
    passwordConfirmationInput = () => this.page.locator("input#passwordConfirmation");
    acceptButton = () => this.page.locator("button[form='firstUserForm']");
    constructor(page) {
        this.page = page;
    }
    async fillFullName(fullName) {
        await this.fullNameInput().fill(fullName);
    }
    async fillUserName(userName) {
        await this.usernameInput().fill(userName);
    }
    async fillPassword(password) {
        await this.passwordInput().fill(password);
    }
    async fillPasswordConfirmation(password) {
        await this.passwordConfirmationInput().fill(password);
    }
    async accept() {
        await this.acceptButton().click();
    }
}
exports.CreateFirstUserPage = CreateFirstUserPage;


/***/ },

/***/ "./src/pages/dasd_page.ts"
/*!********************************!*\
  !*** ./src/pages/dasd_page.ts ***!
  \********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DasdPage = void 0;
class DasdPage {
    page;
    selectRow = (index) => this.page.locator(`::-p-aria(Select row ${index}[role=\\"checkbox\\"])`);
    actionsForDisk = () => this.page.locator("xpath/descendant-or-self::button[starts-with(@aria-label, 'Actions for')]");
    activateDisk = () => this.page
        .locator('button[role="menuitem"]')
        .filter((item) => item.getAttribute("tabindex") === "0");
    formatDiskButton = () => this.page.locator("::-p-aria(Format[role='button'])");
    formatNowDiskButton = () => this.page.locator("::-p-text(Format now)");
    constructor(page) {
        this.page = page;
    }
    async selectDevice() {
        await this.actionsForDisk().click();
    }
    async activateDevice() {
        await this.activateDisk().click();
    }
    async selectDeviceToFormat() {
        await this.selectRow(0).click();
        await this.formatDiskButton().click();
    }
    async formatNowDevice() {
        await this.formatNowDiskButton().click();
    }
}
exports.DasdPage = DasdPage;


/***/ },

/***/ "./src/pages/encryption_settings_page.ts"
/*!***********************************************!*\
  !*** ./src/pages/encryption_settings_page.ts ***!
  \***********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EncryptionSettingsPage = void 0;
class EncryptionSettingsPage {
    page;
    encryptTheSystemCheckedCheckbox = () => this.page.locator("::-p-aria(Encrypt the system)[type=checkbox]:checked");
    encryptTheSystemNotCheckedCheckbox = () => this.page.locator("::-p-aria(Encrypt the system)[type=checkbox]:not(:checked)");
    passwordInput = () => this.page.locator("#password");
    passwordConfirmationInput = () => this.page.locator("#passwordConfirmation");
    acceptButton = () => this.page.locator("button::-p-text(Accept)");
    constructor(page) {
        this.page = page;
    }
    async markEncryptTheSystem() {
        await this.encryptTheSystemNotCheckedCheckbox().click();
        await this.encryptTheSystemCheckedCheckbox().wait();
    }
    async unmarkEncryptTheSystem() {
        await this.encryptTheSystemCheckedCheckbox().click();
        await this.encryptTheSystemNotCheckedCheckbox().wait();
    }
    async fillPassword(password) {
        await this.passwordInput().fill(password);
    }
    async fillPasswordConfirmation(password) {
        await this.passwordConfirmationInput().fill(password);
    }
    async accept() {
        await this.acceptButton().click();
    }
}
exports.EncryptionSettingsPage = EncryptionSettingsPage;


/***/ },

/***/ "./src/pages/extension_registration_ha_page.ts"
/*!*****************************************************!*\
  !*** ./src/pages/extension_registration_ha_page.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtensionRegistrationHAPage = void 0;
class ExtensionRegistrationHAPage {
    page;
    registerButtonHA = () => this.page.locator("[id*='register-button-sle-ha']");
    codeInput = () => this.page.locator("::-p-aria('Registration code')[type='password']");
    extensionRegisteredText = () => this.page.locator("::-p-text(The extension has been registered)");
    constructor(page) {
        this.page = page;
    }
    async fillCode(code) {
        await this.codeInput().fill(code);
    }
    async register() {
        await this.registerButtonHA().click();
    }
}
exports.ExtensionRegistrationHAPage = ExtensionRegistrationHAPage;


/***/ },

/***/ "./src/pages/extension_registration_phub_page.ts"
/*!*******************************************************!*\
  !*** ./src/pages/extension_registration_phub_page.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtensionRegistrationPHubPage = void 0;
class ExtensionRegistrationPHubPage {
    page;
    registerButtonPHub = () => this.page.locator("[id*='register-button-PackageHub']");
    trustKeyButton = () => this.page.locator("::-p-text(Trust)");
    trustKeyText = () => this.page.locator("::-p-text(Do you want to trust this key?)");
    registeredText = () => this.page.locator("::-p-text(The extension was registered without any registration code)");
    constructor(page) {
        this.page = page;
    }
    async register() {
        await this.registerButtonPHub().click();
    }
    async trustKey() {
        await this.trustKeyButton().click();
    }
}
exports.ExtensionRegistrationPHubPage = ExtensionRegistrationPHubPage;


/***/ },

/***/ "./src/pages/header_page.ts"
/*!**********************************!*\
  !*** ./src/pages/header_page.ts ***!
  \**********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeaderPage = void 0;
class HeaderPage {
    page;
    installationLink = () => this.page.locator("a[href='#/overview']");
    storageLink = () => this.page.locator("a[href='#/storage']");
    constructor(page) {
        this.page = page;
    }
    async goToInstallation() {
        await this.installationLink().click();
    }
    async goToStorage() {
        await this.storageLink().click();
    }
}
exports.HeaderPage = HeaderPage;


/***/ },

/***/ "./src/pages/hostname_page.ts"
/*!************************************!*\
  !*** ./src/pages/hostname_page.ts ***!
  \************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HostnamePage = void 0;
class HostnamePage {
    page;
    useStaticHostnameToggle = () => this.page.locator("input#hostname");
    hostnameInput = () => this.page.locator("::-p-aria(Static hostname)");
    acceptButton = () => this.page.locator("::-p-text(Accept)");
    constructor(page) {
        this.page = page;
    }
    async useStaticHostname() {
        await this.useStaticHostnameToggle().click();
    }
    async fill(hostname) {
        await this.hostnameInput().fill(hostname);
    }
    async accept() {
        await this.acceptButton().click();
    }
}
exports.HostnamePage = HostnamePage;


/***/ },

/***/ "./src/pages/installation_complete_page.ts"
/*!*************************************************!*\
  !*** ./src/pages/installation_complete_page.ts ***!
  \*************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstallationCompletePage = void 0;
class InstallationCompletePage {
    page;
    installationCompleteText = () => this.page.locator("::-p-text('Installation complete')");
    constructor(page) {
        this.page = page;
    }
    async wait(timeout) {
        await this.installationCompleteText().setTimeout(timeout).wait();
    }
}
exports.InstallationCompletePage = InstallationCompletePage;


/***/ },

/***/ "./src/pages/installation_in_progress_page.ts"
/*!****************************************************!*\
  !*** ./src/pages/installation_in_progress_page.ts ***!
  \****************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstallationInProgressPage = void 0;
class InstallationInProgressPage {
    page;
    installationInProgressText = () => this.page.locator("::-p-text(Installation in progress)");
    prepareTheSystemText = () => this.page.locator("::-p-text(Prepare the system)");
    installSoftwareText = () => this.page.locator("::-p-text(Install software)");
    configureTheSystemText = () => this.page.locator("::-p-text(Configure the system)");
    constructor(page) {
        this.page = page;
    }
}
exports.InstallationInProgressPage = InstallationInProgressPage;


/***/ },

/***/ "./src/pages/installation_page.ts"
/*!****************************************!*\
  !*** ./src/pages/installation_page.ts ***!
  \****************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstallationPage = void 0;
class InstallationPage {
    page;
    prepareDisksText = () => this.page.locator("::-p-text(Prepare disks)");
    installingSystemText = () => this.page.locator(`::-p-text(Installing the system, please wait...)`);
    installSoftwareText = () => this.page.locator(`::-p-text(Install software)`);
    configureTheSystemText = () => this.page.locator(`::-p-text(Configure the system)`);
    constructor(page) {
        this.page = page;
    }
}
exports.InstallationPage = InstallationPage;


/***/ },

/***/ "./src/pages/login_as_root_page.ts"
/*!*****************************************!*\
  !*** ./src/pages/login_as_root_page.ts ***!
  \*****************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginAsRootPage = void 0;
class LoginAsRootPage {
    page;
    passwordInput = () => this.page.locator("input#password");
    logInButton = () => this.page.locator("button[type='submit']");
    couldNotLoginText = () => this.page.locator(`::-p-text(Could not log in)`);
    passwordVisibilityButton = () => this.page.locator("[aria-label='Password visibility button']");
    constructor(page) {
        this.page = page;
    }
    async fillPassword(password) {
        await this.passwordInput().fill(password);
    }
    async logIn() {
        await this.logInButton().click();
    }
    async togglePasswordVisibility() {
        await this.passwordVisibilityButton().click();
    }
}
exports.LoginAsRootPage = LoginAsRootPage;


/***/ },

/***/ "./src/pages/network_page.ts"
/*!***********************************!*\
  !*** ./src/pages/network_page.ts ***!
  \***********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NetworkPage = void 0;
class NetworkPage {
    page;
    warningAlertHeading = () => this.page.locator(`::-p-text(Installed system may not have network connections)`);
    actionsForTheWiredConnectionButton = () => this.page.locator("::-p-aria(Actions for Wired Connection)");
    detailsButton = () => this.page.locator("::-p-text(Details)");
    constructor(page) {
        this.page = page;
    }
    async selectConnectionDetails() {
        await this.actionsForTheWiredConnectionButton().click();
        await this.detailsButton().click();
    }
    async verifyWarningAlert() {
        await this.warningAlertHeading().wait();
    }
}
exports.NetworkPage = NetworkPage;


/***/ },

/***/ "./src/pages/network_wired_connection_page.ts"
/*!****************************************************!*\
  !*** ./src/pages/network_wired_connection_page.ts ***!
  \****************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NetworkWiredConnectionPage = void 0;
class NetworkWiredConnectionPage {
    page;
    installationOnlyCheckboxNotChecked = () => this.page.locator(`input[type='checkbox']:not(:checked)[role='switch']`);
    installationOnlyCheckboxChecked = () => this.page.locator(`input[type='checkbox']:checked[role='switch']`);
    constructor(page) {
        this.page = page;
    }
    async selectInstallationOnly() {
        await this.installationOnlyCheckboxNotChecked().click();
        await this.installationOnlyCheckboxChecked().wait();
    }
}
exports.NetworkWiredConnectionPage = NetworkWiredConnectionPage;


/***/ },

/***/ "./src/pages/network_with_sidebar_page.ts"
/*!************************************************!*\
  !*** ./src/pages/network_with_sidebar_page.ts ***!
  \************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NetworkWithSidebarPage = void 0;
class NetworkWithSidebarPage {
    page;
    wiredConnection = () => this.page.locator(`ul[aria-label="Wired connections"] > li`);
    installationOnlyCheckboxNotChecked = () => this.page.locator(`input[type="checkbox"]:not(:checked)[role="switch"]`);
    installationOnlyCheckboxChecked = () => this.page.locator(`input[type="checkbox"]:checked[role="switch"]`);
    warningAlertHeading = () => this.page.locator(`::-p-text(Installed system may not have network connections)`);
    constructor(page) {
        this.page = page;
    }
    async selectWiredConnection() {
        await this.wiredConnection().click();
    }
    async selectInstallationOnly() {
        await this.installationOnlyCheckboxNotChecked().click();
        await this.installationOnlyCheckboxChecked().wait();
    }
    async verifyWarningAlert() {
        await this.warningAlertHeading().wait();
    }
}
exports.NetworkWithSidebarPage = NetworkWithSidebarPage;


/***/ },

/***/ "./src/pages/options_toggle_page.ts"
/*!******************************************!*\
  !*** ./src/pages/options_toggle_page.ts ***!
  \******************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OptionsTogglePage = void 0;
class OptionsTogglePage {
    page;
    moreOptionsButton = () => this.page.locator('::-p-aria(More options[role="button"])');
    optionsToggle = () => this.page.locator("::-p-aria(Options toggle)");
    downloadLogsMenuItem = () => this.page.locator("::-p-aria(Download logs)");
    successAlertHeading = () => this.page.locator(".pf-v6-c-alert.pf-m-success h4::-p-text(Installation logs download)");
    constructor(page) {
        this.page = page;
    }
    async downloadLogs() {
        const toggle = await Promise.any([
            this.moreOptionsButton().waitHandle(),
            this.optionsToggle().waitHandle(),
        ]);
        await toggle.click();
        await this.downloadLogsMenuItem().click();
    }
}
exports.OptionsTogglePage = OptionsTogglePage;


/***/ },

/***/ "./src/pages/overview_page.ts"
/*!************************************!*\
  !*** ./src/pages/overview_page.ts ***!
  \************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OverviewPage = void 0;
class OverviewPage {
    page;
    systemLink = () => this.page.locator("a[href='#/system']");
    localizationLink = () => this.page.locator("a[href='#/l10n']");
    networkLink = () => this.page.locator("a[href='#/network']");
    storageLink = () => this.page.locator("a[href='#/storage']");
    softwareLink = () => this.page.locator("a[href='#/software']");
    usersLink = () => this.page.locator("a[href='#/users']");
    registrationLink = () => this.page.locator("a[href='#/registration']");
    installButton = () => this.page.locator("button::-p-text(Install now)");
    overviewHeading = () => this.page.locator('::-p-aria([name="System Information"][role="heading"])');
    constructor(page) {
        this.page = page;
    }
    async ensureSystemInformationPresent(timeout = 30 * 1000) {
        await this.overviewHeading().setTimeout(timeout).wait();
    }
    async install() {
        await this.installButton().click();
    }
    async goToSystem() {
        await this.systemLink().click();
    }
    async goToLocalization() {
        await this.localizationLink().click();
    }
    async goToNetwork() {
        await this.networkLink().click();
    }
    async goToStorage() {
        await this.storageLink().click();
    }
    async goToSoftware() {
        await this.softwareLink().click();
    }
    async goToAuthentication() {
        await this.usersLink().click();
    }
    async goToRegistration() {
        await this.registrationLink().click();
    }
}
exports.OverviewPage = OverviewPage;


/***/ },

/***/ "./src/pages/overview_with_sidebar_page.ts"
/*!*************************************************!*\
  !*** ./src/pages/overview_with_sidebar_page.ts ***!
  \*************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OverviewWithSidebarPage = void 0;
class OverviewWithSidebarPage {
    page;
    installButton = () => this.page.locator("button::-p-text(Install)");
    overviewHeading = () => this.page.locator('::-p-aria([name="Overview"][role="heading"])');
    storageHeading = () => this.page.locator('::-p-aria([name="Storage"][role="heading"])');
    constructor(page) {
        this.page = page;
    }
    async waitVisible(timeout) {
        await this.overviewHeading().setTimeout(timeout).wait();
        await this.storageHeading().setTimeout(timeout).wait();
    }
    async install() {
        await this.installButton().click();
    }
}
exports.OverviewWithSidebarPage = OverviewWithSidebarPage;


/***/ },

/***/ "./src/pages/product_registration_legacy_page.ts"
/*!*******************************************************!*\
  !*** ./src/pages/product_registration_legacy_page.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomRegistrationLegacyPage = exports.ProductRegistrationLegacyPage = void 0;
class RegistrationBaseLegacyPage {
    page;
    codeInput = () => this.page.locator("::-p-aria(Registration code)[type='password']");
    registerButton = () => this.page.locator("::-p-aria(Register)");
    doNotRegisterButton = () => this.page.locator("::-p-text(Do not register)");
    provideRegistrationCodeNotChecked = () => this.page.locator("input#provide-code:not(:checked)");
    provideRegistrationCodeChecked = () => this.page.locator("input#provide-code:checked");
    infoHasBeenRegisteredText = () => this.page.locator("::-p-text(has been registered with below information)");
    // legacy alert warning for QU to be dropped
    connectionToRegistrationServerFailedText = () => this.page.locator("::-p-text(Connection to registration server failed:)");
    alertWarningUnknownRegistrationCodeText = () => this.page.locator("::-p-text(Unknown Registration Code.)");
    alertWarningEnterARegistrationCodeText = () => this.page.locator("::-p-text(Enter a registration code)");
    alertWarningNetworkErrorText = () => this.page.locator("::-p-text(Network error)");
    constructor(page) {
        this.page = page;
    }
    async checkProvideRegistrationCode() {
        const checkbox = await this.provideRegistrationCodeNotChecked().waitHandle();
        await checkbox.scrollIntoView();
        // Wait for checkbox to be truly interactive
        await checkbox.evaluate((el) => el.offsetHeight); // Force reflow
        await checkbox.click();
        await this.provideRegistrationCodeChecked().wait();
    }
    async uncheckProvideRegistrationCode() {
        await this.provideRegistrationCodeChecked().click();
    }
    async fillCode(code) {
        await this.codeInput().fill(code);
    }
    async register() {
        // prefer explicit wait over hard delay.
        await this.registerButton().setTimeout(40000).click();
    }
    async doNotRegister() {
        // prefer explicit wait over hard delay.
        await this.doNotRegisterButton().click({ delay: 1000 });
    }
    async ensureProvideRegistrationCodeUnchecked() {
        const checkbox = await this.provideRegistrationCodeNotChecked().waitHandle();
        // Wait for checkbox to be truly interactive
        await checkbox.evaluate((el) => el.offsetHeight); // Force reflow
        await this.provideRegistrationCodeNotChecked().wait();
    }
}
function CustomRegistrable(Base) {
    return class extends Base {
        registrationServerButton = () => this.page.locator("::-p-aria(Registration server)");
        registrationServerCustomOption = () => this.page.locator("::-p-aria(Custom Register using a custom registration server)");
        registrationServerSCCOption = () => this.page.locator("::-p-aria(SUSE Customer Center (SCC) Register using SUSE server)");
        serverUrlTextbox = () => this.page.locator("::-p-aria(Server URL)[type='text']");
        provideRegistrationCodeCheckbox = () => this.page.locator("::-p-aria(Provide registration code)");
        async provideRegistrationCode() {
            await this.provideRegistrationCodeCheckbox().click();
        }
        async selectCustomRegistrationServer() {
            await this.registrationServerButton().click();
            await this.registrationServerCustomOption().wait();
            await this.registrationServerCustomOption().click();
        }
        async selectSCCRegistrationServer() {
            await this.registrationServerButton().click();
            await this.registrationServerSCCOption().click();
        }
        async fillServerUrl(url, timeout = 30 * 1000) {
            await this.serverUrlTextbox().setTimeout(timeout).fill(url);
        }
    };
}
class ProductRegistrationLegacyPage extends RegistrationBaseLegacyPage {
}
exports.ProductRegistrationLegacyPage = ProductRegistrationLegacyPage;
class CustomRegistrationLegacyPage extends CustomRegistrable(RegistrationBaseLegacyPage) {
}
exports.CustomRegistrationLegacyPage = CustomRegistrationLegacyPage;


/***/ },

/***/ "./src/pages/registration_page.ts"
/*!****************************************!*\
  !*** ./src/pages/registration_page.ts ***!
  \****************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegistrationCustomPage = exports.RegistrationSCCPage = void 0;
class RegistrationBasePage {
    page;
    registerButton = () => this.page.locator("::-p-aria(Register)");
    registrationServerButton = () => this.page.locator("::-p-aria(Registration server)");
    infoHasBeenRegisteredText = () => this.page.locator("::-p-text(has been registered with below information)");
    alertWarningUnknownRegistrationCodeText = () => this.page.locator("::-p-text(Unknown Registration Code.)");
    alertWarningEnterARegistrationCodeText = () => this.page.locator("::-p-text(Please provide Registration Code.)");
    alertWarningNetworkErrorText = () => this.page.locator("::-p-text(Network error)");
    constructor(page) {
        this.page = page;
    }
    async register() {
        await this.registerButton().click();
    }
}
function SCCSelectable(Base) {
    return class extends Base {
        codeInput = () => this.page.locator("::-p-aria('Registration code')[type='password']");
        registrationServerSCCOption = () => this.page.locator("::-p-aria(SUSE Customer Center (SCC) Register using SUSE server)");
        async fillCode(code) {
            await this.codeInput().fill(code);
        }
        async selectSCCRegistrationServer() {
            await this.registrationServerButton().click();
            await this.registrationServerSCCOption().click();
        }
    };
}
function CustomSelectable(Base) {
    return class extends Base {
        codeInput = () => this.page.locator("::-p-aria('Registration code (optional)')[type='password']");
        serverUrlTextbox = () => this.page.locator("::-p-aria(Server URL)[type='text']");
        registrationServerCustomOption = () => this.page.locator("::-p-aria(Custom Register using a custom registration server)");
        async fillCode(code) {
            await this.codeInput().fill(code);
        }
        async selectCustomRegistrationServer() {
            await this.registrationServerButton().click();
            await this.registrationServerCustomOption().wait();
            await this.registrationServerCustomOption().click();
        }
        async fillServerUrl(url) {
            await this.serverUrlTextbox().fill(url);
        }
    };
}
class RegistrationSCCPage extends SCCSelectable(RegistrationBasePage) {
}
exports.RegistrationSCCPage = RegistrationSCCPage;
class RegistrationCustomPage extends CustomSelectable(RegistrationBasePage) {
}
exports.RegistrationCustomPage = RegistrationCustomPage;


/***/ },

/***/ "./src/pages/root_authentication_methods.ts"
/*!**************************************************!*\
  !*** ./src/pages/root_authentication_methods.ts ***!
  \**************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetARootPasswordPage = void 0;
class SetARootPasswordPage {
    page;
    acceptText = () => this.page.locator("button::-p-text(Accept)");
    confirmText = () => this.page.locator("button::-p-text(Confirm)");
    passwordInput = () => this.page.locator("input#password");
    passwordConfirmationInput = () => this.page.locator("input#passwordConfirmation");
    alertPasswordLess8Characters = () => this.page.locator("::-p-text(The password is shorter than 8 characters)");
    alertPasswordIsWeak = () => this.page.locator("::-p-text(The password is weak)");
    alertPasswordFailDictionaryCheck = () => this.page.locator("::-p-text(it is too simplistic/systematic)");
    usePasswordToggle = () => this.page.locator("::-p-text(Use password)");
    constructor(page) {
        this.page = page;
    }
    async accept() {
        await this.acceptText().click();
    }
    async confirm() {
        await this.confirmText().click();
    }
    async fillPassword(password) {
        await this.passwordInput().fill(password);
    }
    async fillPasswordConfirmation(password) {
        await this.passwordConfirmationInput().fill(password);
    }
    async usePassword() {
        await this.usePasswordToggle().click();
    }
}
exports.SetARootPasswordPage = SetARootPasswordPage;


/***/ },

/***/ "./src/pages/sidebar_page.ts"
/*!***********************************!*\
  !*** ./src/pages/sidebar_page.ts ***!
  \***********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SidebarWithRegistrationPage = exports.SidebarPage = void 0;
class SidebarPage {
    page;
    overviewLink = () => this.page.locator("a[href='#/overview']");
    hostnameLink = () => this.page.locator("a[href='#/hostname']");
    localizationLink = () => this.page.locator("a[href='#/l10n']");
    networkLink = () => this.page.locator("a[href='#/network']");
    storageLink = () => this.page.locator("a[href='#/storage']");
    softwareLink = () => this.page.locator("a[href='#/software']");
    usersLink = () => this.page.locator("a[href='#/users']");
    constructor(page) {
        this.page = page;
    }
    async goToOverview() {
        await this.overviewLink().click();
    }
    async goToHostname() {
        await this.hostnameLink().click();
    }
    async goToLocalization() {
        await this.localizationLink().click();
    }
    async goToNetwork() {
        await this.networkLink().click();
    }
    async goToStorage() {
        await this.storageLink().click();
    }
    async goToSoftware() {
        await this.softwareLink().click();
    }
    async goToUsers() {
        await this.usersLink().click();
    }
}
exports.SidebarPage = SidebarPage;
function RegistrationNavigable(Base) {
    return class extends Base {
        registrationLink = () => this.page.locator("a[href='#/registration']");
        async goToRegistration() {
            await this.registrationLink().click();
        }
    };
}
class SidebarWithRegistrationPage extends RegistrationNavigable(SidebarPage) {
}
exports.SidebarWithRegistrationPage = SidebarWithRegistrationPage;


/***/ },

/***/ "./src/pages/software_desktop_selection_page.ts"
/*!******************************************************!*\
  !*** ./src/pages/software_desktop_selection_page.ts ***!
  \******************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoftwareDesktopSelectionPage = void 0;
class SoftwareDesktopSelectionPage {
    page;
    desktopCheckbox = (pattern) => this.page.locator(`::-p-aria(${pattern}[role="checkbox"])`);
    acceptButton = () => this.page.locator("::-p-aria(Accept)");
    constructor(page) {
        this.page = page;
    }
    async select(desktop) {
        await this.desktopCheckbox(desktop).click();
    }
    async accept() {
        await this.acceptButton().click();
    }
}
exports.SoftwareDesktopSelectionPage = SoftwareDesktopSelectionPage;


/***/ },

/***/ "./src/pages/software_legacy_page.ts"
/*!*******************************************!*\
  !*** ./src/pages/software_legacy_page.ts ***!
  \*******************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoftwareLegacyPage = void 0;
class SoftwareLegacyPage {
    page;
    changeSelectionButton = () => this.page.locator("::-p-text(Change selection)");
    constructor(page) {
        this.page = page;
    }
    async changeSelection() {
        await this.changeSelectionButton().click();
    }
}
exports.SoftwareLegacyPage = SoftwareLegacyPage;


/***/ },

/***/ "./src/pages/software_page.ts"
/*!************************************!*\
  !*** ./src/pages/software_page.ts ***!
  \************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoftwarePage = void 0;
class SoftwarePage {
    page;
    changePatternsLink = () => this.page.locator("a[href='#/software/patterns/select']");
    selectADesktopLink = () => this.page.locator("a[href='#/software/desktops/select']");
    constructor(page) {
        this.page = page;
    }
    async changePatterns() {
        await this.changePatternsLink().click();
    }
    async selectADesktop() {
        await this.selectADesktopLink().click();
    }
}
exports.SoftwarePage = SoftwarePage;


/***/ },

/***/ "./src/pages/software_patterns_selection_legacy_page.ts"
/*!**************************************************************!*\
  !*** ./src/pages/software_patterns_selection_legacy_page.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoftwarePatternsSelectionLegacyPage = void 0;
class SoftwarePatternsSelectionLegacyPage {
    page;
    patternCheckboxNotChecked = (pattern) => this.page.locator(`input[type=checkbox]:not(:checked)[aria-labelledby*=${pattern}-title]`);
    patternCheckboxChecked = (pattern) => this.page.locator(`input[type=checkbox]:checked[aria-labelledby*=${pattern}-title]`);
    closeButton = () => this.page.locator("::-p-text(Close)");
    constructor(page) {
        this.page = page;
    }
    async selectPattern(pattern) {
        const checkbox = await this.patternCheckboxNotChecked(pattern).waitHandle();
        await checkbox.scrollIntoView();
        await this.patternCheckboxNotChecked(pattern).click();
        await this.patternCheckboxChecked(pattern).wait();
    }
    async close() {
        await this.closeButton().click();
    }
}
exports.SoftwarePatternsSelectionLegacyPage = SoftwarePatternsSelectionLegacyPage;


/***/ },

/***/ "./src/pages/software_patterns_selection_page.ts"
/*!*******************************************************!*\
  !*** ./src/pages/software_patterns_selection_page.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoftwarePatternsSelectionPage = void 0;
class SoftwarePatternsSelectionPage {
    page;
    patternCheckbox = (pattern) => this.page.locator(`::-p-aria(${pattern}[role="checkbox"])`);
    acceptButton = () => this.page.locator("::-p-aria(Accept)");
    constructor(page) {
        this.page = page;
    }
    async select(pattern) {
        await this.patternCheckbox(pattern).click();
    }
    async accept() {
        await this.acceptButton().click();
    }
}
exports.SoftwarePatternsSelectionPage = SoftwarePatternsSelectionPage;


/***/ },

/***/ "./src/pages/storage_activate_multipath_page.ts"
/*!******************************************************!*\
  !*** ./src/pages/storage_activate_multipath_page.ts ***!
  \******************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageActivateMultipathPage = void 0;
class StorageActivateMultipathPage {
    page;
    multipathText = () => this.page.locator("::-p-text(The system seems to have multipath hardware)");
    yesButton = () => this.page.locator('div[role="dialog"][aria-label="Question"] button::-p-text(Yes)');
    constructor(page) {
        this.page = page;
    }
    async yes() {
        await this.yesButton().click();
    }
}
exports.StorageActivateMultipathPage = StorageActivateMultipathPage;


/***/ },

/***/ "./src/pages/storage_change_disk_page.ts"
/*!***********************************************!*\
  !*** ./src/pages/storage_change_disk_page.ts ***!
  \***********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageChangeDiskPage = void 0;
class StorageChangeDiskPage {
    page;
    confirmButton = () => this.page.locator("button::-p-text(Confirm)");
    diskTableSelector;
    constructor(page) {
        this.page = page;
        this.diskTableSelector = 'div[aria-modal="true"] table[data-type="agama/expandable-selector"]';
    }
    async confirm() {
        await this.confirmButton().click();
    }
}
exports.StorageChangeDiskPage = StorageChangeDiskPage;


/***/ },

/***/ "./src/pages/storage_page.ts"
/*!***********************************!*\
  !*** ./src/pages/storage_page.ts ***!
  \***********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoragePage = void 0;
class StoragePage {
    page;
    changeDiskButton = () => this.page.locator('::-p-aria([name="Change"][role="button"])');
    selectADiskToInstallTheSystemButton = () => this.page.locator("::-p-text(Select a disk to install the system)");
    otherOptionsButton = () => this.page.locator("::-p-text(Other options)");
    storageAllocationWarningText = () => this.page.locator("::-p-text(It is not possible to allocate space for the boot partition)");
    resetToDefaultsButton = () => this.page.locator("::-p-text(Reset to defaults)");
    expandPartitionsButton = () => this.page.locator("::-p-text(New partitions will be created)");
    editRootPartitionMenu = () => this.page.locator("button[aria-label='Edit /'][role='menuitem']");
    constructor(page) {
        this.page = page;
    }
    async selectChangeDisk() {
        await this.changeDiskButton().click();
    }
    async selectADiskToInstallTheSystem() {
        await this.selectADiskToInstallTheSystemButton().click();
    }
    async otherOptions() {
        await this.otherOptionsButton().click();
    }
    async resetToDefault() {
        await this.resetToDefaultsButton().click();
    }
    async expandPartitions() {
        await this.expandPartitionsButton().click();
    }
    async editRootPartition() {
        await this.editRootPartitionMenu().click();
    }
}
exports.StoragePage = StoragePage;


/***/ },

/***/ "./src/pages/storage_result_page.ts"
/*!******************************************!*\
  !*** ./src/pages/storage_result_page.ts ***!
  \******************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageResultPage = void 0;
class StorageResultPage {
    page;
    destructiveActionsListWithSidebar = () => this.page.locator("::-p-text(Check)");
    destructiveActionsList = () => this.page.locator("::-p-text(Actions)");
    destructiveActionText = (name) => this.page.locator(`::-p-text(Delete ${name})`);
    constructor(page) {
        this.page = page;
    }
    async scrollToDestructiveActionsList() {
        (await this.destructiveActionsList().waitHandle()).scrollIntoView();
    }
    async expandDestructiveActionsList() {
        await this.destructiveActionsListWithSidebar().click();
    }
}
exports.StorageResultPage = StorageResultPage;


/***/ },

/***/ "./src/pages/storage_settings_change_disk_page.ts"
/*!********************************************************!*\
  !*** ./src/pages/storage_settings_change_disk_page.ts ***!
  \********************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageSettingsChangeDiskPage = void 0;
class StorageSettingsChangeDiskPage {
    page;
    changeToButton = () => this.page.locator("button::-p-text(Change to)");
    diskTableSelector;
    constructor(page) {
        this.page = page;
        this.diskTableSelector = 'div[aria-modal="true"] table[data-type="agama/expandable-selector"]';
    }
    async changeTo() {
        await this.changeToButton().click();
    }
}
exports.StorageSettingsChangeDiskPage = StorageSettingsChangeDiskPage;


/***/ },

/***/ "./src/pages/storage_settings_page.ts"
/*!********************************************!*\
  !*** ./src/pages/storage_settings_page.ts ***!
  \********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageSettingsPage = void 0;
class StorageSettingsPage {
    page;
    selectMoreDevicesButton = () => this.page.locator("::-p-text(More devices)");
    useDiskButton = () => this.page.locator("::-p-text(Use disk)");
    settingsText = () => this.page.locator("::-p-text(Settings)");
    selectDeviceToInstallButton = () => this.page.locator("::-p-text(Change the device to install the system)");
    selectDiskToInstallButton = () => this.page.locator("::-p-text(Change the disk to install the system)");
    editEncryptionButton = () => this.page.locator("a[href='#/storage/encryption/edit']");
    installationDevicesTab = () => this.page.locator("::-p-text(Installation devices)");
    encryptionTab = () => this.page.locator("::-p-text(Encryption)");
    changeEncryptionLink = () => this.page.locator('::-p-aria([name="Change"][role="link"])');
    encryptionIsEnabledText = () => this.page.locator("::-p-text(Encryption is enabled)");
    encryptionIsDisabledText = () => this.page.locator("::-p-text(Encryption is disabled)");
    manageDasdLink = () => this.page.locator("::-p-text(Manage DASD devices)");
    ActivateZfcpLink = () => this.page.locator("::-p-text(Activate zFCP disks)");
    addLvmVolumeLink = () => this.page.locator("::-p-text(Add LVM volume group)");
    expandPartitionsButton = () => this.page.locator("::-p-text(New partitions will be created)");
    optionForRoot = () => this.page.locator("::-p-aria(Options for partition /)");
    editRootPartitionMenu = () => this.page.locator("::-p-aria(Edit /[role='menuitem'])");
    threeDotsButton = () => this.page.locator("button:has(svg.agm-three-dots-icon):not([aria-label])");
    storageAllocationWarningText = () => this.page.locator("::-p-text(It is not possible to allocate space for the boot partition)");
    resetToDefaultsButton = () => this.page.locator("::-p-text(Reset to defaults)");
    constructor(page) {
        this.page = page;
    }
    async ensureStorageSettingsPresent() {
        await this.settingsText().wait();
    }
    async selectUsedDisk() {
        await this.useDiskButton().click();
    }
    async changeTheDeviceToInstallTheSystem() {
        const element = await Promise.any([
            this.selectDeviceToInstallButton().waitHandle(),
            this.selectDiskToInstallButton().waitHandle(),
        ]);
        await element.click();
    }
    async selectMoreDevices() {
        await this.selectMoreDevicesButton().click();
    }
    async editEncryption() {
        await this.editEncryptionButton().click();
    }
    async selectInstallationDevices() {
        await this.installationDevicesTab().click();
    }
    async selectEncryption() {
        await this.encryptionTab().click();
    }
    async changeEncryption() {
        await this.changeEncryptionLink().click();
    }
    async manageDasd() {
        await this.manageDasdLink().click();
    }
    async activateZfcpDisks() {
        await this.ActivateZfcpLink().click();
    }
    async addLvmVolumeGroup() {
        await this.addLvmVolumeLink().click();
    }
    async waitForElement(element, timeout) {
        await this.page.locator(element).setTimeout(timeout).wait();
    }
    async expandPartitions() {
        await this.expandPartitionsButton().click();
    }
    async clickOptionForRoot() {
        await this.optionForRoot().click();
    }
    async editRootPartition() {
        await this.editRootPartitionMenu().click();
    }
    async moreOptions() {
        await this.threeDotsButton().click();
    }
    async resetToDefault(timeout = 30 * 1000) {
        await this.resetToDefaultsButton().setTimeout(timeout).click();
    }
}
exports.StorageSettingsPage = StorageSettingsPage;


/***/ },

/***/ "./src/pages/storage_warning_out_of_sync_page.ts"
/*!*******************************************************!*\
  !*** ./src/pages/storage_warning_out_of_sync_page.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageWarningOutOfSyncPage = void 0;
class StorageWarningOutOfSyncPage {
    page;
    configurationOutOfSyncWarningAlert = () => this.page.locator("::-p-text(Configuration out of sync)");
    reloadButton = () => this.page.locator("::-p-text(Reload now)");
    constructor(page) {
        this.page = page;
    }
    async reload() {
        await this.reloadButton().setTimeout(60000).click();
    }
}
exports.StorageWarningOutOfSyncPage = StorageWarningOutOfSyncPage;


/***/ },

/***/ "./src/pages/storage_zfcp_activate_controllers_page.ts"
/*!*************************************************************!*\
  !*** ./src/pages/storage_zfcp_activate_controllers_page.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageZfcpActivateControllersPage = void 0;
class StorageZfcpActivateControllersPage {
    page;
    acceptButton = () => this.page.locator("::-p-aria('Accept')");
    multipathText = () => this.page.locator("::-p-text(The system seems to have multipath hardware)");
    controllerCheckbox = (controllerId) => this.page.locator(`::-p-aria(${controllerId})`);
    allControllersActivatedText = () => this.page.locator("::-p-text('All the available')");
    constructor(page) {
        this.page = page;
    }
    async accept() {
        await this.acceptButton().click();
    }
    async select(controllerIds) {
        for (const controllerId of controllerIds) {
            await this.controllerCheckbox(controllerId).click();
        }
    }
}
exports.StorageZfcpActivateControllersPage = StorageZfcpActivateControllersPage;


/***/ },

/***/ "./src/pages/system_page.ts"
/*!**********************************!*\
  !*** ./src/pages/system_page.ts ***!
  \**********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemPage = void 0;
class SystemPage {
    page;
    hostnameModeButton = () => this.page.locator("::-p-aria(Hostname Mode[role='button'])");
    modeStaticOption = () => this.page.locator("::-p-aria(Static Set manually[role='option'])");
    nameTextbox = () => this.page.locator("::-p-aria(Name[role='textbox'])");
    ntpModeButton = () => this.page.locator("::-p-aria(Time Synchronization Servers Mode[role='button'])");
    customModeOption = () => this.page.locator("::-p-aria(Custom Set NTP servers manually[role='option'])");
    serverAddressesTextbox = () => this.page.locator("::-p-aria(Server addresses[role='textbox'])");
    acceptButton = () => this.page.locator("::-p-aria(Accept[role='button'])");
    constructor(page) {
        this.page = page;
    }
    async selectStaticMode() {
        await this.hostnameModeButton().click();
        await this.modeStaticOption().click();
    }
    async fill(hostname) {
        await this.nameTextbox().fill(hostname);
    }
    async selectCustomMode() {
        await this.ntpModeButton().click();
        await this.customModeOption().click();
    }
    async addServerAddress(address) {
        const inputElement = this.serverAddressesTextbox();
        const inputHandle = await this.serverAddressesTextbox().waitHandle();
        await inputElement.fill(address);
        await inputHandle.press("Enter");
    }
    async accept() {
        await this.acceptButton().click();
    }
}
exports.SystemPage = SystemPage;


/***/ },

/***/ "./src/pages/trust_registration_certificate_page.ts"
/*!**********************************************************!*\
  !*** ./src/pages/trust_registration_certificate_page.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrustRegistrationCertificatePage = void 0;
class TrustRegistrationCertificatePage {
    page;
    titleText = () => this.page.locator("::-p-text(Registration certificate)");
    questionText = () => this.page.locator("::-p-text(Do you want to trust it and register the product?)");
    urlText = (expectedUrl) => this.page.locator(`xpath=//text()[contains(., "${expectedUrl}")]/..`);
    issuerText = () => this.page.locator("::-p-text(RMT Certificate Authority)");
    trustCertificateButton = () => this.page.locator("::-p-text(Trust)");
    constructor(page) {
        this.page = page;
    }
    async trustCertificate() {
        await this.trustCertificateButton().click();
    }
}
exports.TrustRegistrationCertificatePage = TrustRegistrationCertificatePage;


/***/ },

/***/ "./src/pages/users_page.ts"
/*!*********************************!*\
  !*** ./src/pages/users_page.ts ***!
  \*********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersPage = void 0;
class UsersPage {
    page;
    firstUserLink = () => this.page.locator("a[href='#/users/first']");
    editRootUserButton = () => this.page.locator("a[href='#/users/root/edit']");
    defineTheFirstUserButton = () => this.page.locator("a[href='#/users/first/edit']");
    constructor(page) {
        this.page = page;
    }
    async defineAUserNow() {
        await this.firstUserLink().click();
    }
    async editRootUser() {
        await this.editRootUserButton().click();
    }
    async defineTheFirstUser() {
        await this.defineTheFirstUserButton().click();
    }
}
exports.UsersPage = UsersPage;


/***/ },

/***/ "./src/pages/zfcp_page.ts"
/*!********************************!*\
  !*** ./src/pages/zfcp_page.ts ***!
  \********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZfcpPage = void 0;
class ZfcpPage {
    page;
    faDisk = () => this.page.locator("tbody > tr:first-child > td:last-child > button#zfcp_controllers_actions");
    fcDisk = () => this.page.locator("tbody > tr:last-child > td:last-child > button#zfcp_controllers_actions");
    activateDisk = () => this.page.locator("::-p-aria(Activate[role='menuitem'])");
    zfcpDisk = (channelId) => this.page.locator(`xpath=//tr[contains(., "${channelId}")]`);
    backButton = () => this.page.locator("button::-p-text(Back)");
    enableMultipath = () => this.page.locator("::-p-text('Yes')");
    constructor(page) {
        this.page = page;
    }
    async activateDevice(channelId) {
        const rowActions = channelId === "0.0.fa00" ? this.faDisk() : this.fcDisk();
        await rowActions.click();
        await this.activateDisk().click();
        await this.zfcpDisk(channelId).setTimeout(90000).wait();
    }
    async activateMultipath() {
        await this.enableMultipath().setTimeout(40000).click();
    }
    async back() {
        await this.backButton().click();
    }
}
exports.ZfcpPage = ZfcpPage;


/***/ },

/***/ "./src/test_phub.ts"
/*!**************************!*\
  !*** ./src/test_phub.ts ***!
  \**************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const cmdline_1 = __webpack_require__(/*! ./lib/cmdline */ "./src/lib/cmdline.ts");
const helpers_1 = __webpack_require__(/*! ./lib/helpers */ "./src/lib/helpers.ts");
const login_1 = __webpack_require__(/*! ./checks/login */ "./src/checks/login.ts");
const product_strategy_factory_1 = __webpack_require__(/*! ./lib/product_strategy_factory */ "./src/lib/product_strategy_factory.ts");
const options = (0, cmdline_1.parse)((cmd) => cmd
    .option("--register-package-hub", "Registration for PackageHub")
    .option("--patterns <pattern>...", "Comma-separated list of patterns", cmdline_1.commaSeparatedList));
(0, helpers_1.test_init)(options);
const testStrategy = product_strategy_factory_1.ProductStrategyFactory.create(options.productVersion, options.agamaWebUiPackageVersion);
(0, login_1.logIn)(options.password);
testStrategy.enterExtensionRegistrationPHub();
testStrategy.changePatterns(options.patterns);
testStrategy.verifyStorageOutOfSync?.();
testStrategy.performInstallation();
testStrategy.finishInstallation();


/***/ },

/***/ "./src/variants/development_release_strategy.ts"
/*!******************************************************!*\
  !*** ./src/variants/development_release_strategy.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevelopmentReleaseStrategy = void 0;
const production_release_strategy_1 = __webpack_require__(/*! ./production_release_strategy */ "./src/variants/production_release_strategy.ts");
class DevelopmentReleaseStrategy extends production_release_strategy_1.ProductionReleaseStrategy {
}
exports.DevelopmentReleaseStrategy = DevelopmentReleaseStrategy;


/***/ },

/***/ "./src/variants/maintenance_release_strategy.ts"
/*!******************************************************!*\
  !*** ./src/variants/maintenance_release_strategy.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaintenanceReleaseStrategy = void 0;
const system_1 = __webpack_require__(/*! ../checks/system */ "./src/checks/system.ts");
const registration_1 = __webpack_require__(/*! ../checks/registration */ "./src/checks/registration.ts");
const encryption_1 = __webpack_require__(/*! ../checks/encryption */ "./src/checks/encryption.ts");
const authentication_1 = __webpack_require__(/*! ../checks/authentication */ "./src/checks/authentication.ts");
const installation_1 = __webpack_require__(/*! ../checks/installation */ "./src/checks/installation.ts");
const login_1 = __webpack_require__(/*! ../checks/login */ "./src/checks/login.ts");
const storage_change_device_to_install_1 = __webpack_require__(/*! ../checks/storage_change_device_to_install */ "./src/checks/storage_change_device_to_install.ts");
const storage_zfcp_1 = __webpack_require__(/*! ../checks/storage_zfcp */ "./src/checks/storage_zfcp.ts");
const software_1 = __webpack_require__(/*! ../checks/software */ "./src/checks/software.ts");
const storage_change_root_partition_1 = __webpack_require__(/*! ../checks/storage_change_root_partition */ "./src/checks/storage_change_root_partition.ts");
const overview_1 = __webpack_require__(/*! ../checks/overview */ "./src/checks/overview.ts");
const storage_select_installation_device_1 = __webpack_require__(/*! ../checks/storage_select_installation_device */ "./src/checks/storage_select_installation_device.ts");
const network_1 = __webpack_require__(/*! ../checks/network */ "./src/checks/network.ts");
const storage_result_destructive_actions_planned_1 = __webpack_require__(/*! ../checks/storage_result_destructive_actions_planned */ "./src/checks/storage_result_destructive_actions_planned.ts");
const storage_out_of_sync_1 = __webpack_require__(/*! ../checks/storage_out_of_sync */ "./src/checks/storage_out_of_sync.ts");
const download_logs_1 = __webpack_require__(/*! ../checks/download_logs */ "./src/checks/download_logs.ts");
class MaintenanceReleaseStrategy {
    setStaticHostname(hostname) {
        (0, system_1.setPermanentHostnameWithSidebar)(hostname);
    }
    verifyRegistrationWarniningAlerts(use_custom, url) {
        (0, registration_1.verifyRegistrationWarniningAlertsWithSidebar)(use_custom, url);
    }
    enterProductRegistration({ use_custom, code, provide_code, url }) {
        (0, registration_1.enterProductRegistrationWithSidebar)({ use_custom, code, provide_code, url });
    }
    enableEncryption(password) {
        (0, encryption_1.enableEncryptionWithSidebar)(password);
    }
    verifyEncryptionEnabled() {
        (0, encryption_1.verifyEncryptionEnabledWithSidebar)();
    }
    disableEncryption() {
        (0, encryption_1.disableEncryptionWithSidebar)();
    }
    enterExtensionRegistrationHA(code) {
        (0, registration_1.enterExtensionRegistrationHAWithSidebar)(code);
    }
    enterExtensionRegistrationPHub() {
        (0, registration_1.enterExtensionRegistrationPHubWithSidebar)();
    }
    createFirstUser(password) {
        (0, authentication_1.createFirstUserWithSidebar)(password);
    }
    editRootUser(password) {
        (0, authentication_1.editRootUserWithSidebar)(password);
    }
    checkInstallation() {
        (0, installation_1.checkInstallationWithSidebar)();
    }
    performInstallation() {
        (0, installation_1.performInstallationWithSidebar)();
    }
    logInWithIncorrectPassword() {
        (0, login_1.logInWithIncorrectPasswordWithSidebar)();
    }
    finishInstallation() {
        (0, installation_1.finishInstallationCongratulation)();
    }
    changeDeviceToInstallTheSystem() {
        (0, storage_change_device_to_install_1.changeDeviceToInstallTheSystemWithSidebar)();
    }
    verifyPasswordStrength() {
        (0, authentication_1.verifyPasswordStrengthWithSidebar)();
    }
    prepareZfcpStorage() {
        (0, storage_zfcp_1.prepareZfcpStorageWithSidebar)();
    }
    prepareDasdStorage() { }
    changePatterns(patterns) {
        (0, software_1.selectPatternsWithSidebar)(patterns);
    }
    changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize() {
        (0, storage_change_root_partition_1.changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSizeWithSidebar)();
    }
    selectMoreDevices() {
        (0, storage_select_installation_device_1.selectMoreDevicesWithSidebar)();
    }
    setOnlyInstallationNetwork() {
        (0, network_1.setOnlyInstallationNetworkWithSidebar)();
    }
    verifyDecryptDestructiveActions(destructiveActions) {
        (0, storage_result_destructive_actions_planned_1.verifyDecryptDestructiveActionsWithSidebar)(destructiveActions);
    }
    verifyStorageOutOfSync() {
        (0, storage_out_of_sync_1.verifyStorageOutOfSyncWithSidebar)();
    }
    ensureLandingOnOverview() {
        (0, overview_1.ensureLandingOnOverviewWithSidebar)();
    }
    downloadLogs() {
        (0, download_logs_1.downloadLogsWithSidebar)();
    }
}
exports.MaintenanceReleaseStrategy = MaintenanceReleaseStrategy;


/***/ },

/***/ "./src/variants/production_release_strategy.ts"
/*!*****************************************************!*\
  !*** ./src/variants/production_release_strategy.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductionReleaseStrategy = void 0;
const system_1 = __webpack_require__(/*! ../checks/system */ "./src/checks/system.ts");
const registration_1 = __webpack_require__(/*! ../checks/registration */ "./src/checks/registration.ts");
const encryption_1 = __webpack_require__(/*! ../checks/encryption */ "./src/checks/encryption.ts");
const authentication_1 = __webpack_require__(/*! ../checks/authentication */ "./src/checks/authentication.ts");
const installation_1 = __webpack_require__(/*! ../checks/installation */ "./src/checks/installation.ts");
const login_1 = __webpack_require__(/*! ../checks/login */ "./src/checks/login.ts");
const storage_change_device_to_install_1 = __webpack_require__(/*! ../checks/storage_change_device_to_install */ "./src/checks/storage_change_device_to_install.ts");
const storage_dasd_1 = __webpack_require__(/*! ../checks/storage_dasd */ "./src/checks/storage_dasd.ts");
const software_1 = __webpack_require__(/*! ../checks/software */ "./src/checks/software.ts");
const storage_change_root_partition_1 = __webpack_require__(/*! ../checks/storage_change_root_partition */ "./src/checks/storage_change_root_partition.ts");
const storage_zfcp_1 = __webpack_require__(/*! ../checks/storage_zfcp */ "./src/checks/storage_zfcp.ts");
const overview_1 = __webpack_require__(/*! ../checks/overview */ "./src/checks/overview.ts");
const storage_select_installation_device_1 = __webpack_require__(/*! ../checks/storage_select_installation_device */ "./src/checks/storage_select_installation_device.ts");
const network_1 = __webpack_require__(/*! ../checks/network */ "./src/checks/network.ts");
const storage_result_destructive_actions_planned_1 = __webpack_require__(/*! ../checks/storage_result_destructive_actions_planned */ "./src/checks/storage_result_destructive_actions_planned.ts");
const storage_out_of_sync_1 = __webpack_require__(/*! ../checks/storage_out_of_sync */ "./src/checks/storage_out_of_sync.ts");
const download_logs_1 = __webpack_require__(/*! ../checks/download_logs */ "./src/checks/download_logs.ts");
class ProductionReleaseStrategy {
    setStaticHostname(hostname) {
        (0, system_1.setStaticHostname)(hostname);
    }
    verifyRegistrationWarniningAlerts() {
        (0, registration_1.verifyRegistrationWarniningAlerts)();
    }
    enterProductRegistration({ use_custom, code, provide_code, url }) {
        (0, registration_1.enterProductRegistration)({ use_custom, code, provide_code, url });
    }
    enableEncryption(password) {
        (0, encryption_1.enableEncryption)(password);
    }
    verifyEncryptionEnabled() {
        (0, encryption_1.verifyEncryptionEnabled)();
    }
    disableEncryption() {
        (0, encryption_1.disableEncryption)();
    }
    enterExtensionRegistrationHA(code) {
        (0, registration_1.enterExtensionRegistrationHA)(code);
    }
    enterExtensionRegistrationPHub() {
        (0, registration_1.enterExtensionRegistrationPHub)();
    }
    createFirstUser(password) {
        (0, authentication_1.createAdministratorAccount)(password);
    }
    editRootUser(password) {
        (0, authentication_1.editRootUserLoginMethod)(password);
    }
    performInstallation() {
        (0, installation_1.performInstallation)();
    }
    logInWithIncorrectPassword() {
        (0, login_1.logInWithIncorrectPassword)();
    }
    checkInstallation() {
        (0, installation_1.checkInstallation)();
    }
    finishInstallation() {
        (0, installation_1.finishInstallation)();
    }
    changeDeviceToInstallTheSystem() {
        (0, storage_change_device_to_install_1.changeDeviceToInstallTheSystem)();
    }
    verifyPasswordStrength() {
        (0, authentication_1.verifyPasswordStrength)();
    }
    prepareZfcpStorage() {
        (0, storage_zfcp_1.prepareZfcpStorage)();
    }
    prepareDasdStorage() {
        (0, storage_dasd_1.prepareDasdStorage)();
    }
    changePatterns(patterns) {
        (0, software_1.changePatterns)(patterns);
    }
    selectDesktop(desktop) {
        (0, software_1.selectADesktop)(desktop);
    }
    changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize() {
        (0, storage_change_root_partition_1.changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize)();
    }
    selectMoreDevices() {
        (0, storage_select_installation_device_1.selectMoreDevices)();
    }
    setOnlyInstallationNetwork() {
        (0, network_1.setOnlyInstallationNetwork)();
    }
    verifyDecryptDestructiveActions(destructiveActions) {
        (0, storage_result_destructive_actions_planned_1.verifyDecryptDestructiveActions)(destructiveActions);
    }
    verifyStorageOutOfSync() {
        (0, storage_out_of_sync_1.verifyStorageOutOfSync)();
    }
    ensureLandingOnOverview() {
        (0, overview_1.ensureLandingOnOverview)();
    }
    downloadLogs() {
        (0, download_logs_1.downloadLogs)();
    }
    configureTimeSynchronizationServers(ntpServerAddresses) {
        (0, system_1.configureTimeSynchronizationServers)(ntpServerAddresses);
    }
}
exports.ProductionReleaseStrategy = ProductionReleaseStrategy;


/***/ },

/***/ "assert"
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
(module) {

module.exports = require("assert");

/***/ },

/***/ "buffer"
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
(module) {

module.exports = require("buffer");

/***/ },

/***/ "child_process"
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
(module) {

module.exports = require("child_process");

/***/ },

/***/ "crypto"
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
(module) {

module.exports = require("crypto");

/***/ },

/***/ "dns"
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
(module) {

module.exports = require("dns");

/***/ },

/***/ "events"
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
(module) {

module.exports = require("events");

/***/ },

/***/ "fs"
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
(module) {

module.exports = require("fs");

/***/ },

/***/ "http"
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
(module) {

module.exports = require("http");

/***/ },

/***/ "http2"
/*!************************!*\
  !*** external "http2" ***!
  \************************/
(module) {

module.exports = require("http2");

/***/ },

/***/ "https"
/*!************************!*\
  !*** external "https" ***!
  \************************/
(module) {

module.exports = require("https");

/***/ },

/***/ "net"
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
(module) {

module.exports = require("net");

/***/ },

/***/ "node:assert"
/*!******************************!*\
  !*** external "node:assert" ***!
  \******************************/
(module) {

module.exports = require("node:assert");

/***/ },

/***/ "node:assert/strict"
/*!*************************************!*\
  !*** external "node:assert/strict" ***!
  \*************************************/
(module) {

module.exports = require("node:assert/strict");

/***/ },

/***/ "node:child_process"
/*!*************************************!*\
  !*** external "node:child_process" ***!
  \*************************************/
(module) {

module.exports = require("node:child_process");

/***/ },

/***/ "node:events"
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
(module) {

module.exports = require("node:events");

/***/ },

/***/ "node:fs"
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
(module) {

module.exports = require("node:fs");

/***/ },

/***/ "node:fs/promises"
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
(module) {

module.exports = require("node:fs/promises");

/***/ },

/***/ "node:http"
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
(module) {

module.exports = require("node:http");

/***/ },

/***/ "node:https"
/*!*****************************!*\
  !*** external "node:https" ***!
  \*****************************/
(module) {

module.exports = require("node:https");

/***/ },

/***/ "node:os"
/*!**************************!*\
  !*** external "node:os" ***!
  \**************************/
(module) {

module.exports = require("node:os");

/***/ },

/***/ "node:path"
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
(module) {

module.exports = require("node:path");

/***/ },

/***/ "node:process"
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
(module) {

module.exports = require("node:process");

/***/ },

/***/ "node:readline"
/*!********************************!*\
  !*** external "node:readline" ***!
  \********************************/
(module) {

module.exports = require("node:readline");

/***/ },

/***/ "node:stream"
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
(module) {

module.exports = require("node:stream");

/***/ },

/***/ "node:test"
/*!****************************!*\
  !*** external "node:test" ***!
  \****************************/
(module) {

module.exports = require("node:test");

/***/ },

/***/ "node:url"
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
(module) {

module.exports = require("node:url");

/***/ },

/***/ "os"
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
(module) {

module.exports = require("os");

/***/ },

/***/ "path"
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
(module) {

module.exports = require("path");

/***/ },

/***/ "stream"
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
(module) {

module.exports = require("stream");

/***/ },

/***/ "tls"
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
(module) {

module.exports = require("tls");

/***/ },

/***/ "tty"
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
(module) {

module.exports = require("tty");

/***/ },

/***/ "url"
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
(module) {

module.exports = require("url");

/***/ },

/***/ "util"
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
(module) {

module.exports = require("util");

/***/ },

/***/ "zlib"
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
(module) {

module.exports = require("zlib");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/test_phub.ts")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and chunks that the entrypoint depends on
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			"test_phub": 1
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.O.require = (chunkId) => (installedChunks[chunkId]);
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 			__webpack_require__.O();
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					var installedChunk = require("./" + __webpack_require__.u(chunkId));
/******/ 					if (!installedChunks[chunkId]) {
/******/ 						installChunk(installedChunk);
/******/ 					}
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			__webpack_require__.e("vendor");
/******/ 			return next();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=test_phub.js.map