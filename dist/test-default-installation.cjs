#! /usr/bin/env -S node --enable-source-maps --test-timeout=60000
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/configuration.ts":
/*!******************************!*\
  !*** ./src/configuration.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   booleanEnv: () => (/* binding */ booleanEnv),
/* harmony export */   options: () => (/* binding */ options),
/* harmony export */   puppeteerLaunchOptions: () => (/* binding */ puppeteerLaunchOptions),
/* harmony export */   sleep: () => (/* binding */ sleep)
/* harmony export */ });
/* harmony import */ var commander__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! commander */ "./node_modules/commander/esm.mjs");


// helper function for converting String to Boolean
function booleanEnv(name, default_value) {
    const env = process.env[name];
    if (env === undefined) {
        return default_value;
    }
    switch (env.toLowerCase()) {
        case "0":
        case "false":
        case "off":
        case "disabled":
        case "no":
            return false;
        case "1":
        case "true":
        case "on":
        case "enabled":
        case "yes":
            return true;
        default:
            return default_value;
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
// parse command line argument as an integer
function getInt(value) {
    // parse the value as a decimal number (base 10)
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
        throw new commander__WEBPACK_IMPORTED_MODULE_0__.InvalidArgumentError("Enter a valid number.");
    }
    return parsed;
}
// define the command line arguments and parse them
// see https://github.com/tj/commander.js
commander__WEBPACK_IMPORTED_MODULE_0__.program
    .description("Run a simple Agama integration test")
    .option("-u, --url <url>", "Agama server URL", "http://localhost")
    .option("-p, --password <password>", "Agama login password", "nots3cr3t")
    .addOption(new commander__WEBPACK_IMPORTED_MODULE_0__.Option("-b, --browser <browser>", "Browser used for running the test")
    .choices(["firefox", "chrome", "chromium"])
    .default("firefox"))
    .option("-h, --headed", "Run the browser in headed mode with UI (the default is headless mode)")
    .addOption(new commander__WEBPACK_IMPORTED_MODULE_0__.Option("-d, --delay <miliseconds>", "Delay between the browser actions, useful in headed mode")
    .argParser(getInt)
    .default(0))
    .option("-c, --continue", "Continue the test after a failure (the default is abort on error)")
    .parse(process.argv);
// parse options from the command line
const options = commander__WEBPACK_IMPORTED_MODULE_0__.program.opts();
const puppeteerLaunchOptions = {
    // "webDriverBiDi" does not work with old FireFox, comment it out if needed
    protocol: "webDriverBiDi",
    headless: !options.headed,
    acceptInsecureCerts: true,
    timeout: 30000,
    slowMo: options.delay,
    defaultViewport: {
        width: 1280,
        height: 768
    },
    ...browserSettings(options.browser)
};
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



/***/ }),

/***/ "./src/pages/create-user-page.ts":
/*!***************************************!*\
  !*** ./src/pages/create-user-page.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateFirstUserPage: () => (/* binding */ CreateFirstUserPage)
/* harmony export */ });
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


/***/ }),

/***/ "./src/pages/login-as-root-page.ts":
/*!*****************************************!*\
  !*** ./src/pages/login-as-root-page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginAsRootPage: () => (/* binding */ LoginAsRootPage)
/* harmony export */ });
class LoginAsRootPage {
    page;
    passwordInput = () => this.page.locator("input#password");
    logInButton = () => this.page.locator("button[type='submit']");
    constructor(page) {
        this.page = page;
    }
    async logIn(password) {
        await this.passwordInput().fill(password);
        await this.logInButton().click();
    }
}


/***/ }),

/***/ "./src/pages/product-selection-page.ts":
/*!*********************************************!*\
  !*** ./src/pages/product-selection-page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductSelectionPage: () => (/* binding */ ProductSelectionPage)
/* harmony export */ });
class ProductSelectionPage {
    page;
    leapText = () => this.page.locator("::-p-text('Leap 16.0 Alpha')");
    microOsText = () => this.page.locator("::-p-text('openSUSE MicroOS')");
    tumbleweedText = () => this.page.locator("::-p-text('openSUSE Tumbleweed')");
    selectButton = () => this.page.locator("button[form='productSelectionForm']");
    page_selected = 'none';
    constructor(page) {
        this.page = page;
    }
    async selectLeap() {
        await this.leapText().click();
        await this.selectButton().click();
        this.page_selected = 'leap';
    }
    async selectMicroOs() {
        await this.microOsText().click();
        await this.selectButton().click();
        this.page_selected = 'microos';
    }
    async selectTumbleweed() {
        await this.tumbleweedText().click();
        await this.selectButton().click();
        this.page_selected = 'tumbleweed';
    }
}


/***/ }),

/***/ "./src/pages/root-password-page.ts":
/*!*****************************************!*\
  !*** ./src/pages/root-password-page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SetARootPasswordPage: () => (/* binding */ SetARootPasswordPage)
/* harmony export */ });
class SetARootPasswordPage {
    page;
    passwordInput = () => this.page.locator("input#password");
    passwordConfirmationInput = () => this.page.locator("input#passwordConfirmation");
    confirmText = () => this.page.locator("button::-p-text(Confirm)");
    cancelText = () => this.page.locator("button::-p-text(Cancel)");
    constructor(page) {
        this.page = page;
    }
    async fillPassword(password) {
        await this.passwordInput().fill(password);
    }
    async fillPasswordConfirmation(password) {
        await this.passwordConfirmationInput().fill(password);
    }
    async confirm() {
        await this.confirmText().click();
    }
}


/***/ }),

/***/ "./src/pages/sidebar-page.ts":
/*!***********************************!*\
  !*** ./src/pages/sidebar-page.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SidebarPage: () => (/* binding */ SidebarPage)
/* harmony export */ });
class SidebarPage {
    page;
    overviewLink = () => this.page.locator("a[href='#/overview']");
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


/***/ }),

/***/ "./src/pages/users-page.ts":
/*!*********************************!*\
  !*** ./src/pages/users-page.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UsersPage: () => (/* binding */ UsersPage)
/* harmony export */ });
class UsersPage {
    page;
    firstUserLink = () => this.page.locator("a[href='#/users/first']");
    setAPasswordText = () => this.page.locator("button::-p-text(Set a password)");
    constructor(page) {
        this.page = page;
    }
    async defineAUserNow() {
        await this.firstUserLink().click();
    }
    async setAPassword() {
        await this.setAPasswordText().click();
    }
}


/***/ }),

/***/ "./src/test-default-installation.ts":
/*!******************************************!*\
  !*** ./src/test-default-installation.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var puppeteer_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! puppeteer-core */ "./node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js");
/* harmony import */ var node_test__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node:test */ "node:test");
/* harmony import */ var node_test__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_test__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var node_assert_strict__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node:assert/strict */ "node:assert/strict");
/* harmony import */ var node_assert_strict__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(node_assert_strict__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
/* harmony import */ var _pages_login_as_root_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/login-as-root-page */ "./src/pages/login-as-root-page.ts");
/* harmony import */ var _pages_product_selection_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/product-selection-page */ "./src/pages/product-selection-page.ts");
/* harmony import */ var _pages_sidebar_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/sidebar-page */ "./src/pages/sidebar-page.ts");
/* harmony import */ var _pages_users_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/users-page */ "./src/pages/users-page.ts");
/* harmony import */ var _pages_root_password_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/root-password-page */ "./src/pages/root-password-page.ts");
/* harmony import */ var _pages_create_user_page__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/create-user-page */ "./src/pages/create-user-page.ts");












