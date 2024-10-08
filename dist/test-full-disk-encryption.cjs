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

/***/ "./src/pages/storage-encryption-page.ts":
/*!**********************************************!*\
  !*** ./src/pages/storage-encryption-page.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageEncryptionPage: () => (/* binding */ StorageEncryptionPage)
/* harmony export */ });
class StorageEncryptionPage {
    page;
    encryptTheSystemCheckbox = () => this.page.locator("label[class='pf-v5-c-switch'] > input[type='checkbox']");
    passwordInput = () => this.page.locator("#password");
    passwordConfirmationInput = () => this.page.locator("#passwordConfirmation");
    acceptButton = () => this.page.locator("button::-p-text(Accept)");
    constructor(page) {
        this.page = page;
    }
    async encrypt(password) {
        await this.encryptTheSystemCheckbox().click();
        await this.passwordInput().fill(password);
        await this.passwordConfirmationInput().fill(password);
        await this.acceptButton().click();
    }
}


/***/ }),

/***/ "./src/pages/storage-page.ts":
/*!***********************************!*\
  !*** ./src/pages/storage-page.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoragePage: () => (/* binding */ StoragePage)
/* harmony export */ });
class StoragePage {
    page;
    enableButton = () => this.page.locator("button::-p-text(Enable)");
    enabledDiv = () => this.page.locator("div::-p-text(enabled)");
    constructor(page) {
        this.page = page;
    }
    async enableEncryption() {
        await this.enableButton().click();
    }
    async verifyEncryptionEnabled() {
        await this.enabledDiv().wait();
    }
}


/***/ }),