let page;
let browser;
let failed = false;
// define it() as a wrapper which dumps the page on a failure
async function it(label, test, timeout) {
    (0,node_test__WEBPACK_IMPORTED_MODULE_3__.it)(label, 
    // abort when the test takes more than one minute
    { timeout: timeout || 60000 }, async (t) => {
        try {
            if (failed)
                t.skip();
            else
                await test();
        }
        catch (error) {
            if (!_configuration__WEBPACK_IMPORTED_MODULE_5__.options.continue)
                failed = true;
            if (page) {
                // directory for storing the data
                const dir = "log";
                if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(dir))
                    fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(dir);
                // base file name for the dumps
                const name = path__WEBPACK_IMPORTED_MODULE_1___default().join(dir, label.replace(/[^a-zA-Z0-9]/g, "_"));
                await page.screenshot({ path: name + ".png" });
                const html = await page.content();
                fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(name + ".html", html);
            }
            throw new Error("Test failed!", { cause: error });
        }
    });
}
;
const agamaInstall = (0,_configuration__WEBPACK_IMPORTED_MODULE_5__.booleanEnv)("AGAMA_INSTALL", true);
const agamaDasd = (0,_configuration__WEBPACK_IMPORTED_MODULE_5__.booleanEnv)("AGAMA_DASD", false);
const agamaProduct = process.env.AGAMA_PRODUCT || "tumbleweed";
const agamaUser = "bernhard";
const agamaUserFullName = "Bernhard M. Wiedemann";
(0,node_test__WEBPACK_IMPORTED_MODULE_3__.describe)("Agama test", function () {
    (0,node_test__WEBPACK_IMPORTED_MODULE_3__.before)(async function () {
        browser = await puppeteer_core__WEBPACK_IMPORTED_MODULE_2__["default"].launch(_configuration__WEBPACK_IMPORTED_MODULE_5__.puppeteerLaunchOptions);
        page = await browser.newPage();
        page.setDefaultTimeout(20000);
        await page.goto(_configuration__WEBPACK_IMPORTED_MODULE_5__.options.url, { timeout: 60000, waitUntil: "domcontentloaded" });
    });
    (0,node_test__WEBPACK_IMPORTED_MODULE_3__.after)(async function () {
        await page.close();
        await browser.close();
    });
    it("should have Agama page title", async function () {
        node_assert_strict__WEBPACK_IMPORTED_MODULE_4___default().deepEqual(await page.title(), "Agama");
    });
    it("allows logging in", async function () {
        const loginAsRoot = new _pages_login_as_root_page__WEBPACK_IMPORTED_MODULE_6__.LoginAsRootPage(page);
        await loginAsRoot.logIn(_configuration__WEBPACK_IMPORTED_MODULE_5__.options.password);
    });
    it("should display the product selection dialog", async function () {
        const productselection = new _pages_product_selection_page__WEBPACK_IMPORTED_MODULE_7__.ProductSelectionPage(page);
        let timeout = 2 * 60 * 1000;
        if (agamaProduct === "leap") {
            await productselection.selectLeap();
        }
        else if (agamaProduct === "tumbleweed") {
            await productselection.selectTumbleweed();
        }
        if (productselection.page_selected != 'none') {
            // Check if configuration procedure is progressing
            await page.locator("::-p-text(Configuring the product)").wait();
            // refreshing the repositories might take long time
            await page.locator("h3::-p-text('Overview')").setTimeout(timeout).wait();
        }
    });
    it("should display overview section", async function () {
        await page.locator("h3::-p-text('Overview')").wait();
    });
    it("should allow setting the root password", async function () {
        const sidebar = new _pages_sidebar_page__WEBPACK_IMPORTED_MODULE_8__.SidebarPage(page);
        const users = new _pages_users_page__WEBPACK_IMPORTED_MODULE_9__.UsersPage(page);
        const setARootPassword = new _pages_root_password_page__WEBPACK_IMPORTED_MODULE_10__.SetARootPasswordPage(page);
        await sidebar.goToUsers();
        await users.setAPassword();
        await setARootPassword.fillPassword(_configuration__WEBPACK_IMPORTED_MODULE_5__.options.password);
        await setARootPassword.fillPasswordConfirmation(_configuration__WEBPACK_IMPORTED_MODULE_5__.options.password);
        await setARootPassword.confirm();
    });
    it("should create first user", async function () {
        const users = new _pages_users_page__WEBPACK_IMPORTED_MODULE_9__.UsersPage(page);
        const createFirstUser = new _pages_create_user_page__WEBPACK_IMPORTED_MODULE_11__.CreateFirstUserPage(page);
        // todo: button is moving in the page and fails in slow machines
        await (0,_configuration__WEBPACK_IMPORTED_MODULE_5__.sleep)(2000);
        await users.defineAUserNow();
        await createFirstUser.fillFullName(agamaUserFullName);
        await createFirstUser.fillUserName(agamaUser);
        await createFirstUser.fillPassword(_configuration__WEBPACK_IMPORTED_MODULE_5__.options.password);
        await createFirstUser.fillPasswordConfirmation(_configuration__WEBPACK_IMPORTED_MODULE_5__.options.password);
        await createFirstUser.accept();
    });
    if (agamaDasd) {
        it("should prepare storage", async function () {
            // Workaround, sometimes the UI seems not responsive
            await page.locator("a[href='#/storage']").click({ delay: 1000 });
            await page.locator("a[href='#/storage']").click({ delay: 1000 });
            await page.locator("a[href='#/storage/target-device']").click();
            await page.locator("span::-p-text('storage techs')").click();
            await page.locator("span::-p-text('DASD')").click({ delay: 1000 });
            // Enabling DASD device, by default it is always disabled
            await page.locator("input[name='checkrow0']").click({ delay: 1000 });
            await page.locator("span::-p-text('Perform an action')").click({ delay: 1000 });
            await page.locator("span::-p-text('Activate')").click();
            // Selecting installation device
            await page.locator("a[href='#/storage']").click();
            await page.locator("a[href='#/storage/target-device']").click({ delay: 1000 });
            await page.locator("input[aria-label='Select row 0']").click();
            await page.locator("button[form='targetSelection']").click();
        });
    }
    it("should be ready for installation", async function () {
        await page.locator("a[href='#/overview']").click();
        await page.locator("h4::-p-text('Ready for installation')").wait();
    });
    // For development will be useful to stop before starting installation
    if (agamaInstall === true) {
        it("should start installation", async function () {
            // todo: button is moving in the page and fails in slow machines
            await (0,_configuration__WEBPACK_IMPORTED_MODULE_5__.sleep)(2000);
            await page.locator("button::-p-text('Install')").click();
            await page.locator("button::-p-text('Continue')").click();
            await page.locator("::-p-text(Installing the)").wait();
        });
        it("should finish installation", async function () {
            await page
                .locator("h2::-p-text('Congratulations!')")
                .setTimeout(15 * 60 * 1000)
                .wait();
        }, 15 * 60 * 1000);
    }
});


/***/ }),

/***/ "./node_modules/yargs-parser/build sync recursive":
/*!***********************************************!*\
  !*** ./node_modules/yargs-parser/build/ sync ***!
  \***********************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/yargs-parser/build sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "./node_modules/yargs/build sync recursive":
/*!****************************************!*\
  !*** ./node_modules/yargs/build/ sync ***!
  \****************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/yargs/build sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "constants":
/*!****************************!*\
  !*** external "constants" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("constants");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "node:assert/strict":
/*!*************************************!*\
  !*** external "node:assert/strict" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:assert/strict");

/***/ }),