/***/ "./src/test-full-disk-encryption.ts":
/*!******************************************!*\
  !*** ./src/test-full-disk-encryption.ts ***!
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
/* harmony import */ var _pages_storage_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/storage-page */ "./src/pages/storage-page.ts");
/* harmony import */ var _pages_storage_encryption_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/storage-encryption-page */ "./src/pages/storage-encryption-page.ts");
/* harmony import */ var _pages_sidebar_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/sidebar-page */ "./src/pages/sidebar-page.ts");










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
(0,node_test__WEBPACK_IMPORTED_MODULE_3__.describe)("full disk encryption", function () {
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
    it("should allows logging in", async function () {
        const loginAsRoot = new _pages_login_as_root_page__WEBPACK_IMPORTED_MODULE_6__.LoginAsRootPage(page);
        await loginAsRoot.logIn(_configuration__WEBPACK_IMPORTED_MODULE_5__.options.password);
    });
    it("should enable encryption", async function () {
        const storage = new _pages_storage_page__WEBPACK_IMPORTED_MODULE_7__.StoragePage(page);
        const storageEncryption = new _pages_storage_encryption_page__WEBPACK_IMPORTED_MODULE_8__.StorageEncryptionPage(page);
        const sidebar = new _pages_sidebar_page__WEBPACK_IMPORTED_MODULE_9__.SidebarPage(page);
        await sidebar.goToStorage();
        await storage.enableEncryption();
        await storageEncryption.encrypt(_configuration__WEBPACK_IMPORTED_MODULE_5__.options.password);
        await storage.verifyEncryptionEnabled();
    });
    it("should be ready for installation", async function () {
        const sidebar = new _pages_sidebar_page__WEBPACK_IMPORTED_MODULE_9__.SidebarPage(page);
        await sidebar.goToOverview();
        await page.locator("button::-p-text(Install)").wait();
    });
    if (agamaInstall === true) {
        it("should start installation", async function () {
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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_commander_esm_mjs-node_modules_puppeteer-core_lib_esm_puppeteer_puppetee-92779f"], () => (__webpack_require__(__webpack_require__.s = "./src/test-full-disk-encryption.ts")))
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
/******/ 			"test-full-disk-encryption": 1
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7Ozs7O1dDUkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NKQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NKQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxnQkFBZ0IscUJBQXFCO1dBQ3JDO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGFBQWE7V0FDYjtXQUNBLElBQUk7V0FDSjtXQUNBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztVRUpBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC8uL3NyYy9jb25maWd1cmF0aW9uLnRzIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC8uL3NyYy9wYWdlcy9sb2dpbi1hcy1yb290LXBhZ2UudHMiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0Ly4vc3JjL3BhZ2VzL3NpZGViYXItcGFnZS50cyIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvLi9zcmMvcGFnZXMvc3RvcmFnZS1lbmNyeXB0aW9uLXBhZ2UudHMiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0Ly4vc3JjL3BhZ2VzL3N0b3JhZ2UtcGFnZS50cyIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvLi9zcmMvdGVzdC1mdWxsLWRpc2stZW5jcnlwdGlvbi50cyIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvLi9ub2RlX21vZHVsZXMveWFyZ3MtcGFyc2VyL2J1aWxkLyBzeW5jIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC8uL25vZGVfbW9kdWxlcy95YXJncy9idWlsZC8gc3luYyIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImFzc2VydFwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiYnVmZmVyXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJjb25zdGFudHNcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImNyeXB0b1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZG5zXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJldmVudHNcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJmcy9wcm9taXNlc1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5ldFwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTphc3NlcnQvc3RyaWN0XCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6ZXZlbnRzXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmZzXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOnBhdGhcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6cHJvY2Vzc1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTp0ZXN0XCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJvc1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwicGF0aFwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwicHJvY2Vzc1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwicmVhZGxpbmVcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInN0cmVhbVwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidGxzXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJ0dHlcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInVybFwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidXRpbFwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiemxpYlwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL3JlcXVpcmUgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL3N0YXJ0dXAgY2h1bmsgZGVwZW5kZW5jaWVzIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0eXBlIFN1cHBvcnRlZEJyb3dzZXIsIHR5cGUgUHJvdG9jb2xUeXBlIH0gZnJvbSBcInB1cHBldGVlci1jb3JlXCI7XG5cbmltcG9ydCB7IHByb2dyYW0sIE9wdGlvbiB9IGZyb20gXCJjb21tYW5kZXJcIjtcbmltcG9ydCAqIGFzIGNvbW1hbmRlciBmcm9tIFwiY29tbWFuZGVyXCI7XG5cbi8vIGhlbHBlciBmdW5jdGlvbiBmb3IgY29udmVydGluZyBTdHJpbmcgdG8gQm9vbGVhblxuZnVuY3Rpb24gYm9vbGVhbkVudihuYW1lOiBzdHJpbmcsIGRlZmF1bHRfdmFsdWU6IGJvb2xlYW4pIHtcbiAgY29uc3QgZW52ID0gcHJvY2Vzcy5lbnZbbmFtZV07XG4gIGlmIChlbnYgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBkZWZhdWx0X3ZhbHVlO1xuICB9XG4gIHN3aXRjaCAoZW52LnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlIFwiMFwiOlxuICAgIGNhc2UgXCJmYWxzZVwiOlxuICAgIGNhc2UgXCJvZmZcIjpcbiAgICBjYXNlIFwiZGlzYWJsZWRcIjpcbiAgICBjYXNlIFwibm9cIjpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiMVwiOlxuICAgIGNhc2UgXCJ0cnVlXCI6XG4gICAgY2FzZSBcIm9uXCI6XG4gICAgY2FzZSBcImVuYWJsZWRcIjpcbiAgICBjYXNlIFwieWVzXCI6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGRlZmF1bHRfdmFsdWU7XG4gIH1cbn1cblxuaW50ZXJmYWNlIEJyb3dzZXJTZXR0aW5ncyB7XG4gIGJyb3dzZXI6IFN1cHBvcnRlZEJyb3dzZXI7XG4gIGV4ZWN1dGFibGVQYXRoOiBzdHJpbmc7XG59XG5cbi8vIGhlbHBlciBmdW5jdGlvbiBmb3IgY29uZmlndXJpbmcgdGhlIGJyb3dzZXJcbmZ1bmN0aW9uIGJyb3dzZXJTZXR0aW5ncyhuYW1lOiBzdHJpbmcpOiBCcm93c2VyU2V0dGluZ3Mge1xuICBzd2l0Y2ggKG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgXCJmaXJlZm94XCI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBicm93c2VyOiBcImZpcmVmb3hcIixcbiAgICAgICAgZXhlY3V0YWJsZVBhdGg6IFwiL3Vzci9iaW4vZmlyZWZveFwiLFxuICAgICAgfTtcbiAgICBjYXNlIFwiY2hyb21lXCI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBicm93c2VyOiBcImNocm9tZVwiLFxuICAgICAgICBleGVjdXRhYmxlUGF0aDogXCIvdXNyL2Jpbi9nb29nbGUtY2hyb21lLXN0YWJsZVwiLFxuICAgICAgfTtcbiAgICBjYXNlIFwiY2hyb21pdW1cIjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJyb3dzZXI6IFwiY2hyb21lXCIsXG4gICAgICAgIGV4ZWN1dGFibGVQYXRoOiBcIi91c3IvYmluL2Nocm9taXVtXCIsXG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGJyb3dzZXIgdHlwZTogJHtuYW1lfWApO1xuICB9XG59XG5cbi8vIHBhcnNlIGNvbW1hbmQgbGluZSBhcmd1bWVudCBhcyBhbiBpbnRlZ2VyXG5mdW5jdGlvbiBnZXRJbnQodmFsdWU6IHN0cmluZykge1xuICAvLyBwYXJzZSB0aGUgdmFsdWUgYXMgYSBkZWNpbWFsIG51bWJlciAoYmFzZSAxMClcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgaWYgKGlzTmFOKHBhcnNlZCkpIHtcbiAgICB0aHJvdyBuZXcgY29tbWFuZGVyLkludmFsaWRBcmd1bWVudEVycm9yKFwiRW50ZXIgYSB2YWxpZCBudW1iZXIuXCIpO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn1cblxuLy8gZGVmaW5lIHRoZSBjb21tYW5kIGxpbmUgYXJndW1lbnRzIGFuZCBwYXJzZSB0aGVtXG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RqL2NvbW1hbmRlci5qc1xucHJvZ3JhbVxuICAuZGVzY3JpcHRpb24oXCJSdW4gYSBzaW1wbGUgQWdhbWEgaW50ZWdyYXRpb24gdGVzdFwiKVxuICAub3B0aW9uKFwiLXUsIC0tdXJsIDx1cmw+XCIsIFwiQWdhbWEgc2VydmVyIFVSTFwiLCBcImh0dHA6Ly9sb2NhbGhvc3RcIilcbiAgLm9wdGlvbihcIi1wLCAtLXBhc3N3b3JkIDxwYXNzd29yZD5cIiwgXCJBZ2FtYSBsb2dpbiBwYXNzd29yZFwiLCBcIm5vdHMzY3IzdFwiKVxuICAuYWRkT3B0aW9uKG5ldyBPcHRpb24oXCItYiwgLS1icm93c2VyIDxicm93c2VyPlwiLCBcIkJyb3dzZXIgdXNlZCBmb3IgcnVubmluZyB0aGUgdGVzdFwiKVxuICAgIC5jaG9pY2VzKFtcImZpcmVmb3hcIiwgXCJjaHJvbWVcIiwgXCJjaHJvbWl1bVwiXSlcbiAgICAuZGVmYXVsdChcImZpcmVmb3hcIilcbiAgKVxuICAub3B0aW9uKFwiLWgsIC0taGVhZGVkXCIsIFwiUnVuIHRoZSBicm93c2VyIGluIGhlYWRlZCBtb2RlIHdpdGggVUkgKHRoZSBkZWZhdWx0IGlzIGhlYWRsZXNzIG1vZGUpXCIpXG4gIC5hZGRPcHRpb24obmV3IE9wdGlvbihcIi1kLCAtLWRlbGF5IDxtaWxpc2Vjb25kcz5cIiwgXCJEZWxheSBiZXR3ZWVuIHRoZSBicm93c2VyIGFjdGlvbnMsIHVzZWZ1bCBpbiBoZWFkZWQgbW9kZVwiKVxuICAgIC5hcmdQYXJzZXIoZ2V0SW50KVxuICAgIC5kZWZhdWx0KDApXG4gIClcbiAgLm9wdGlvbihcIi1jLCAtLWNvbnRpbnVlXCIsIFwiQ29udGludWUgdGhlIHRlc3QgYWZ0ZXIgYSBmYWlsdXJlICh0aGUgZGVmYXVsdCBpcyBhYm9ydCBvbiBlcnJvcilcIilcbiAgLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbi8vIHBhcnNlIG9wdGlvbnMgZnJvbSB0aGUgY29tbWFuZCBsaW5lXG5jb25zdCBvcHRpb25zID0gcHJvZ3JhbS5vcHRzKCk7XG5cbmNvbnN0IHB1cHBldGVlckxhdW5jaE9wdGlvbnMgPSB7XG4gIC8vIFwid2ViRHJpdmVyQmlEaVwiIGRvZXMgbm90IHdvcmsgd2l0aCBvbGQgRmlyZUZveCwgY29tbWVudCBpdCBvdXQgaWYgbmVlZGVkXG4gIHByb3RvY29sOiBcIndlYkRyaXZlckJpRGlcIiBhcyBQcm90b2NvbFR5cGUsXG4gIGhlYWRsZXNzOiAhb3B0aW9ucy5oZWFkZWQsXG4gIGFjY2VwdEluc2VjdXJlQ2VydHM6IHRydWUsXG4gIHRpbWVvdXQ6IDMwMDAwLFxuICBzbG93TW86IG9wdGlvbnMuZGVsYXksXG4gIGRlZmF1bHRWaWV3cG9ydDoge1xuICAgIHdpZHRoOiAxMjgwLFxuICAgIGhlaWdodDogNzY4XG4gIH0sXG4gIC4uLmJyb3dzZXJTZXR0aW5ncyhvcHRpb25zLmJyb3dzZXIpXG59XG5cbmZ1bmN0aW9uIHNsZWVwKG1zOiBudW1iZXIpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xufVxuXG5leHBvcnQgeyBib29sZWFuRW52LCBvcHRpb25zLCBwdXBwZXRlZXJMYXVuY2hPcHRpb25zLCBzbGVlcCB9O1xuIiwiaW1wb3J0IHB1cHBldGVlciwgeyB0eXBlIFBhZ2UgfSBmcm9tIFwicHVwcGV0ZWVyLWNvcmVcIjtcblxuZXhwb3J0IGNsYXNzIExvZ2luQXNSb290UGFnZSB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwYWdlOiBQYWdlO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGFzc3dvcmRJbnB1dCA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiaW5wdXQjcGFzc3dvcmRcIik7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dJbkJ1dHRvbiA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiYnV0dG9uW3R5cGU9J3N1Ym1pdCddXCIpO1xuXG4gICAgY29uc3RydWN0b3IocGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cblxuICAgIGFzeW5jIGxvZ0luKHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5wYXNzd29yZElucHV0KCkuZmlsbChwYXNzd29yZCk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9nSW5CdXR0b24oKS5jbGljaygpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IHR5cGUgUGFnZSB9IGZyb20gXCJwdXBwZXRlZXItY29yZVwiO1xuXG5leHBvcnQgY2xhc3MgU2lkZWJhclBhZ2Uge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGFnZTogUGFnZTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IG92ZXJ2aWV3TGluayA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiYVtocmVmPScjL292ZXJ2aWV3J11cIik7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2NhbGl6YXRpb25MaW5rID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJhW2hyZWY9JyMvbDEwbiddXCIpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbmV0d29ya0xpbmsgPSAoKSA9PiB0aGlzLnBhZ2UubG9jYXRvcihcImFbaHJlZj0nIy9uZXR3b3JrJ11cIik7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzdG9yYWdlTGluayA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiYVtocmVmPScjL3N0b3JhZ2UnXVwiKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNvZnR3YXJlTGluayA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiYVtocmVmPScjL3NvZnR3YXJlJ11cIik7XG4gICAgcHJpdmF0ZSByZWFkb25seSB1c2Vyc0xpbmsgPSAoKSA9PiB0aGlzLnBhZ2UubG9jYXRvcihcImFbaHJlZj0nIy91c2VycyddXCIpO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG5cbiAgICBhc3luYyBnb1RvT3ZlcnZpZXcoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMub3ZlcnZpZXdMaW5rKCkuY2xpY2soKTtcbiAgICB9XG5cbiAgICBhc3luYyBnb1RvTG9jYWxpemF0aW9uKCkge1xuICAgICAgICBhd2FpdCB0aGlzLmxvY2FsaXphdGlvbkxpbmsoKS5jbGljaygpO1xuICAgIH1cblxuICAgIGFzeW5jIGdvVG9OZXR3b3JrKCkge1xuICAgICAgICBhd2FpdCB0aGlzLm5ldHdvcmtMaW5rKCkuY2xpY2soKTtcbiAgICB9XG5cbiAgICBhc3luYyBnb1RvU3RvcmFnZSgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlTGluaygpLmNsaWNrKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ29Ub1NvZnR3YXJlKCkge1xuICAgICAgICBhd2FpdCB0aGlzLnNvZnR3YXJlTGluaygpLmNsaWNrKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ29Ub1VzZXJzKCkge1xuICAgICAgICBhd2FpdCB0aGlzLnVzZXJzTGluaygpLmNsaWNrKCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyB0eXBlIFBhZ2UgfSBmcm9tIFwicHVwcGV0ZWVyLWNvcmVcIjtcblxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VFbmNyeXB0aW9uUGFnZSB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwYWdlOiBQYWdlO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZW5jcnlwdFRoZVN5c3RlbUNoZWNrYm94ID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJsYWJlbFtjbGFzcz0ncGYtdjUtYy1zd2l0Y2gnXSA+IGlucHV0W3R5cGU9J2NoZWNrYm94J11cIik7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwYXNzd29yZElucHV0ID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCIjcGFzc3dvcmRcIik7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwYXNzd29yZENvbmZpcm1hdGlvbklucHV0ID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCIjcGFzc3dvcmRDb25maXJtYXRpb25cIik7XG4gICAgcHJpdmF0ZSByZWFkb25seSBhY2NlcHRCdXR0b24gPSAoKSA9PiB0aGlzLnBhZ2UubG9jYXRvcihcImJ1dHRvbjo6LXAtdGV4dChBY2NlcHQpXCIpO1xuXG4gICAgY29uc3RydWN0b3IocGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cblxuICAgIGFzeW5jIGVuY3J5cHQocGFzc3dvcmQ6IHN0cmluZykge1xuICAgICAgICBhd2FpdCB0aGlzLmVuY3J5cHRUaGVTeXN0ZW1DaGVja2JveCgpLmNsaWNrKCk7XG4gICAgICAgIGF3YWl0IHRoaXMucGFzc3dvcmRJbnB1dCgpLmZpbGwocGFzc3dvcmQpO1xuICAgICAgICBhd2FpdCB0aGlzLnBhc3N3b3JkQ29uZmlybWF0aW9uSW5wdXQoKS5maWxsKHBhc3N3b3JkKTtcbiAgICAgICAgYXdhaXQgdGhpcy5hY2NlcHRCdXR0b24oKS5jbGljaygpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IHR5cGUgUGFnZSB9IGZyb20gXCJwdXBwZXRlZXItY29yZVwiO1xuXG5leHBvcnQgY2xhc3MgU3RvcmFnZVBhZ2Uge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGFnZTogUGFnZTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVuYWJsZUJ1dHRvbiA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiYnV0dG9uOjotcC10ZXh0KEVuYWJsZSlcIik7XG4gICAgcHJpdmF0ZSByZWFkb25seSBlbmFibGVkRGl2ID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJkaXY6Oi1wLXRleHQoZW5hYmxlZClcIik7XG4gICAgXG4gICAgY29uc3RydWN0b3IocGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cblxuICAgIGFzeW5jIGVuYWJsZUVuY3J5cHRpb24oKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZW5hYmxlQnV0dG9uKCkuY2xpY2soKTtcbiAgICB9XG5cbiAgICBhc3luYyB2ZXJpZnlFbmNyeXB0aW9uRW5hYmxlZCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5lbmFibGVkRGl2KCkud2FpdCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCBwdXBwZXRlZXIsIHsgdHlwZSBCcm93c2VyLCB0eXBlIFBhZ2UgfSBmcm9tIFwicHVwcGV0ZWVyLWNvcmVcIjtcblxuaW1wb3J0IHsgaXQgYXMgdGVzdEl0LCBkZXNjcmliZSwgYmVmb3JlLCBhZnRlciB9IGZyb20gXCJub2RlOnRlc3RcIjtcbmltcG9ydCBhc3NlcnQgZnJvbSBcIm5vZGU6YXNzZXJ0L3N0cmljdFwiO1xuXG5pbXBvcnQgeyBib29sZWFuRW52LCBvcHRpb25zLCBwdXBwZXRlZXJMYXVuY2hPcHRpb25zIH0gZnJvbSBcIi4vY29uZmlndXJhdGlvblwiO1xuXG5pbXBvcnQgeyBMb2dpbkFzUm9vdFBhZ2UgfSBmcm9tIFwiLi9wYWdlcy9sb2dpbi1hcy1yb290LXBhZ2VcIjtcbmltcG9ydCB7IFN0b3JhZ2VQYWdlIH0gZnJvbSBcIi4vcGFnZXMvc3RvcmFnZS1wYWdlXCI7XG5pbXBvcnQgeyBTdG9yYWdlRW5jcnlwdGlvblBhZ2UgfSBmcm9tIFwiLi9wYWdlcy9zdG9yYWdlLWVuY3J5cHRpb24tcGFnZVwiO1xuaW1wb3J0IHsgU2lkZWJhclBhZ2UgfSBmcm9tIFwiLi9wYWdlcy9zaWRlYmFyLXBhZ2VcIjtcblxubGV0IHBhZ2U6IFBhZ2U7XG5sZXQgYnJvd3NlcjogQnJvd3NlcjtcbmxldCBmYWlsZWQgPSBmYWxzZTtcblxuLy8gZGVmaW5lIGl0KCkgYXMgYSB3cmFwcGVyIHdoaWNoIGR1bXBzIHRoZSBwYWdlIG9uIGEgZmFpbHVyZVxuYXN5bmMgZnVuY3Rpb24gaXQobGFiZWw6IHN0cmluZywgdGVzdDogKCkgPT4gUHJvbWlzZTx2b2lkPiwgdGltZW91dD86IG51bWJlcikge1xuICB0ZXN0SXQobGFiZWwsXG4gICAgLy8gYWJvcnQgd2hlbiB0aGUgdGVzdCB0YWtlcyBtb3JlIHRoYW4gb25lIG1pbnV0ZVxuICAgIHsgdGltZW91dDogdGltZW91dCB8fCA2MDAwMCB9LFxuICAgIGFzeW5jICh0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgIHQuc2tpcCgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBhd2FpdCB0ZXN0KCk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmNvbnRpbnVlKSBmYWlsZWQgPSB0cnVlO1xuICAgICAgICBpZiAocGFnZSkge1xuICAgICAgICAgIC8vIGRpcmVjdG9yeSBmb3Igc3RvcmluZyB0aGUgZGF0YVxuICAgICAgICAgIGNvbnN0IGRpciA9IFwibG9nXCI7XG4gICAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcikpIGZzLm1rZGlyU3luYyhkaXIpO1xuXG4gICAgICAgICAgLy8gYmFzZSBmaWxlIG5hbWUgZm9yIHRoZSBkdW1wc1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBwYXRoLmpvaW4oZGlyLCBsYWJlbC5yZXBsYWNlKC9bXmEtekEtWjAtOV0vZywgXCJfXCIpKTtcbiAgICAgICAgICBhd2FpdCBwYWdlLnNjcmVlbnNob3QoeyBwYXRoOiBuYW1lICsgXCIucG5nXCIgfSk7XG4gICAgICAgICAgY29uc3QgaHRtbCA9IGF3YWl0IHBhZ2UuY29udGVudCgpO1xuICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMobmFtZSArIFwiLmh0bWxcIiwgaHRtbCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUZXN0IGZhaWxlZCFcIiwgeyBjYXVzZTogZXJyb3IgfSk7XG4gICAgICB9XG4gICAgfSk7XG59O1xuXG5jb25zdCBhZ2FtYUluc3RhbGwgPSBib29sZWFuRW52KFwiQUdBTUFfSU5TVEFMTFwiLCB0cnVlKTtcblxuZGVzY3JpYmUoXCJmdWxsIGRpc2sgZW5jcnlwdGlvblwiLCBmdW5jdGlvbiAoKSB7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYnJvd3NlciA9IGF3YWl0IHB1cHBldGVlci5sYXVuY2gocHVwcGV0ZWVyTGF1bmNoT3B0aW9ucyk7XG4gICAgcGFnZSA9IGF3YWl0IGJyb3dzZXIubmV3UGFnZSgpO1xuICAgIHBhZ2Uuc2V0RGVmYXVsdFRpbWVvdXQoMjAwMDApO1xuICAgIGF3YWl0IHBhZ2UuZ290byhvcHRpb25zLnVybCwgeyB0aW1lb3V0OiA2MDAwMCwgd2FpdFVudGlsOiBcImRvbWNvbnRlbnRsb2FkZWRcIiB9KTtcbiAgfSk7XG5cbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IHBhZ2UuY2xvc2UoKTtcbiAgICBhd2FpdCBicm93c2VyLmNsb3NlKCk7XG4gIH0pXG5cbiAgaXQoXCJzaG91bGQgaGF2ZSBBZ2FtYSBwYWdlIHRpdGxlXCIsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGF3YWl0IHBhZ2UudGl0bGUoKSwgXCJBZ2FtYVwiKTtcbiAgfSk7XG5cbiAgaXQoXCJzaG91bGQgYWxsb3dzIGxvZ2dpbmcgaW5cIiwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGxvZ2luQXNSb290ID0gbmV3IExvZ2luQXNSb290UGFnZShwYWdlKTtcbiAgICBhd2FpdCBsb2dpbkFzUm9vdC5sb2dJbihvcHRpb25zLnBhc3N3b3JkKTtcbiAgfSk7XG5cbiAgaXQoXCJzaG91bGQgZW5hYmxlIGVuY3J5cHRpb25cIiwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHN0b3JhZ2UgPSBuZXcgU3RvcmFnZVBhZ2UocGFnZSk7XG4gICAgY29uc3Qgc3RvcmFnZUVuY3J5cHRpb24gPSBuZXcgU3RvcmFnZUVuY3J5cHRpb25QYWdlKHBhZ2UpO1xuICAgIGNvbnN0IHNpZGViYXIgPSBuZXcgU2lkZWJhclBhZ2UocGFnZSk7XG5cbiAgICBhd2FpdCBzaWRlYmFyLmdvVG9TdG9yYWdlKCk7XG4gICAgYXdhaXQgc3RvcmFnZS5lbmFibGVFbmNyeXB0aW9uKCk7XG4gICAgYXdhaXQgc3RvcmFnZUVuY3J5cHRpb24uZW5jcnlwdChvcHRpb25zLnBhc3N3b3JkKTtcbiAgICBhd2FpdCBzdG9yYWdlLnZlcmlmeUVuY3J5cHRpb25FbmFibGVkKCk7XG4gIH0pO1xuXG4gIGl0KFwic2hvdWxkIGJlIHJlYWR5IGZvciBpbnN0YWxsYXRpb25cIiwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHNpZGViYXIgPSBuZXcgU2lkZWJhclBhZ2UocGFnZSk7XG4gICAgYXdhaXQgc2lkZWJhci5nb1RvT3ZlcnZpZXcoKTtcbiAgICBhd2FpdCBwYWdlLmxvY2F0b3IoXCJidXR0b246Oi1wLXRleHQoSW5zdGFsbClcIikud2FpdCgpO1xuICB9KTtcblxuICBpZiAoYWdhbWFJbnN0YWxsID09PSB0cnVlKSB7XG4gICAgaXQoXCJzaG91bGQgc3RhcnQgaW5zdGFsbGF0aW9uXCIsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IHBhZ2UubG9jYXRvcihcImJ1dHRvbjo6LXAtdGV4dCgnSW5zdGFsbCcpXCIpLmNsaWNrKCk7XG4gICAgICBhd2FpdCBwYWdlLmxvY2F0b3IoXCJidXR0b246Oi1wLXRleHQoJ0NvbnRpbnVlJylcIikuY2xpY2soKTtcbiAgICAgIGF3YWl0IHBhZ2UubG9jYXRvcihcIjo6LXAtdGV4dChJbnN0YWxsaW5nIHRoZSlcIikud2FpdCgpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJzaG91bGQgZmluaXNoIGluc3RhbGxhdGlvblwiLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBwYWdlXG4gICAgICAgIC5sb2NhdG9yKFwiaDI6Oi1wLXRleHQoJ0NvbmdyYXR1bGF0aW9ucyEnKVwiKVxuICAgICAgICAuc2V0VGltZW91dCgxNSAqIDYwICogMTAwMClcbiAgICAgICAgLndhaXQoKTtcbiAgICB9LCAxNSAqIDYwICogMTAwMCk7XG4gIH1cbn0pO1xuIiwiZnVuY3Rpb24gd2VicGFja0VtcHR5Q29udGV4dChyZXEpIHtcblx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdHRocm93IGU7XG59XG53ZWJwYWNrRW1wdHlDb250ZXh0LmtleXMgPSAoKSA9PiAoW10pO1xud2VicGFja0VtcHR5Q29udGV4dC5yZXNvbHZlID0gd2VicGFja0VtcHR5Q29udGV4dDtcbndlYnBhY2tFbXB0eUNvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL3lhcmdzLXBhcnNlci9idWlsZCBzeW5jIHJlY3Vyc2l2ZVwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlDb250ZXh0OyIsImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUNvbnRleHQocmVxKSB7XG5cdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHR0aHJvdyBlO1xufVxud2VicGFja0VtcHR5Q29udGV4dC5rZXlzID0gKCkgPT4gKFtdKTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gXCIuL25vZGVfbW9kdWxlcy95YXJncy9idWlsZCBzeW5jIHJlY3Vyc2l2ZVwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlDb250ZXh0OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzc2VydFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJidWZmZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25zdGFudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRuc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJldmVudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnMvcHJvbWlzZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTphc3NlcnQvc3RyaWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmV2ZW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnByb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTp0ZXN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFkbGluZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHJlYW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidGxzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR0eVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ6bGliXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fO1xuXG4vLyB0aGUgc3RhcnR1cCBmdW5jdGlvblxuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0gKCkgPT4ge1xuXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcblx0dmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19jb21tYW5kZXJfZXNtX21qcy1ub2RlX21vZHVsZXNfcHVwcGV0ZWVyLWNvcmVfbGliX2VzbV9wdXBwZXRlZXJfcHVwcGV0ZWUtOTI3NzlmXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3Rlc3QtZnVsbC1kaXNrLWVuY3J5cHRpb24udHNcIikpKVxuXHRfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuXHRyZXR1cm4gX193ZWJwYWNrX2V4cG9ydHNfXztcbn07XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5mID0ge307XG4vLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4vLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uZSA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmYpLnJlZHVjZSgocHJvbWlzZXMsIGtleSkgPT4ge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZltrZXldKGNodW5rSWQsIHByb21pc2VzKTtcblx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdH0sIFtdKSk7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rcyBhbmQgc2libGluZyBjaHVua3MgZm9yIHRoZSBlbnRyeXBvaW50XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuY2pzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGNodW5rc1xuLy8gXCIxXCIgbWVhbnMgXCJsb2FkZWRcIiwgb3RoZXJ3aXNlIG5vdCBsb2FkZWQgeWV0XG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInRlc3QtZnVsbC1kaXNrLWVuY3J5cHRpb25cIjogMVxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLnJlcXVpcmUgPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSk7XG5cbnZhciBpbnN0YWxsQ2h1bmsgPSAoY2h1bmspID0+IHtcblx0dmFyIG1vcmVNb2R1bGVzID0gY2h1bmsubW9kdWxlcywgY2h1bmtJZHMgPSBjaHVuay5pZHMsIHJ1bnRpbWUgPSBjaHVuay5ydW50aW1lO1xuXHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBjaHVua0lkcy5sZW5ndGg7IGkrKylcblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHNbaV1dID0gMTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5PKCk7XG59O1xuXG4vLyByZXF1aXJlKCkgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLnJlcXVpcmUgPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0Ly8gXCIxXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG5cdGlmKCFpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0aW5zdGFsbENodW5rKHJlcXVpcmUoXCIuL1wiICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpKSk7XG5cdFx0fSBlbHNlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDE7XG5cdH1cbn07XG5cbi8vIG5vIGV4dGVybmFsIGluc3RhbGwgY2h1bmtcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdCIsInZhciBuZXh0ID0gX193ZWJwYWNrX3JlcXVpcmVfXy54O1xuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0gKCkgPT4ge1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19jb21tYW5kZXJfZXNtX21qcy1ub2RlX21vZHVsZXNfcHVwcGV0ZWVyLWNvcmVfbGliX2VzbV9wdXBwZXRlZXJfcHVwcGV0ZWUtOTI3NzlmXCIpO1xuXHRyZXR1cm4gbmV4dCgpO1xufTsiLCIiLCIvLyBtb2R1bGUgY2FjaGUgYXJlIHVzZWQgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHJ1biBzdGFydHVwXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18ueCgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9