/***/ "node:child_process":
/*!*************************************!*\
  !*** external "node:child_process" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:child_process");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:test":
/*!****************************!*\
  !*** external "node:test" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:test");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "readline":
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("readline");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

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
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_commander_esm_mjs-node_modules_puppeteer-core_lib_esm_puppeteer_puppetee-92779f"], () => (__webpack_require__(__webpack_require__.s = "./src/test-default-installation.ts")))
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
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
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
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".cjs";
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
/******/ 			"test-default-installation": 1
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
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
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
/******/ 			__webpack_require__.e("vendors-node_modules_commander_esm_mjs-node_modules_puppeteer-core_lib_esm_puppeteer_puppetee-92779f");
/******/ 			return next();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1kZWZhdWx0LWluc3RhbGxhdGlvbi5janMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU0QztBQUNMO0FBRXZDLG1EQUFtRDtBQUNuRCxTQUFTLFVBQVUsQ0FBQyxJQUFZLEVBQUUsYUFBc0I7SUFDdEQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUUsQ0FBQztRQUN0QixPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0QsUUFBUSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztRQUMxQixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssT0FBTyxDQUFDO1FBQ2IsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLFVBQVUsQ0FBQztRQUNoQixLQUFLLElBQUk7WUFDUCxPQUFPLEtBQUssQ0FBQztRQUNmLEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLElBQUksQ0FBQztRQUNWLEtBQUssU0FBUyxDQUFDO1FBQ2YsS0FBSyxLQUFLO1lBQ1IsT0FBTyxJQUFJLENBQUM7UUFDZDtZQUNFLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7QUFDSCxDQUFDO0FBT0QsOENBQThDO0FBQzlDLFNBQVMsZUFBZSxDQUFDLElBQVk7SUFDbkMsUUFBUSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztRQUMzQixLQUFLLFNBQVM7WUFDWixPQUFPO2dCQUNMLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixjQUFjLEVBQUUsa0JBQWtCO2FBQ25DLENBQUM7UUFDSixLQUFLLFFBQVE7WUFDWCxPQUFPO2dCQUNMLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixjQUFjLEVBQUUsK0JBQStCO2FBQ2hELENBQUM7UUFDSixLQUFLLFVBQVU7WUFDYixPQUFPO2dCQUNMLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixjQUFjLEVBQUUsbUJBQW1CO2FBQ3BDLENBQUM7UUFDSjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztBQUNILENBQUM7QUFFRCw0Q0FBNEM7QUFDNUMsU0FBUyxNQUFNLENBQUMsS0FBYTtJQUMzQixnREFBZ0Q7SUFDaEQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNuQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sSUFBSSwyREFBOEIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsbURBQW1EO0FBQ25ELHlDQUF5QztBQUN6Qyw4Q0FBTztLQUNKLFdBQVcsQ0FBQyxxQ0FBcUMsQ0FBQztLQUNsRCxNQUFNLENBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUM7S0FDakUsTUFBTSxDQUFDLDJCQUEyQixFQUFFLHNCQUFzQixFQUFFLFdBQVcsQ0FBQztLQUN4RSxTQUFTLENBQUMsSUFBSSw2Q0FBTSxDQUFDLHlCQUF5QixFQUFFLG1DQUFtQyxDQUFDO0tBQ2xGLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDMUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUNwQjtLQUNBLE1BQU0sQ0FBQyxjQUFjLEVBQUUsdUVBQXVFLENBQUM7S0FDL0YsU0FBUyxDQUFDLElBQUksNkNBQU0sQ0FBQywyQkFBMkIsRUFBRSwwREFBMEQsQ0FBQztLQUMzRyxTQUFTLENBQUMsTUFBTSxDQUFDO0tBQ2pCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FDWjtLQUNBLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxtRUFBbUUsQ0FBQztLQUM3RixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXZCLHNDQUFzQztBQUN0QyxNQUFNLE9BQU8sR0FBRyw4Q0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBRS9CLE1BQU0sc0JBQXNCLEdBQUc7SUFDN0IsMkVBQTJFO0lBQzNFLFFBQVEsRUFBRSxlQUErQjtJQUN6QyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTTtJQUN6QixtQkFBbUIsRUFBRSxJQUFJO0lBQ3pCLE9BQU8sRUFBRSxLQUFLO0lBQ2QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLO0lBQ3JCLGVBQWUsRUFBRTtRQUNmLEtBQUssRUFBRSxJQUFJO1FBQ1gsTUFBTSxFQUFFLEdBQUc7S0FDWjtJQUNELEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7Q0FDcEM7QUFFRCxTQUFTLEtBQUssQ0FBQyxFQUFVO0lBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUU2RDs7Ozs7Ozs7Ozs7Ozs7OztBQ3pHdkQsTUFBTSxtQkFBbUI7SUFDWCxJQUFJLENBQU87SUFDWCxhQUFhLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM5RCxhQUFhLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxRCxhQUFhLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxRCx5QkFBeUIsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQ2xGLFlBQVksR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBRXhGLFlBQVksSUFBVTtRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFnQjtRQUMvQixNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBZ0I7UUFDL0IsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQWdCO1FBQy9CLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsS0FBSyxDQUFDLHdCQUF3QixDQUFDLFFBQWdCO1FBQzNDLE1BQU0sSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTTtRQUNSLE1BQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7OztBQy9CTSxNQUFNLGVBQWU7SUFDUCxJQUFJLENBQU87SUFDWCxhQUFhLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxRCxXQUFXLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUVoRixZQUFZLElBQVU7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBZ0I7UUFDeEIsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JDLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7OztBQ2JNLE1BQU0sb0JBQW9CO0lBQ1osSUFBSSxDQUFPO0lBQ1gsUUFBUSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDbkUsV0FBVyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7SUFDdkUsY0FBYyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDN0UsWUFBWSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFDeEYsYUFBYSxHQUFXLE1BQU0sQ0FBQztJQUV0QyxZQUFZLElBQVU7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVO1FBQ1osTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDOUIsTUFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhO1FBQ2YsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakMsTUFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0I7UUFDbEIsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEMsTUFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7SUFDdEMsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0JNLE1BQU0sb0JBQW9CO0lBQ1osSUFBSSxDQUFPO0lBQ1gsYUFBYSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDMUQseUJBQXlCLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUNsRixXQUFXLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUNsRSxVQUFVLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUVqRixZQUFZLElBQVU7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBZ0I7UUFDL0IsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxLQUFLLENBQUMsd0JBQXdCLENBQUMsUUFBZ0I7UUFDM0MsTUFBTSxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPO1FBQ1QsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FDdEJNLE1BQU0sV0FBVztJQUNILElBQUksQ0FBTztJQUNYLFlBQVksR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQy9ELGdCQUFnQixHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDL0QsV0FBVyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDN0QsV0FBVyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDN0QsWUFBWSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDL0QsU0FBUyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFMUUsWUFBWSxJQUFVO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWTtRQUNkLE1BQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxLQUFLLENBQUMsZ0JBQWdCO1FBQ2xCLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXO1FBQ2IsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXO1FBQ2IsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZO1FBQ2QsTUFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFTO1FBQ1gsTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbkMsQ0FBQztDQUVKOzs7Ozs7Ozs7Ozs7Ozs7O0FDckNNLE1BQU0sU0FBUztJQUNELElBQUksQ0FBTztJQUNYLGFBQWEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ25FLGdCQUFnQixHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFFL0YsWUFBWSxJQUFVO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYztRQUNoQixNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsS0FBSyxDQUFDLFlBQVk7UUFDZCxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFDLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQm1CO0FBQ0k7QUFFNEM7QUFFSTtBQUNoQztBQUU2QztBQUV4QjtBQUNTO0FBQ25CO0FBQ0o7QUFDbUI7QUFDSjtBQUU5RCxJQUFJLElBQVUsQ0FBQztBQUNmLElBQUksT0FBZ0IsQ0FBQztBQUNyQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFFbkIsNkRBQTZEO0FBQzdELEtBQUssVUFBVSxFQUFFLENBQUMsS0FBYSxFQUFFLElBQXlCLEVBQUUsT0FBZ0I7SUFDMUUsNkNBQU0sQ0FBQyxLQUFLO0lBQ1YsaURBQWlEO0lBQ2pELEVBQUUsT0FBTyxFQUFFLE9BQU8sSUFBSSxLQUFLLEVBQUUsRUFDN0IsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ1YsSUFBSSxDQUFDO1lBQ0gsSUFBSSxNQUFNO2dCQUNSLENBQUMsQ0FBQyxJQUFJLEVBQUU7O2dCQUVSLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNELE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsbURBQU8sQ0FBQyxRQUFRO2dCQUFFLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDckMsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDVCxpQ0FBaUM7Z0JBQ2pDLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQztnQkFDbEIsSUFBSSxDQUFDLG9EQUFhLENBQUMsR0FBRyxDQUFDO29CQUFFLG1EQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTNDLCtCQUErQjtnQkFDL0IsTUFBTSxJQUFJLEdBQUcsZ0RBQVMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakUsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbEMsdURBQWdCLENBQUMsSUFBSSxHQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6QyxDQUFDO1lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNwRCxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQUEsQ0FBQztBQUVGLE1BQU0sWUFBWSxHQUFHLDBEQUFVLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sU0FBUyxHQUFHLDBEQUFVLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2xELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLFlBQVksQ0FBQztBQUUvRCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUM7QUFDN0IsTUFBTSxpQkFBaUIsR0FBRyx1QkFBdUIsQ0FBQztBQUVsRCxtREFBUSxDQUFDLFlBQVksRUFBRTtJQUNyQixpREFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLEdBQUcsTUFBTSw2REFBZ0IsQ0FBQyxrRUFBc0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLG1EQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO0lBQ2xGLENBQUMsQ0FBQyxDQUFDO0lBRUgsZ0RBQUssQ0FBQyxLQUFLO1FBQ1QsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0lBRUYsRUFBRSxDQUFDLDhCQUE4QixFQUFFLEtBQUs7UUFDdEMsbUVBQWdCLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsS0FBSztRQUMzQixNQUFNLFdBQVcsR0FBRyxJQUFJLHNFQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsTUFBTSxXQUFXLENBQUMsS0FBSyxDQUFDLG1EQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFHSCxFQUFFLENBQUMsNkNBQTZDLEVBQUUsS0FBSztRQUNyRCxNQUFNLGdCQUFnQixHQUFHLElBQUksK0VBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFNUIsSUFBSSxZQUFZLEtBQUssTUFBTSxFQUFFLENBQUM7WUFDNUIsTUFBTSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QyxDQUFDO2FBQ0ksSUFBSSxZQUFZLEtBQUssWUFBWSxFQUFDLENBQUM7WUFDdEMsTUFBTSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzVDLENBQUM7UUFFRCxJQUFJLGdCQUFnQixDQUFDLGFBQWEsSUFBSSxNQUFNLEVBQUMsQ0FBQztZQUM1QyxrREFBa0Q7WUFDbEQsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLG9DQUFvQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFaEUsbURBQW1EO1lBQ25ELE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzRSxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaUNBQWlDLEVBQUUsS0FBSztRQUN6QyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2RCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxLQUFLO1FBQ2hELE1BQU0sT0FBTyxHQUFHLElBQUksNERBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxNQUFNLEtBQUssR0FBRyxJQUFJLHdEQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLDRFQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhELE1BQU0sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFCLE1BQU0sS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNCLE1BQU0sZ0JBQWdCLENBQUMsWUFBWSxDQUFDLG1EQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEQsTUFBTSxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxtREFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMEJBQTBCLEVBQUUsS0FBSztRQUNsQyxNQUFNLEtBQUssR0FBRyxJQUFJLHdEQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsTUFBTSxlQUFlLEdBQUcsSUFBSSx5RUFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0RCxnRUFBZ0U7UUFDaEUsTUFBTSxxREFBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzdCLE1BQU0sZUFBZSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sZUFBZSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxNQUFNLGVBQWUsQ0FBQyxZQUFZLENBQUMsbURBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxNQUFNLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxtREFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUNkLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxLQUFLO1lBRWhDLG9EQUFvRDtZQUNwRCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNqRSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNqRSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoRSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM3RCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUVuRSx5REFBeUQ7WUFDekQsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDckUsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLG9DQUFvQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDaEYsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFeEQsZ0NBQWdDO1lBQ2hDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xELE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQy9FLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQy9ELE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLO1FBQzFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25ELE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JFLENBQUMsQ0FBQyxDQUFDO0lBRUgsc0VBQXNFO0lBQ3RFLElBQUksWUFBWSxLQUFLLElBQUksRUFBRSxDQUFDO1FBQzFCLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxLQUFLO1lBQ25DLGdFQUFnRTtZQUNoRSxNQUFNLHFEQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekQsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDMUQsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNEJBQTRCLEVBQUUsS0FBSztZQUNwQyxNQUFNLElBQUk7aUJBQ1AsT0FBTyxDQUFDLGlDQUFpQyxDQUFDO2lCQUMxQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7aUJBQzFCLElBQUksRUFBRSxDQUFDO1FBQ1osQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztBQ2xMSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDUkE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7Ozs7O1dDdkNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRDtXQUN0RCxzQ0FBc0MsaUVBQWlFO1dBQ3ZHO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjs7Ozs7V0NSQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdCQUFnQixxQkFBcUI7V0FDckM7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsYUFBYTtXQUNiO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7Ozs7O1dDckNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1VFSkE7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0Ly4vc3JjL2NvbmZpZ3VyYXRpb24udHMiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0Ly4vc3JjL3BhZ2VzL2NyZWF0ZS11c2VyLXBhZ2UudHMiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0Ly4vc3JjL3BhZ2VzL2xvZ2luLWFzLXJvb3QtcGFnZS50cyIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvLi9zcmMvcGFnZXMvcHJvZHVjdC1zZWxlY3Rpb24tcGFnZS50cyIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvLi9zcmMvcGFnZXMvcm9vdC1wYXNzd29yZC1wYWdlLnRzIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC8uL3NyYy9wYWdlcy9zaWRlYmFyLXBhZ2UudHMiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0Ly4vc3JjL3BhZ2VzL3VzZXJzLXBhZ2UudHMiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0Ly4vc3JjL3Rlc3QtZGVmYXVsdC1pbnN0YWxsYXRpb24udHMiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0Ly4vbm9kZV9tb2R1bGVzL3lhcmdzLXBhcnNlci9idWlsZC8gc3luYyIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvLi9ub2RlX21vZHVsZXMveWFyZ3MvYnVpbGQvIHN5bmMiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJhc3NlcnRcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImJ1ZmZlclwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY29uc3RhbnRzXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImRuc1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZXZlbnRzXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJmc1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnMvcHJvbWlzZXNcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJuZXRcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6YXNzZXJ0L3N0cmljdFwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmV2ZW50c1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpmc1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpwYXRoXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOnByb2Nlc3NcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6dGVzdFwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwib3NcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInBhdGhcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInByb2Nlc3NcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInJlYWRsaW5lXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJzdHJlYW1cIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInRsc1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidHR5XCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJ1cmxcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInV0aWxcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInpsaWJcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC93ZWJwYWNrL3J1bnRpbWUvY3JlYXRlIGZha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svcnVudGltZS9yZXF1aXJlIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svcnVudGltZS9zdGFydHVwIGNodW5rIGRlcGVuZGVuY2llcyIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHlwZSBTdXBwb3J0ZWRCcm93c2VyLCB0eXBlIFByb3RvY29sVHlwZSB9IGZyb20gXCJwdXBwZXRlZXItY29yZVwiO1xuXG5pbXBvcnQgeyBwcm9ncmFtLCBPcHRpb24gfSBmcm9tIFwiY29tbWFuZGVyXCI7XG5pbXBvcnQgKiBhcyBjb21tYW5kZXIgZnJvbSBcImNvbW1hbmRlclwiO1xuXG4vLyBoZWxwZXIgZnVuY3Rpb24gZm9yIGNvbnZlcnRpbmcgU3RyaW5nIHRvIEJvb2xlYW5cbmZ1bmN0aW9uIGJvb2xlYW5FbnYobmFtZTogc3RyaW5nLCBkZWZhdWx0X3ZhbHVlOiBib29sZWFuKSB7XG4gIGNvbnN0IGVudiA9IHByb2Nlc3MuZW52W25hbWVdO1xuICBpZiAoZW52ID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZGVmYXVsdF92YWx1ZTtcbiAgfVxuICBzd2l0Y2ggKGVudi50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSBcIjBcIjpcbiAgICBjYXNlIFwiZmFsc2VcIjpcbiAgICBjYXNlIFwib2ZmXCI6XG4gICAgY2FzZSBcImRpc2FibGVkXCI6XG4gICAgY2FzZSBcIm5vXCI6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIjFcIjpcbiAgICBjYXNlIFwidHJ1ZVwiOlxuICAgIGNhc2UgXCJvblwiOlxuICAgIGNhc2UgXCJlbmFibGVkXCI6XG4gICAgY2FzZSBcInllc1wiOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBkZWZhdWx0X3ZhbHVlO1xuICB9XG59XG5cbmludGVyZmFjZSBCcm93c2VyU2V0dGluZ3Mge1xuICBicm93c2VyOiBTdXBwb3J0ZWRCcm93c2VyO1xuICBleGVjdXRhYmxlUGF0aDogc3RyaW5nO1xufVxuXG4vLyBoZWxwZXIgZnVuY3Rpb24gZm9yIGNvbmZpZ3VyaW5nIHRoZSBicm93c2VyXG5mdW5jdGlvbiBicm93c2VyU2V0dGluZ3MobmFtZTogc3RyaW5nKTogQnJvd3NlclNldHRpbmdzIHtcbiAgc3dpdGNoIChuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlIFwiZmlyZWZveFwiOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYnJvd3NlcjogXCJmaXJlZm94XCIsXG4gICAgICAgIGV4ZWN1dGFibGVQYXRoOiBcIi91c3IvYmluL2ZpcmVmb3hcIixcbiAgICAgIH07XG4gICAgY2FzZSBcImNocm9tZVwiOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYnJvd3NlcjogXCJjaHJvbWVcIixcbiAgICAgICAgZXhlY3V0YWJsZVBhdGg6IFwiL3Vzci9iaW4vZ29vZ2xlLWNocm9tZS1zdGFibGVcIixcbiAgICAgIH07XG4gICAgY2FzZSBcImNocm9taXVtXCI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBicm93c2VyOiBcImNocm9tZVwiLFxuICAgICAgICBleGVjdXRhYmxlUGF0aDogXCIvdXNyL2Jpbi9jaHJvbWl1bVwiLFxuICAgICAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBicm93c2VyIHR5cGU6ICR7bmFtZX1gKTtcbiAgfVxufVxuXG4vLyBwYXJzZSBjb21tYW5kIGxpbmUgYXJndW1lbnQgYXMgYW4gaW50ZWdlclxuZnVuY3Rpb24gZ2V0SW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgLy8gcGFyc2UgdGhlIHZhbHVlIGFzIGEgZGVjaW1hbCBudW1iZXIgKGJhc2UgMTApXG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gIGlmIChpc05hTihwYXJzZWQpKSB7XG4gICAgdGhyb3cgbmV3IGNvbW1hbmRlci5JbnZhbGlkQXJndW1lbnRFcnJvcihcIkVudGVyIGEgdmFsaWQgbnVtYmVyLlwiKTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZWQ7XG59XG5cbi8vIGRlZmluZSB0aGUgY29tbWFuZCBsaW5lIGFyZ3VtZW50cyBhbmQgcGFyc2UgdGhlbVxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90ai9jb21tYW5kZXIuanNcbnByb2dyYW1cbiAgLmRlc2NyaXB0aW9uKFwiUnVuIGEgc2ltcGxlIEFnYW1hIGludGVncmF0aW9uIHRlc3RcIilcbiAgLm9wdGlvbihcIi11LCAtLXVybCA8dXJsPlwiLCBcIkFnYW1hIHNlcnZlciBVUkxcIiwgXCJodHRwOi8vbG9jYWxob3N0XCIpXG4gIC5vcHRpb24oXCItcCwgLS1wYXNzd29yZCA8cGFzc3dvcmQ+XCIsIFwiQWdhbWEgbG9naW4gcGFzc3dvcmRcIiwgXCJub3RzM2NyM3RcIilcbiAgLmFkZE9wdGlvbihuZXcgT3B0aW9uKFwiLWIsIC0tYnJvd3NlciA8YnJvd3Nlcj5cIiwgXCJCcm93c2VyIHVzZWQgZm9yIHJ1bm5pbmcgdGhlIHRlc3RcIilcbiAgICAuY2hvaWNlcyhbXCJmaXJlZm94XCIsIFwiY2hyb21lXCIsIFwiY2hyb21pdW1cIl0pXG4gICAgLmRlZmF1bHQoXCJmaXJlZm94XCIpXG4gIClcbiAgLm9wdGlvbihcIi1oLCAtLWhlYWRlZFwiLCBcIlJ1biB0aGUgYnJvd3NlciBpbiBoZWFkZWQgbW9kZSB3aXRoIFVJICh0aGUgZGVmYXVsdCBpcyBoZWFkbGVzcyBtb2RlKVwiKVxuICAuYWRkT3B0aW9uKG5ldyBPcHRpb24oXCItZCwgLS1kZWxheSA8bWlsaXNlY29uZHM+XCIsIFwiRGVsYXkgYmV0d2VlbiB0aGUgYnJvd3NlciBhY3Rpb25zLCB1c2VmdWwgaW4gaGVhZGVkIG1vZGVcIilcbiAgICAuYXJnUGFyc2VyKGdldEludClcbiAgICAuZGVmYXVsdCgwKVxuICApXG4gIC5vcHRpb24oXCItYywgLS1jb250aW51ZVwiLCBcIkNvbnRpbnVlIHRoZSB0ZXN0IGFmdGVyIGEgZmFpbHVyZSAodGhlIGRlZmF1bHQgaXMgYWJvcnQgb24gZXJyb3IpXCIpXG4gIC5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuXG4vLyBwYXJzZSBvcHRpb25zIGZyb20gdGhlIGNvbW1hbmQgbGluZVxuY29uc3Qgb3B0aW9ucyA9IHByb2dyYW0ub3B0cygpO1xuXG5jb25zdCBwdXBwZXRlZXJMYXVuY2hPcHRpb25zID0ge1xuICAvLyBcIndlYkRyaXZlckJpRGlcIiBkb2VzIG5vdCB3b3JrIHdpdGggb2xkIEZpcmVGb3gsIGNvbW1lbnQgaXQgb3V0IGlmIG5lZWRlZFxuICBwcm90b2NvbDogXCJ3ZWJEcml2ZXJCaURpXCIgYXMgUHJvdG9jb2xUeXBlLFxuICBoZWFkbGVzczogIW9wdGlvbnMuaGVhZGVkLFxuICBhY2NlcHRJbnNlY3VyZUNlcnRzOiB0cnVlLFxuICB0aW1lb3V0OiAzMDAwMCxcbiAgc2xvd01vOiBvcHRpb25zLmRlbGF5LFxuICBkZWZhdWx0Vmlld3BvcnQ6IHtcbiAgICB3aWR0aDogMTI4MCxcbiAgICBoZWlnaHQ6IDc2OFxuICB9LFxuICAuLi5icm93c2VyU2V0dGluZ3Mob3B0aW9ucy5icm93c2VyKVxufVxuXG5mdW5jdGlvbiBzbGVlcChtczogbnVtYmVyKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbn1cblxuZXhwb3J0IHsgYm9vbGVhbkVudiwgb3B0aW9ucywgcHVwcGV0ZWVyTGF1bmNoT3B0aW9ucywgc2xlZXAgfTtcbiIsImltcG9ydCBwdXBwZXRlZXIsIHsgdHlwZSBMb2NhdG9yLCB0eXBlIFBhZ2UgfSBmcm9tIFwicHVwcGV0ZWVyLWNvcmVcIjtcblxuZXhwb3J0IGNsYXNzIENyZWF0ZUZpcnN0VXNlclBhZ2Uge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGFnZTogUGFnZTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZ1bGxOYW1lSW5wdXQgPSAoKSA9PiB0aGlzLnBhZ2UubG9jYXRvcihcImlucHV0I3VzZXJGdWxsTmFtZVwiKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHVzZXJuYW1lSW5wdXQgPSAoKSA9PiB0aGlzLnBhZ2UubG9jYXRvcihcImlucHV0I3VzZXJOYW1lXCIpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGFzc3dvcmRJbnB1dCA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiaW5wdXQjcGFzc3dvcmRcIik7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwYXNzd29yZENvbmZpcm1hdGlvbklucHV0ID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJpbnB1dCNwYXNzd29yZENvbmZpcm1hdGlvblwiKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFjY2VwdEJ1dHRvbiA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiYnV0dG9uW2Zvcm09J2ZpcnN0VXNlckZvcm0nXVwiKTtcblxuICAgIGNvbnN0cnVjdG9yKHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG5cbiAgICBhc3luYyBmaWxsRnVsbE5hbWUoZnVsbE5hbWU6IHN0cmluZykge1xuICAgICAgICBhd2FpdCB0aGlzLmZ1bGxOYW1lSW5wdXQoKS5maWxsKGZ1bGxOYW1lKTtcbiAgICB9XG5cbiAgICBhc3luYyBmaWxsVXNlck5hbWUodXNlck5hbWU6IHN0cmluZykge1xuICAgICAgICBhd2FpdCB0aGlzLnVzZXJuYW1lSW5wdXQoKS5maWxsKHVzZXJOYW1lKTtcbiAgICB9XG5cbiAgICBhc3luYyBmaWxsUGFzc3dvcmQocGFzc3dvcmQ6IHN0cmluZykge1xuICAgICAgICBhd2FpdCB0aGlzLnBhc3N3b3JkSW5wdXQoKS5maWxsKHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICBhc3luYyBmaWxsUGFzc3dvcmRDb25maXJtYXRpb24ocGFzc3dvcmQ6IHN0cmluZykge1xuICAgICAgICBhd2FpdCB0aGlzLnBhc3N3b3JkQ29uZmlybWF0aW9uSW5wdXQoKS5maWxsKHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICBhc3luYyBhY2NlcHQoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuYWNjZXB0QnV0dG9uKCkuY2xpY2soKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgcHVwcGV0ZWVyLCB7IHR5cGUgUGFnZSB9IGZyb20gXCJwdXBwZXRlZXItY29yZVwiO1xuXG5leHBvcnQgY2xhc3MgTG9naW5Bc1Jvb3RQYWdlIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBhZ2U6IFBhZ2U7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwYXNzd29yZElucHV0ID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJpbnB1dCNwYXNzd29yZFwiKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvZ0luQnV0dG9uID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJidXR0b25bdHlwZT0nc3VibWl0J11cIik7XG5cbiAgICBjb25zdHJ1Y3RvcihwYWdlOiBQYWdlKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9nSW4ocGFzc3dvcmQ6IHN0cmluZykge1xuICAgICAgICBhd2FpdCB0aGlzLnBhc3N3b3JkSW5wdXQoKS5maWxsKHBhc3N3b3JkKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dJbkJ1dHRvbigpLmNsaWNrKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHB1cHBldGVlciwgeyB0eXBlIExvY2F0b3IsIHR5cGUgUGFnZSB9IGZyb20gXCJwdXBwZXRlZXItY29yZVwiO1xuXG5leHBvcnQgY2xhc3MgUHJvZHVjdFNlbGVjdGlvblBhZ2Uge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGFnZTogUGFnZTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxlYXBUZXh0ID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCI6Oi1wLXRleHQoJ0xlYXAgMTYuMCBBbHBoYScpXCIpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbWljcm9Pc1RleHQgPSAoKSA9PiB0aGlzLnBhZ2UubG9jYXRvcihcIjo6LXAtdGV4dCgnb3BlblNVU0UgTWljcm9PUycpXCIpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdHVtYmxld2VlZFRleHQgPSAoKSA9PiB0aGlzLnBhZ2UubG9jYXRvcihcIjo6LXAtdGV4dCgnb3BlblNVU0UgVHVtYmxld2VlZCcpXCIpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VsZWN0QnV0dG9uID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJidXR0b25bZm9ybT0ncHJvZHVjdFNlbGVjdGlvbkZvcm0nXVwiKTtcbiAgICBwdWJsaWMgcGFnZV9zZWxlY3RlZDogU3RyaW5nID0gJ25vbmUnO1xuXG4gICAgY29uc3RydWN0b3IocGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cblxuICAgIGFzeW5jIHNlbGVjdExlYXAoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubGVhcFRleHQoKS5jbGljaygpO1xuICAgICAgICBhd2FpdCB0aGlzLnNlbGVjdEJ1dHRvbigpLmNsaWNrKCk7XG4gICAgICAgIHRoaXMucGFnZV9zZWxlY3RlZCA9ICdsZWFwJztcbiAgICB9XG5cbiAgICBhc3luYyBzZWxlY3RNaWNyb09zKCkge1xuICAgICAgICBhd2FpdCB0aGlzLm1pY3JvT3NUZXh0KCkuY2xpY2soKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zZWxlY3RCdXR0b24oKS5jbGljaygpO1xuICAgICAgICB0aGlzLnBhZ2Vfc2VsZWN0ZWQgPSAnbWljcm9vcyc7XG4gICAgfVxuXG4gICAgYXN5bmMgc2VsZWN0VHVtYmxld2VlZCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy50dW1ibGV3ZWVkVGV4dCgpLmNsaWNrKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VsZWN0QnV0dG9uKCkuY2xpY2soKTtcbiAgICAgICAgdGhpcy5wYWdlX3NlbGVjdGVkID0gJ3R1bWJsZXdlZWQnO1xuICAgIH1cbn1cblxuIiwiaW1wb3J0IHB1cHBldGVlciwgeyB0eXBlIExvY2F0b3IsIHR5cGUgUGFnZSB9IGZyb20gXCJwdXBwZXRlZXItY29yZVwiO1xuXG5leHBvcnQgY2xhc3MgU2V0QVJvb3RQYXNzd29yZFBhZ2Uge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGFnZTogUGFnZTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBhc3N3b3JkSW5wdXQgPSAoKSA9PiB0aGlzLnBhZ2UubG9jYXRvcihcImlucHV0I3Bhc3N3b3JkXCIpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGFzc3dvcmRDb25maXJtYXRpb25JbnB1dCA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiaW5wdXQjcGFzc3dvcmRDb25maXJtYXRpb25cIik7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjb25maXJtVGV4dCA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiYnV0dG9uOjotcC10ZXh0KENvbmZpcm0pXCIpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FuY2VsVGV4dCA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiYnV0dG9uOjotcC10ZXh0KENhbmNlbClcIik7XG5cbiAgICBjb25zdHJ1Y3RvcihwYWdlOiBQYWdlKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgfVxuXG4gICAgYXN5bmMgZmlsbFBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5wYXNzd29yZElucHV0KCkuZmlsbChwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgYXN5bmMgZmlsbFBhc3N3b3JkQ29uZmlybWF0aW9uKHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5wYXNzd29yZENvbmZpcm1hdGlvbklucHV0KCkuZmlsbChwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgYXN5bmMgY29uZmlybSgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5jb25maXJtVGV4dCgpLmNsaWNrKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgdHlwZSBQYWdlIH0gZnJvbSBcInB1cHBldGVlci1jb3JlXCI7XG5cbmV4cG9ydCBjbGFzcyBTaWRlYmFyUGFnZSB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwYWdlOiBQYWdlO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb3ZlcnZpZXdMaW5rID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJhW2hyZWY9JyMvb3ZlcnZpZXcnXVwiKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvY2FsaXphdGlvbkxpbmsgPSAoKSA9PiB0aGlzLnBhZ2UubG9jYXRvcihcImFbaHJlZj0nIy9sMTBuJ11cIik7XG4gICAgcHJpdmF0ZSByZWFkb25seSBuZXR3b3JrTGluayA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiYVtocmVmPScjL25ldHdvcmsnXVwiKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHN0b3JhZ2VMaW5rID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJhW2hyZWY9JyMvc3RvcmFnZSddXCIpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc29mdHdhcmVMaW5rID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJhW2hyZWY9JyMvc29mdHdhcmUnXVwiKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHVzZXJzTGluayA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiYVtocmVmPScjL3VzZXJzJ11cIik7XG4gICAgXG4gICAgY29uc3RydWN0b3IocGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cblxuICAgIGFzeW5jIGdvVG9PdmVydmlldygpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5vdmVydmlld0xpbmsoKS5jbGljaygpO1xuICAgIH1cblxuICAgIGFzeW5jIGdvVG9Mb2NhbGl6YXRpb24oKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubG9jYWxpemF0aW9uTGluaygpLmNsaWNrKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ29Ub05ldHdvcmsoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubmV0d29ya0xpbmsoKS5jbGljaygpO1xuICAgIH1cblxuICAgIGFzeW5jIGdvVG9TdG9yYWdlKCkge1xuICAgICAgICBhd2FpdCB0aGlzLnN0b3JhZ2VMaW5rKCkuY2xpY2soKTtcbiAgICB9XG5cbiAgICBhc3luYyBnb1RvU29mdHdhcmUoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc29mdHdhcmVMaW5rKCkuY2xpY2soKTtcbiAgICB9XG5cbiAgICBhc3luYyBnb1RvVXNlcnMoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMudXNlcnNMaW5rKCkuY2xpY2soKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBwdXBwZXRlZXIsIHsgdHlwZSBMb2NhdG9yLCB0eXBlIFBhZ2UgfSBmcm9tIFwicHVwcGV0ZWVyLWNvcmVcIjtcblxuZXhwb3J0IGNsYXNzIFVzZXJzUGFnZSB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwYWdlOiBQYWdlO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZmlyc3RVc2VyTGluayA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiYVtocmVmPScjL3VzZXJzL2ZpcnN0J11cIik7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzZXRBUGFzc3dvcmRUZXh0ID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJidXR0b246Oi1wLXRleHQoU2V0IGEgcGFzc3dvcmQpXCIpO1xuXG4gICAgY29uc3RydWN0b3IocGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cblxuICAgIGFzeW5jIGRlZmluZUFVc2VyTm93KCkge1xuICAgICAgICBhd2FpdCB0aGlzLmZpcnN0VXNlckxpbmsoKS5jbGljaygpO1xuICAgIH1cblxuICAgIGFzeW5jIHNldEFQYXNzd29yZCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRBUGFzc3dvcmRUZXh0KCkuY2xpY2soKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgcHVwcGV0ZWVyLCB7IHR5cGUgQnJvd3NlciwgdHlwZSBQYWdlIH0gZnJvbSBcInB1cHBldGVlci1jb3JlXCI7XG5cbmltcG9ydCB7IGl0IGFzIHRlc3RJdCwgZGVzY3JpYmUsIGJlZm9yZSwgYWZ0ZXIsIHNraXAgfSBmcm9tIFwibm9kZTp0ZXN0XCI7XG5pbXBvcnQgYXNzZXJ0IGZyb20gXCJub2RlOmFzc2VydC9zdHJpY3RcIjtcblxuaW1wb3J0IHsgYm9vbGVhbkVudiwgb3B0aW9ucywgcHVwcGV0ZWVyTGF1bmNoT3B0aW9ucywgc2xlZXAgfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uXCI7XG5cbmltcG9ydCB7IExvZ2luQXNSb290UGFnZSB9IGZyb20gXCIuL3BhZ2VzL2xvZ2luLWFzLXJvb3QtcGFnZVwiO1xuaW1wb3J0IHsgUHJvZHVjdFNlbGVjdGlvblBhZ2UgfSBmcm9tIFwiLi9wYWdlcy9wcm9kdWN0LXNlbGVjdGlvbi1wYWdlXCI7XG5pbXBvcnQgeyBTaWRlYmFyUGFnZSB9IGZyb20gXCIuL3BhZ2VzL3NpZGViYXItcGFnZVwiO1xuaW1wb3J0IHsgVXNlcnNQYWdlIH0gZnJvbSBcIi4vcGFnZXMvdXNlcnMtcGFnZVwiO1xuaW1wb3J0IHsgU2V0QVJvb3RQYXNzd29yZFBhZ2UgfSBmcm9tIFwiLi9wYWdlcy9yb290LXBhc3N3b3JkLXBhZ2VcIjtcbmltcG9ydCB7IENyZWF0ZUZpcnN0VXNlclBhZ2UgfSBmcm9tIFwiLi9wYWdlcy9jcmVhdGUtdXNlci1wYWdlXCJcblxubGV0IHBhZ2U6IFBhZ2U7XG5sZXQgYnJvd3NlcjogQnJvd3NlcjtcbmxldCBmYWlsZWQgPSBmYWxzZTtcblxuLy8gZGVmaW5lIGl0KCkgYXMgYSB3cmFwcGVyIHdoaWNoIGR1bXBzIHRoZSBwYWdlIG9uIGEgZmFpbHVyZVxuYXN5bmMgZnVuY3Rpb24gaXQobGFiZWw6IHN0cmluZywgdGVzdDogKCkgPT4gUHJvbWlzZTx2b2lkPiwgdGltZW91dD86IG51bWJlcikge1xuICB0ZXN0SXQobGFiZWwsXG4gICAgLy8gYWJvcnQgd2hlbiB0aGUgdGVzdCB0YWtlcyBtb3JlIHRoYW4gb25lIG1pbnV0ZVxuICAgIHsgdGltZW91dDogdGltZW91dCB8fCA2MDAwMCB9LFxuICAgIGFzeW5jICh0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgIHQuc2tpcCgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBhd2FpdCB0ZXN0KCk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmNvbnRpbnVlKSBmYWlsZWQgPSB0cnVlO1xuICAgICAgICBpZiAocGFnZSkge1xuICAgICAgICAgIC8vIGRpcmVjdG9yeSBmb3Igc3RvcmluZyB0aGUgZGF0YVxuICAgICAgICAgIGNvbnN0IGRpciA9IFwibG9nXCI7XG4gICAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcikpIGZzLm1rZGlyU3luYyhkaXIpO1xuXG4gICAgICAgICAgLy8gYmFzZSBmaWxlIG5hbWUgZm9yIHRoZSBkdW1wc1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBwYXRoLmpvaW4oZGlyLCBsYWJlbC5yZXBsYWNlKC9bXmEtekEtWjAtOV0vZywgXCJfXCIpKTtcbiAgICAgICAgICBhd2FpdCBwYWdlLnNjcmVlbnNob3QoeyBwYXRoOiBuYW1lICsgXCIucG5nXCIgfSk7XG4gICAgICAgICAgY29uc3QgaHRtbCA9IGF3YWl0IHBhZ2UuY29udGVudCgpO1xuICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMobmFtZSArIFwiLmh0bWxcIiwgaHRtbCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUZXN0IGZhaWxlZCFcIiwgeyBjYXVzZTogZXJyb3IgfSk7XG4gICAgICB9XG4gICAgfSk7XG59O1xuXG5jb25zdCBhZ2FtYUluc3RhbGwgPSBib29sZWFuRW52KFwiQUdBTUFfSU5TVEFMTFwiLCB0cnVlKTtcbmNvbnN0IGFnYW1hRGFzZCA9IGJvb2xlYW5FbnYoXCJBR0FNQV9EQVNEXCIsIGZhbHNlKTtcbmNvbnN0IGFnYW1hUHJvZHVjdCA9IHByb2Nlc3MuZW52LkFHQU1BX1BST0RVQ1QgfHwgXCJ0dW1ibGV3ZWVkXCI7XG5cbmNvbnN0IGFnYW1hVXNlciA9IFwiYmVybmhhcmRcIjtcbmNvbnN0IGFnYW1hVXNlckZ1bGxOYW1lID0gXCJCZXJuaGFyZCBNLiBXaWVkZW1hbm5cIjtcblxuZGVzY3JpYmUoXCJBZ2FtYSB0ZXN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBicm93c2VyID0gYXdhaXQgcHVwcGV0ZWVyLmxhdW5jaChwdXBwZXRlZXJMYXVuY2hPcHRpb25zKTtcbiAgICBwYWdlID0gYXdhaXQgYnJvd3Nlci5uZXdQYWdlKCk7XG4gICAgcGFnZS5zZXREZWZhdWx0VGltZW91dCgyMDAwMCk7XG4gICAgYXdhaXQgcGFnZS5nb3RvKG9wdGlvbnMudXJsLCB7IHRpbWVvdXQ6IDYwMDAwLCB3YWl0VW50aWw6IFwiZG9tY29udGVudGxvYWRlZFwiIH0pO1xuICB9KTtcblxuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgcGFnZS5jbG9zZSgpO1xuICAgIGF3YWl0IGJyb3dzZXIuY2xvc2UoKTtcbiAgfSlcblxuICBpdChcInNob3VsZCBoYXZlIEFnYW1hIHBhZ2UgdGl0bGVcIiwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGFzc2VydC5kZWVwRXF1YWwoYXdhaXQgcGFnZS50aXRsZSgpLCBcIkFnYW1hXCIpO1xuICB9KTtcblxuICBpdChcImFsbG93cyBsb2dnaW5nIGluXCIsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBsb2dpbkFzUm9vdCA9IG5ldyBMb2dpbkFzUm9vdFBhZ2UocGFnZSk7XG4gICAgYXdhaXQgbG9naW5Bc1Jvb3QubG9nSW4ob3B0aW9ucy5wYXNzd29yZCk7XG4gIH0pO1xuXG5cbiAgaXQoXCJzaG91bGQgZGlzcGxheSB0aGUgcHJvZHVjdCBzZWxlY3Rpb24gZGlhbG9nXCIsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBwcm9kdWN0c2VsZWN0aW9uID0gbmV3IFByb2R1Y3RTZWxlY3Rpb25QYWdlKHBhZ2UpO1xuXG4gICAgbGV0IHRpbWVvdXQgPSAyICogNjAgKiAxMDAwO1xuXG4gICAgaWYgKGFnYW1hUHJvZHVjdCA9PT0gXCJsZWFwXCIpIHtcbiAgICAgIGF3YWl0IHByb2R1Y3RzZWxlY3Rpb24uc2VsZWN0TGVhcCgpO1xuICAgIH1cbiAgICBlbHNlIGlmIChhZ2FtYVByb2R1Y3QgPT09IFwidHVtYmxld2VlZFwiKXtcbiAgICAgIGF3YWl0IHByb2R1Y3RzZWxlY3Rpb24uc2VsZWN0VHVtYmxld2VlZCgpO1xuICAgIH1cblxuICAgIGlmIChwcm9kdWN0c2VsZWN0aW9uLnBhZ2Vfc2VsZWN0ZWQgIT0gJ25vbmUnKXtcbiAgICAgIC8vIENoZWNrIGlmIGNvbmZpZ3VyYXRpb24gcHJvY2VkdXJlIGlzIHByb2dyZXNzaW5nXG4gICAgICBhd2FpdCBwYWdlLmxvY2F0b3IoXCI6Oi1wLXRleHQoQ29uZmlndXJpbmcgdGhlIHByb2R1Y3QpXCIpLndhaXQoKTtcblxuICAgICAgLy8gcmVmcmVzaGluZyB0aGUgcmVwb3NpdG9yaWVzIG1pZ2h0IHRha2UgbG9uZyB0aW1lXG4gICAgICBhd2FpdCBwYWdlLmxvY2F0b3IoXCJoMzo6LXAtdGV4dCgnT3ZlcnZpZXcnKVwiKS5zZXRUaW1lb3V0KHRpbWVvdXQpLndhaXQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGl0KFwic2hvdWxkIGRpc3BsYXkgb3ZlcnZpZXcgc2VjdGlvblwiLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgcGFnZS5sb2NhdG9yKFwiaDM6Oi1wLXRleHQoJ092ZXJ2aWV3JylcIikud2FpdCgpO1xuICB9KTtcblxuICBpdChcInNob3VsZCBhbGxvdyBzZXR0aW5nIHRoZSByb290IHBhc3N3b3JkXCIsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBzaWRlYmFyID0gbmV3IFNpZGViYXJQYWdlKHBhZ2UpO1xuICAgIGNvbnN0IHVzZXJzID0gbmV3IFVzZXJzUGFnZShwYWdlKTtcbiAgICBjb25zdCBzZXRBUm9vdFBhc3N3b3JkID0gbmV3IFNldEFSb290UGFzc3dvcmRQYWdlKHBhZ2UpO1xuXG4gICAgYXdhaXQgc2lkZWJhci5nb1RvVXNlcnMoKTtcbiAgICBhd2FpdCB1c2Vycy5zZXRBUGFzc3dvcmQoKTtcbiAgICBhd2FpdCBzZXRBUm9vdFBhc3N3b3JkLmZpbGxQYXNzd29yZChvcHRpb25zLnBhc3N3b3JkKTtcbiAgICBhd2FpdCBzZXRBUm9vdFBhc3N3b3JkLmZpbGxQYXNzd29yZENvbmZpcm1hdGlvbihvcHRpb25zLnBhc3N3b3JkKTtcbiAgICBhd2FpdCBzZXRBUm9vdFBhc3N3b3JkLmNvbmZpcm0oKTtcbiAgfSk7XG5cbiAgaXQoXCJzaG91bGQgY3JlYXRlIGZpcnN0IHVzZXJcIiwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHVzZXJzID0gbmV3IFVzZXJzUGFnZShwYWdlKTtcbiAgICBjb25zdCBjcmVhdGVGaXJzdFVzZXIgPSBuZXcgQ3JlYXRlRmlyc3RVc2VyUGFnZShwYWdlKTtcblxuICAgIC8vIHRvZG86IGJ1dHRvbiBpcyBtb3ZpbmcgaW4gdGhlIHBhZ2UgYW5kIGZhaWxzIGluIHNsb3cgbWFjaGluZXNcbiAgICBhd2FpdCBzbGVlcCgyMDAwKTtcbiAgICBhd2FpdCB1c2Vycy5kZWZpbmVBVXNlck5vdygpO1xuICAgIGF3YWl0IGNyZWF0ZUZpcnN0VXNlci5maWxsRnVsbE5hbWUoYWdhbWFVc2VyRnVsbE5hbWUpO1xuICAgIGF3YWl0IGNyZWF0ZUZpcnN0VXNlci5maWxsVXNlck5hbWUoYWdhbWFVc2VyKTtcbiAgICBhd2FpdCBjcmVhdGVGaXJzdFVzZXIuZmlsbFBhc3N3b3JkKG9wdGlvbnMucGFzc3dvcmQpO1xuICAgIGF3YWl0IGNyZWF0ZUZpcnN0VXNlci5maWxsUGFzc3dvcmRDb25maXJtYXRpb24ob3B0aW9ucy5wYXNzd29yZCk7XG4gICAgYXdhaXQgY3JlYXRlRmlyc3RVc2VyLmFjY2VwdCgpO1xuICB9KTtcblxuICBpZiAoYWdhbWFEYXNkKSB7XG4gICAgaXQoXCJzaG91bGQgcHJlcGFyZSBzdG9yYWdlXCIsIGFzeW5jIGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8gV29ya2Fyb3VuZCwgc29tZXRpbWVzIHRoZSBVSSBzZWVtcyBub3QgcmVzcG9uc2l2ZVxuICAgICAgYXdhaXQgcGFnZS5sb2NhdG9yKFwiYVtocmVmPScjL3N0b3JhZ2UnXVwiKS5jbGljayh7IGRlbGF5OiAxMDAwIH0pO1xuICAgICAgYXdhaXQgcGFnZS5sb2NhdG9yKFwiYVtocmVmPScjL3N0b3JhZ2UnXVwiKS5jbGljayh7IGRlbGF5OiAxMDAwIH0pO1xuICAgICAgYXdhaXQgcGFnZS5sb2NhdG9yKFwiYVtocmVmPScjL3N0b3JhZ2UvdGFyZ2V0LWRldmljZSddXCIpLmNsaWNrKCk7XG4gICAgICBhd2FpdCBwYWdlLmxvY2F0b3IoXCJzcGFuOjotcC10ZXh0KCdzdG9yYWdlIHRlY2hzJylcIikuY2xpY2soKTtcbiAgICAgIGF3YWl0IHBhZ2UubG9jYXRvcihcInNwYW46Oi1wLXRleHQoJ0RBU0QnKVwiKS5jbGljayh7IGRlbGF5OiAxMDAwIH0pO1xuXG4gICAgICAvLyBFbmFibGluZyBEQVNEIGRldmljZSwgYnkgZGVmYXVsdCBpdCBpcyBhbHdheXMgZGlzYWJsZWRcbiAgICAgIGF3YWl0IHBhZ2UubG9jYXRvcihcImlucHV0W25hbWU9J2NoZWNrcm93MCddXCIpLmNsaWNrKHsgZGVsYXk6IDEwMDAgfSk7XG4gICAgICBhd2FpdCBwYWdlLmxvY2F0b3IoXCJzcGFuOjotcC10ZXh0KCdQZXJmb3JtIGFuIGFjdGlvbicpXCIpLmNsaWNrKHsgZGVsYXk6IDEwMDAgfSk7XG4gICAgICBhd2FpdCBwYWdlLmxvY2F0b3IoXCJzcGFuOjotcC10ZXh0KCdBY3RpdmF0ZScpXCIpLmNsaWNrKCk7XG5cbiAgICAgIC8vIFNlbGVjdGluZyBpbnN0YWxsYXRpb24gZGV2aWNlXG4gICAgICBhd2FpdCBwYWdlLmxvY2F0b3IoXCJhW2hyZWY9JyMvc3RvcmFnZSddXCIpLmNsaWNrKCk7XG4gICAgICBhd2FpdCBwYWdlLmxvY2F0b3IoXCJhW2hyZWY9JyMvc3RvcmFnZS90YXJnZXQtZGV2aWNlJ11cIikuY2xpY2soeyBkZWxheTogMTAwMCB9KTtcbiAgICAgIGF3YWl0IHBhZ2UubG9jYXRvcihcImlucHV0W2FyaWEtbGFiZWw9J1NlbGVjdCByb3cgMCddXCIpLmNsaWNrKCk7XG4gICAgICBhd2FpdCBwYWdlLmxvY2F0b3IoXCJidXR0b25bZm9ybT0ndGFyZ2V0U2VsZWN0aW9uJ11cIikuY2xpY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIGl0KFwic2hvdWxkIGJlIHJlYWR5IGZvciBpbnN0YWxsYXRpb25cIiwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IHBhZ2UubG9jYXRvcihcImFbaHJlZj0nIy9vdmVydmlldyddXCIpLmNsaWNrKCk7XG4gICAgYXdhaXQgcGFnZS5sb2NhdG9yKFwiaDQ6Oi1wLXRleHQoJ1JlYWR5IGZvciBpbnN0YWxsYXRpb24nKVwiKS53YWl0KCk7XG4gIH0pO1xuXG4gIC8vIEZvciBkZXZlbG9wbWVudCB3aWxsIGJlIHVzZWZ1bCB0byBzdG9wIGJlZm9yZSBzdGFydGluZyBpbnN0YWxsYXRpb25cbiAgaWYgKGFnYW1hSW5zdGFsbCA9PT0gdHJ1ZSkge1xuICAgIGl0KFwic2hvdWxkIHN0YXJ0IGluc3RhbGxhdGlvblwiLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyB0b2RvOiBidXR0b24gaXMgbW92aW5nIGluIHRoZSBwYWdlIGFuZCBmYWlscyBpbiBzbG93IG1hY2hpbmVzXG4gICAgICBhd2FpdCBzbGVlcCgyMDAwKTtcbiAgICAgIGF3YWl0IHBhZ2UubG9jYXRvcihcImJ1dHRvbjo6LXAtdGV4dCgnSW5zdGFsbCcpXCIpLmNsaWNrKCk7XG4gICAgICBhd2FpdCBwYWdlLmxvY2F0b3IoXCJidXR0b246Oi1wLXRleHQoJ0NvbnRpbnVlJylcIikuY2xpY2soKTtcbiAgICAgIGF3YWl0IHBhZ2UubG9jYXRvcihcIjo6LXAtdGV4dChJbnN0YWxsaW5nIHRoZSlcIikud2FpdCgpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJzaG91bGQgZmluaXNoIGluc3RhbGxhdGlvblwiLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBwYWdlXG4gICAgICAgIC5sb2NhdG9yKFwiaDI6Oi1wLXRleHQoJ0NvbmdyYXR1bGF0aW9ucyEnKVwiKVxuICAgICAgICAuc2V0VGltZW91dCgxNSAqIDYwICogMTAwMClcbiAgICAgICAgLndhaXQoKTtcbiAgICB9LCAxNSAqIDYwICogMTAwMCk7XG4gIH1cbn0pO1xuIiwiZnVuY3Rpb24gd2VicGFja0VtcHR5Q29udGV4dChyZXEpIHtcblx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdHRocm93IGU7XG59XG53ZWJwYWNrRW1wdHlDb250ZXh0LmtleXMgPSAoKSA9PiAoW10pO1xud2VicGFja0VtcHR5Q29udGV4dC5yZXNvbHZlID0gd2VicGFja0VtcHR5Q29udGV4dDtcbndlYnBhY2tFbXB0eUNvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL3lhcmdzLXBhcnNlci9idWlsZCBzeW5jIHJlY3Vyc2l2ZVwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlDb250ZXh0OyIsImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUNvbnRleHQocmVxKSB7XG5cdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHR0aHJvdyBlO1xufVxud2VicGFja0VtcHR5Q29udGV4dC5rZXlzID0gKCkgPT4gKFtdKTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gXCIuL25vZGVfbW9kdWxlcy95YXJncy9idWlsZCBzeW5jIHJlY3Vyc2l2ZVwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlDb250ZXh0OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzc2VydFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJidWZmZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25zdGFudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRuc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJldmVudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnMvcHJvbWlzZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTphc3NlcnQvc3RyaWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmV2ZW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnByb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTp0ZXN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFkbGluZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHJlYW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidGxzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR0eVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ6bGliXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fO1xuXG4vLyB0aGUgc3RhcnR1cCBmdW5jdGlvblxuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0gKCkgPT4ge1xuXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcblx0dmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19jb21tYW5kZXJfZXNtX21qcy1ub2RlX21vZHVsZXNfcHVwcGV0ZWVyLWNvcmVfbGliX2VzbV9wdXBwZXRlZXJfcHVwcGV0ZWUtOTI3NzlmXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3Rlc3QtZGVmYXVsdC1pbnN0YWxsYXRpb24udHNcIikpKVxuXHRfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuXHRyZXR1cm4gX193ZWJwYWNrX2V4cG9ydHNfXztcbn07XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5mID0ge307XG4vLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4vLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uZSA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmYpLnJlZHVjZSgocHJvbWlzZXMsIGtleSkgPT4ge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZltrZXldKGNodW5rSWQsIHByb21pc2VzKTtcblx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdH0sIFtdKSk7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rcyBhbmQgc2libGluZyBjaHVua3MgZm9yIHRoZSBlbnRyeXBvaW50XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuY2pzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGNodW5rc1xuLy8gXCIxXCIgbWVhbnMgXCJsb2FkZWRcIiwgb3RoZXJ3aXNlIG5vdCBsb2FkZWQgeWV0XG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInRlc3QtZGVmYXVsdC1pbnN0YWxsYXRpb25cIjogMVxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLnJlcXVpcmUgPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSk7XG5cbnZhciBpbnN0YWxsQ2h1bmsgPSAoY2h1bmspID0+IHtcblx0dmFyIG1vcmVNb2R1bGVzID0gY2h1bmsubW9kdWxlcywgY2h1bmtJZHMgPSBjaHVuay5pZHMsIHJ1bnRpbWUgPSBjaHVuay5ydW50aW1lO1xuXHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBjaHVua0lkcy5sZW5ndGg7IGkrKylcblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHNbaV1dID0gMTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5PKCk7XG59O1xuXG4vLyByZXF1aXJlKCkgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLnJlcXVpcmUgPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0Ly8gXCIxXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG5cdGlmKCFpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0aW5zdGFsbENodW5rKHJlcXVpcmUoXCIuL1wiICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpKSk7XG5cdFx0fSBlbHNlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDE7XG5cdH1cbn07XG5cbi8vIG5vIGV4dGVybmFsIGluc3RhbGwgY2h1bmtcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdCIsInZhciBuZXh0ID0gX193ZWJwYWNrX3JlcXVpcmVfXy54O1xuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0gKCkgPT4ge1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19jb21tYW5kZXJfZXNtX21qcy1ub2RlX21vZHVsZXNfcHVwcGV0ZWVyLWNvcmVfbGliX2VzbV9wdXBwZXRlZXJfcHVwcGV0ZWUtOTI3NzlmXCIpO1xuXHRyZXR1cm4gbmV4dCgpO1xufTsiLCIiLCIvLyBtb2R1bGUgY2FjaGUgYXJlIHVzZWQgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHJ1biBzdGFydHVwXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18ueCgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9