#! /usr/bin/env -S node --enable-source-maps --test-timeout=60000
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/pages/software-page.ts":
/*!************************************!*\
  !*** ./src/pages/software-page.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SoftwarePage: () => (/* binding */ SoftwarePage)
/* harmony export */ });
class SoftwarePage {
    page;
    changeSelectionButton = () => this.page.locator("button::-p-text(ChangeSelection)");
    constructor(page) {
        this.page = page;
    }
    async changeSelection() {
        await this.changeSelectionButton().click();
    }
}


/***/ }),

/***/ "./src/pages/software-selection-page.ts":
/*!**********************************************!*\
  !*** ./src/pages/software-selection-page.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SoftwareSelectionPage: () => (/* binding */ SoftwareSelectionPage)
/* harmony export */ });
class SoftwareSelectionPage {
    page;
    patternCheckbox = (name = 'GNOME Desktop Environment (Wayland)') => this.page.locator(`checkbox::-p-text(${name})`);
    patternCheckbox = (name = 'KDE Applications and Plasma Desktop') => this.page.locator(`checkbox::-p-text(${name})`);
    closeButton = () => this.page.locator("button::-p-text(Close)");
    constructor(page) {
        this.page = page;
    }
    async selectGnomeDesktopEnvironment() {
        await this.patternCheckbox(name, 'GNOME Desktop Environment (Wayland)').check();
    }
    async close() {
        await this.closeButton().click();
    }
}


/***/ }),

/***/ "./src/test-graphical-environments.ts":
/*!********************************************!*\
  !*** ./src/test-graphical-environments.ts ***!
  \********************************************/
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
/* harmony import */ var _pages_login_as_root_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/login-as-root-page */ "./src/pages/login-as-root-page.ts");
/* harmony import */ var _pages_sidebar_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/sidebar-page */ "./src/pages/sidebar-page.ts");
/* harmony import */ var _pages_software_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/software-page */ "./src/pages/software-page.ts");
/* harmony import */ var _pages_software_selection_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/software-selection-page */ "./src/pages/software-selection-page.ts");









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
            if (!options.continue)
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
const agamaInstall = booleanEnv("AGAMA_INSTALL", true);
const configureDasd = booleanEnv("AGAMA_DASD", false);
const agamaDesktop = booleanEnv("AGAMA_DESKTOP", false);
const agamaUser = "bernhard";
const agamaUserFullName = "Bernhard M. Wiedemann";
(0,node_test__WEBPACK_IMPORTED_MODULE_3__.describe)("software selection", function () {
    (0,node_test__WEBPACK_IMPORTED_MODULE_3__.before)(async function () {
        browser = await puppeteer_core__WEBPACK_IMPORTED_MODULE_2__["default"].launch(puppeteerLaunchOptions);
        page = await browser.newPage();
        page.setDefaultTimeout(20000);
        await page.goto(options.url, { timeout: 60000, waitUntil: "domcontentloaded" });
    });
    (0,node_test__WEBPACK_IMPORTED_MODULE_3__.after)(async function () {
        await page.close();
        await browser.close();
    });
    it("should have Agama page title", async function () {
        node_assert_strict__WEBPACK_IMPORTED_MODULE_4___default().deepEqual(await page.title(), "Agama");
    });
    it("allows logging in", async function () {
        const loginAsRoot = new _pages_login_as_root_page__WEBPACK_IMPORTED_MODULE_5__.LoginAsRootPage(page);
        await loginAsRoot.logIn(options.password);
    });
    it("should select gnome pattern", async function () {
        const sidebar = new _pages_sidebar_page__WEBPACK_IMPORTED_MODULE_6__.SidebarPage(page);
        const software = new _pages_software_page__WEBPACK_IMPORTED_MODULE_7__.SoftwarePage(page);
        const softwareSelection = new _pages_software_selection_page__WEBPACK_IMPORTED_MODULE_8__.SoftwareSelectionPage(page);
        await sidebar.goToSoftware();
        await software.changeSelection();
        await softwareSelection.selectGnomeDesktopEnvironment();
        await softwareSelection.close();
    });
    it("should be ready for installation", async function () {
        const sidebar = new _pages_sidebar_page__WEBPACK_IMPORTED_MODULE_6__.SidebarPage(page);
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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_commander_esm_mjs-node_modules_puppeteer-core_lib_esm_puppeteer_puppetee-92779f"], () => (__webpack_require__(__webpack_require__.s = "./src/test-graphical-environments.ts")))
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
/******/ 			"test-graphical-environments": 1
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esc0RBQXNEO1dBQ3RELHNDQUFzQyxpRUFBaUU7V0FDdkc7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGOzs7OztXQ1JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0JBQWdCLHFCQUFxQjtXQUNyQztXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxhQUFhO1dBQ2I7V0FDQSxJQUFJO1dBQ0o7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7VUVKQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvLi9zcmMvcGFnZXMvbG9naW4tYXMtcm9vdC1wYWdlLnRzIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC8uL3NyYy9wYWdlcy9zaWRlYmFyLXBhZ2UudHMiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0Ly4vc3JjL3BhZ2VzL3NvZnR3YXJlLXBhZ2UudHMiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0Ly4vc3JjL3BhZ2VzL3NvZnR3YXJlLXNlbGVjdGlvbi1wYWdlLnRzIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC8uL3NyYy90ZXN0LWdyYXBoaWNhbC1lbnZpcm9ubWVudHMudHMiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0Ly4vbm9kZV9tb2R1bGVzL3lhcmdzLXBhcnNlci9idWlsZC8gc3luYyIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvLi9ub2RlX21vZHVsZXMveWFyZ3MvYnVpbGQvIHN5bmMiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJhc3NlcnRcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImJ1ZmZlclwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY29uc3RhbnRzXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImRuc1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZXZlbnRzXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJmc1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnMvcHJvbWlzZXNcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJuZXRcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6YXNzZXJ0L3N0cmljdFwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTp0ZXN0XCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJvc1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwicGF0aFwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwicHJvY2Vzc1wiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwicmVhZGxpbmVcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInN0cmVhbVwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidGxzXCIiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJ0dHlcIiIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInVybFwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidXRpbFwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiemxpYlwiIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL3JlcXVpcmUgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9hZ2FtYS13ZWJwYWNrLXRlc3Qvd2VicGFjay9ydW50aW1lL3N0YXJ0dXAgY2h1bmsgZGVwZW5kZW5jaWVzIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2FnYW1hLXdlYnBhY2stdGVzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYWdhbWEtd2VicGFjay10ZXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHVwcGV0ZWVyLCB7IHR5cGUgUGFnZSB9IGZyb20gXCJwdXBwZXRlZXItY29yZVwiO1xuXG5leHBvcnQgY2xhc3MgTG9naW5Bc1Jvb3RQYWdlIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBhZ2U6IFBhZ2U7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwYXNzd29yZElucHV0ID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJpbnB1dCNwYXNzd29yZFwiKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvZ0luQnV0dG9uID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJidXR0b25bdHlwZT0nc3VibWl0J11cIik7XG5cbiAgICBjb25zdHJ1Y3RvcihwYWdlOiBQYWdlKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9nSW4ocGFzc3dvcmQ6IHN0cmluZykge1xuICAgICAgICBhd2FpdCB0aGlzLnBhc3N3b3JkSW5wdXQoKS5maWxsKHBhc3N3b3JkKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dJbkJ1dHRvbigpLmNsaWNrKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgdHlwZSBQYWdlIH0gZnJvbSBcInB1cHBldGVlci1jb3JlXCI7XG5cbmV4cG9ydCBjbGFzcyBTaWRlYmFyUGFnZSB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwYWdlOiBQYWdlO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb3ZlcnZpZXdMaW5rID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJhW2hyZWY9JyMvb3ZlcnZpZXcnXVwiKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvY2FsaXphdGlvbkxpbmsgPSAoKSA9PiB0aGlzLnBhZ2UubG9jYXRvcihcImFbaHJlZj0nIy9sMTBuJ11cIik7XG4gICAgcHJpdmF0ZSByZWFkb25seSBuZXR3b3JrTGluayA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiYVtocmVmPScjL25ldHdvcmsnXVwiKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHN0b3JhZ2VMaW5rID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJhW2hyZWY9JyMvc3RvcmFnZSddXCIpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc29mdHdhcmVMaW5rID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJhW2hyZWY9JyMvc29mdHdhcmUnXVwiKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHVzZXJzTGluayA9ICgpID0+IHRoaXMucGFnZS5sb2NhdG9yKFwiYVtocmVmPScjL3VzZXJzJ11cIik7XG4gICAgXG4gICAgY29uc3RydWN0b3IocGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cblxuICAgIGFzeW5jIGdvVG9PdmVydmlldygpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5vdmVydmlld0xpbmsoKS5jbGljaygpO1xuICAgIH1cblxuICAgIGFzeW5jIGdvVG9Mb2NhbGl6YXRpb24oKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubG9jYWxpemF0aW9uTGluaygpLmNsaWNrKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ29Ub05ldHdvcmsoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubmV0d29ya0xpbmsoKS5jbGljaygpO1xuICAgIH1cblxuICAgIGFzeW5jIGdvVG9TdG9yYWdlKCkge1xuICAgICAgICBhd2FpdCB0aGlzLnN0b3JhZ2VMaW5rKCkuY2xpY2soKTtcbiAgICB9XG5cbiAgICBhc3luYyBnb1RvU29mdHdhcmUoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc29mdHdhcmVMaW5rKCkuY2xpY2soKTtcbiAgICB9XG5cbiAgICBhc3luYyBnb1RvVXNlcnMoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMudXNlcnNMaW5rKCkuY2xpY2soKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IHR5cGUgUGFnZSB9IGZyb20gXCJwdXBwZXRlZXItY29yZVwiO1xuXG5leHBvcnQgY2xhc3MgU29mdHdhcmVQYWdlIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBhZ2U6IFBhZ2U7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjaGFuZ2VTZWxlY3Rpb25CdXR0b24gPSAoKSA9PiB0aGlzLnBhZ2UubG9jYXRvcihcImJ1dHRvbjo6LXAtdGV4dChDaGFuZ2VTZWxlY3Rpb24pXCIpO1xuXG4gICAgY29uc3RydWN0b3IocGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cblxuICAgIGFzeW5jIGNoYW5nZVNlbGVjdGlvbigpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5jaGFuZ2VTZWxlY3Rpb25CdXR0b24oKS5jbGljaygpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IHR5cGUgUGFnZSB9IGZyb20gXCJwdXBwZXRlZXItY29yZVwiO1xuXG5leHBvcnQgY2xhc3MgU29mdHdhcmVTZWxlY3Rpb25QYWdlIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBhZ2U6IFBhZ2U7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwYXR0ZXJuQ2hlY2tib3ggPSAobmFtZSA9ICdHTk9NRSBEZXNrdG9wIEVudmlyb25tZW50IChXYXlsYW5kKScpID0+IHRoaXMucGFnZS5sb2NhdG9yKGBjaGVja2JveDo6LXAtdGV4dCgke25hbWV9KWApO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGF0dGVybkNoZWNrYm94ID0gKG5hbWUgPSAnS0RFIEFwcGxpY2F0aW9ucyBhbmQgUGxhc21hIERlc2t0b3AnKSA9PiB0aGlzLnBhZ2UubG9jYXRvcihgY2hlY2tib3g6Oi1wLXRleHQoJHtuYW1lfSlgKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNsb3NlQnV0dG9uID0gKCkgPT4gdGhpcy5wYWdlLmxvY2F0b3IoXCJidXR0b246Oi1wLXRleHQoQ2xvc2UpXCIpO1xuXG4gICAgY29uc3RydWN0b3IocGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cblxuICAgIGFzeW5jIHNlbGVjdEdub21lRGVza3RvcEVudmlyb25tZW50KCkge1xuICAgICAgICBhd2FpdCB0aGlzLnBhdHRlcm5DaGVja2JveChuYW1lIDogJ0dOT01FIERlc2t0b3AgRW52aXJvbm1lbnQgKFdheWxhbmQpJykuY2hlY2soKTtcbiAgICB9XG4gICAgYXN5bmMgY2xvc2UoKSB7XG5cdGF3YWl0IHRoaXMuY2xvc2VCdXR0b24oKS5jbGljaygpO1xuICAgIH1cbn1cbiIsImltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCBwdXBwZXRlZXIsIHsgdHlwZSBCcm93c2VyLCB0eXBlIFBhZ2UgfSBmcm9tIFwicHVwcGV0ZWVyLWNvcmVcIjtcbmltcG9ydCB7IHByb2dyYW0sIE9wdGlvbiB9IGZyb20gXCJjb21tYW5kZXJcIjtcbmltcG9ydCAqIGFzIGNvbW1hbmRlciBmcm9tIFwiY29tbWFuZGVyXCI7XG5pbXBvcnQgeyBkZXNjcmliZSwgaXQgYXMgdGVzdEl0LCBiZWZvcmUsIGFmdGVyLCBhZnRlckVhY2gsIHNraXAgfSBmcm9tIFwibm9kZTp0ZXN0XCI7XG5pbXBvcnQgYXNzZXJ0IGZyb20gXCJub2RlOmFzc2VydC9zdHJpY3RcIjtcbmltcG9ydCB7IExvZ2luQXNSb290UGFnZSB9IGZyb20gXCIuL3BhZ2VzL2xvZ2luLWFzLXJvb3QtcGFnZVwiO1xuaW1wb3J0IHsgU2lkZWJhclBhZ2UgfSBmcm9tIFwiLi9wYWdlcy9zaWRlYmFyLXBhZ2VcIjtcbmltcG9ydCB7IFNvZnR3YXJlUGFnZSB9IGZyb20gXCIuL3BhZ2VzL3NvZnR3YXJlLXBhZ2VcIjtcbmltcG9ydCB7IFNvZnR3YXJlU2VsZWN0aW9uUGFnZSB9IGZyb20gXCIuL3BhZ2VzL3NvZnR3YXJlLXNlbGVjdGlvbi1wYWdlXCI7XG5cbmxldCBwYWdlOiBQYWdlO1xubGV0IGJyb3dzZXI6IEJyb3dzZXI7XG5sZXQgZmFpbGVkID0gZmFsc2U7XG5cbi8vIGRlZmluZSBpdCgpIGFzIGEgd3JhcHBlciB3aGljaCBkdW1wcyB0aGUgcGFnZSBvbiBhIGZhaWx1cmVcbmFzeW5jIGZ1bmN0aW9uIGl0KGxhYmVsOiBzdHJpbmcsIHRlc3Q6ICgpID0+IFByb21pc2U8dm9pZD4sIHRpbWVvdXQ/OiBudW1iZXIpIHtcbiAgdGVzdEl0KGxhYmVsLFxuICAgIC8vIGFib3J0IHdoZW4gdGhlIHRlc3QgdGFrZXMgbW9yZSB0aGFuIG9uZSBtaW51dGVcbiAgICB7IHRpbWVvdXQ6IHRpbWVvdXQgfHwgNjAwMDAgfSxcbiAgICBhc3luYyAodCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICB0LnNraXAoKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgYXdhaXQgdGVzdCgpO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5jb250aW51ZSkgZmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHBhZ2UpIHtcbiAgICAgICAgICAvLyBkaXJlY3RvcnkgZm9yIHN0b3JpbmcgdGhlIGRhdGFcbiAgICAgICAgICBjb25zdCBkaXIgPSBcImxvZ1wiO1xuICAgICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXIpKSBmcy5ta2RpclN5bmMoZGlyKTtcblxuICAgICAgICAgIC8vIGJhc2UgZmlsZSBuYW1lIGZvciB0aGUgZHVtcHNcbiAgICAgICAgICBjb25zdCBuYW1lID0gcGF0aC5qb2luKGRpciwgbGFiZWwucmVwbGFjZSgvW15hLXpBLVowLTldL2csIFwiX1wiKSk7XG4gICAgICAgICAgYXdhaXQgcGFnZS5zY3JlZW5zaG90KHsgcGF0aDogbmFtZSArIFwiLnBuZ1wiIH0pO1xuICAgICAgICAgIGNvbnN0IGh0bWwgPSBhd2FpdCBwYWdlLmNvbnRlbnQoKTtcbiAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKG5hbWUgKyBcIi5odG1sXCIsIGh0bWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGVzdCBmYWlsZWQhXCIsIHsgY2F1c2U6IGVycm9yIH0pO1xuICAgICAgfVxuICAgIH0pO1xufTtcblxuY29uc3QgYWdhbWFJbnN0YWxsID0gYm9vbGVhbkVudihcIkFHQU1BX0lOU1RBTExcIiwgdHJ1ZSk7XG5jb25zdCBjb25maWd1cmVEYXNkID0gYm9vbGVhbkVudihcIkFHQU1BX0RBU0RcIiwgZmFsc2UpO1xuY29uc3QgYWdhbWFEZXNrdG9wID0gYm9vbGVhbkVudihcIkFHQU1BX0RFU0tUT1BcIiwgZmFsc2UpO1xuXG5jb25zdCBhZ2FtYVVzZXIgPSBcImJlcm5oYXJkXCI7XG5jb25zdCBhZ2FtYVVzZXJGdWxsTmFtZSA9IFwiQmVybmhhcmQgTS4gV2llZGVtYW5uXCI7XG5cbmRlc2NyaWJlKFwic29mdHdhcmUgc2VsZWN0aW9uXCIsIGZ1bmN0aW9uICgpIHtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBicm93c2VyID0gYXdhaXQgcHVwcGV0ZWVyLmxhdW5jaChwdXBwZXRlZXJMYXVuY2hPcHRpb25zKTtcbiAgICBwYWdlID0gYXdhaXQgYnJvd3Nlci5uZXdQYWdlKCk7XG4gICAgcGFnZS5zZXREZWZhdWx0VGltZW91dCgyMDAwMCk7XG4gICAgYXdhaXQgcGFnZS5nb3RvKG9wdGlvbnMudXJsLCB7IHRpbWVvdXQ6IDYwMDAwLCB3YWl0VW50aWw6IFwiZG9tY29udGVudGxvYWRlZFwiIH0pO1xuICB9KTtcblxuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgcGFnZS5jbG9zZSgpO1xuICAgIGF3YWl0IGJyb3dzZXIuY2xvc2UoKTtcbiAgfSlcblxuICBpdChcInNob3VsZCBoYXZlIEFnYW1hIHBhZ2UgdGl0bGVcIiwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGFzc2VydC5kZWVwRXF1YWwoYXdhaXQgcGFnZS50aXRsZSgpLCBcIkFnYW1hXCIpO1xuICB9KTtcblxuICBpdChcImFsbG93cyBsb2dnaW5nIGluXCIsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBsb2dpbkFzUm9vdCA9IG5ldyBMb2dpbkFzUm9vdFBhZ2UocGFnZSk7XG4gICAgYXdhaXQgbG9naW5Bc1Jvb3QubG9nSW4ob3B0aW9ucy5wYXNzd29yZCk7XG4gIH0pO1xuXG4gIGl0KFwic2hvdWxkIHNlbGVjdCBnbm9tZSBwYXR0ZXJuXCIsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBzaWRlYmFyID0gbmV3IFNpZGViYXJQYWdlKHBhZ2UpO1xuICAgIGNvbnN0IHNvZnR3YXJlID0gbmV3IFNvZnR3YXJlUGFnZShwYWdlKTtcbiAgICBjb25zdCBzb2Z0d2FyZVNlbGVjdGlvbiA9IG5ldyBTb2Z0d2FyZVNlbGVjdGlvblBhZ2UocGFnZSk7XG5cbiAgICBhd2FpdCBzaWRlYmFyLmdvVG9Tb2Z0d2FyZSgpO1xuICAgIGF3YWl0IHNvZnR3YXJlLmNoYW5nZVNlbGVjdGlvbigpO1xuICAgIGF3YWl0IHNvZnR3YXJlU2VsZWN0aW9uLnNlbGVjdEdub21lRGVza3RvcEVudmlyb25tZW50KCk7XG4gICAgYXdhaXQgc29mdHdhcmVTZWxlY3Rpb24uY2xvc2UoKTtcbiAgfSk7XG5cbiAgaXQoXCJzaG91bGQgYmUgcmVhZHkgZm9yIGluc3RhbGxhdGlvblwiLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgc2lkZWJhciA9IG5ldyBTaWRlYmFyUGFnZShwYWdlKTtcbiAgICBhd2FpdCBzaWRlYmFyLmdvVG9PdmVydmlldygpO1xuICAgIGF3YWl0IHBhZ2UubG9jYXRvcihcImJ1dHRvbjo6LXAtdGV4dChJbnN0YWxsKVwiKS53YWl0KCk7XG4gIH0pO1xuXG4gIGlmIChhZ2FtYUluc3RhbGwgPT09IHRydWUpIHtcbiAgICBpdChcInNob3VsZCBzdGFydCBpbnN0YWxsYXRpb25cIiwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgcGFnZS5sb2NhdG9yKFwiYnV0dG9uOjotcC10ZXh0KCdJbnN0YWxsJylcIikuY2xpY2soKTtcbiAgICAgIGF3YWl0IHBhZ2UubG9jYXRvcihcImJ1dHRvbjo6LXAtdGV4dCgnQ29udGludWUnKVwiKS5jbGljaygpO1xuICAgICAgYXdhaXQgcGFnZS5sb2NhdG9yKFwiOjotcC10ZXh0KEluc3RhbGxpbmcgdGhlKVwiKS53YWl0KCk7XG4gICAgfSk7XG5cbiAgICBpdChcInNob3VsZCBmaW5pc2ggaW5zdGFsbGF0aW9uXCIsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IHBhZ2VcbiAgICAgICAgLmxvY2F0b3IoXCJoMjo6LXAtdGV4dCgnQ29uZ3JhdHVsYXRpb25zIScpXCIpXG4gICAgICAgIC5zZXRUaW1lb3V0KDE1ICogNjAgKiAxMDAwKVxuICAgICAgICAud2FpdCgpO1xuICAgIH0sIDE1ICogNjAgKiAxMDAwKTtcbiAgfVxufSk7XG4iLCJmdW5jdGlvbiB3ZWJwYWNrRW1wdHlDb250ZXh0KHJlcSkge1xuXHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0dGhyb3cgZTtcbn1cbndlYnBhY2tFbXB0eUNvbnRleHQua2V5cyA9ICgpID0+IChbXSk7XG53ZWJwYWNrRW1wdHlDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xud2VicGFja0VtcHR5Q29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMveWFyZ3MtcGFyc2VyL2J1aWxkIHN5bmMgcmVjdXJzaXZlXCI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7IiwiZnVuY3Rpb24gd2VicGFja0VtcHR5Q29udGV4dChyZXEpIHtcblx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdHRocm93IGU7XG59XG53ZWJwYWNrRW1wdHlDb250ZXh0LmtleXMgPSAoKSA9PiAoW10pO1xud2VicGFja0VtcHR5Q29udGV4dC5yZXNvbHZlID0gd2VicGFja0VtcHR5Q29udGV4dDtcbndlYnBhY2tFbXB0eUNvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL3lhcmdzL2J1aWxkIHN5bmMgcmVjdXJzaXZlXCI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXNzZXJ0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJ1ZmZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbnN0YW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG5zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmcy9wcm9taXNlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmFzc2VydC9zdHJpY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTp0ZXN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFkbGluZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHJlYW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidGxzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR0eVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ6bGliXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fO1xuXG4vLyB0aGUgc3RhcnR1cCBmdW5jdGlvblxuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0gKCkgPT4ge1xuXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcblx0dmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19jb21tYW5kZXJfZXNtX21qcy1ub2RlX21vZHVsZXNfcHVwcGV0ZWVyLWNvcmVfbGliX2VzbV9wdXBwZXRlZXJfcHVwcGV0ZWUtOTI3NzlmXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3Rlc3QtZ3JhcGhpY2FsLWVudmlyb25tZW50cy50c1wiKSkpXG5cdF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG5cdHJldHVybiBfX3dlYnBhY2tfZXhwb3J0c19fO1xufTtcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzIGFuZCBzaWJsaW5nIGNodW5rcyBmb3IgdGhlIGVudHJ5cG9pbnRcbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5janNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgY2h1bmtzXG4vLyBcIjFcIiBtZWFucyBcImxvYWRlZFwiLCBvdGhlcndpc2Ugbm90IGxvYWRlZCB5ZXRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwidGVzdC1ncmFwaGljYWwtZW52aXJvbm1lbnRzXCI6IDFcbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5yZXF1aXJlID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pO1xuXG52YXIgaW5zdGFsbENodW5rID0gKGNodW5rKSA9PiB7XG5cdHZhciBtb3JlTW9kdWxlcyA9IGNodW5rLm1vZHVsZXMsIGNodW5rSWRzID0gY2h1bmsuaWRzLCBydW50aW1lID0gY2h1bmsucnVudGltZTtcblx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspXG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDE7XG5cdF9fd2VicGFja19yZXF1aXJlX18uTygpO1xufTtcblxuLy8gcmVxdWlyZSgpIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcbl9fd2VicGFja19yZXF1aXJlX18uZi5yZXF1aXJlID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdC8vIFwiMVwiIGlzIHRoZSBzaWduYWwgZm9yIFwiYWxyZWFkeSBsb2FkZWRcIlxuXHRpZighaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0aWYodHJ1ZSkgeyAvLyBhbGwgY2h1bmtzIGhhdmUgSlNcblx0XHRcdGluc3RhbGxDaHVuayhyZXF1aXJlKFwiLi9cIiArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKSkpO1xuXHRcdH0gZWxzZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAxO1xuXHR9XG59O1xuXG4vLyBubyBleHRlcm5hbCBpbnN0YWxsIGNodW5rXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3QiLCJ2YXIgbmV4dCA9IF9fd2VicGFja19yZXF1aXJlX18ueDtcbl9fd2VicGFja19yZXF1aXJlX18ueCA9ICgpID0+IHtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5lKFwidmVuZG9ycy1ub2RlX21vZHVsZXNfY29tbWFuZGVyX2VzbV9tanMtbm9kZV9tb2R1bGVzX3B1cHBldGVlci1jb3JlX2xpYl9lc21fcHVwcGV0ZWVyX3B1cHBldGVlLTkyNzc5ZlwiKTtcblx0cmV0dXJuIG5leHQoKTtcbn07IiwiIiwiLy8gbW9kdWxlIGNhY2hlIGFyZSB1c2VkIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBydW4gc3RhcnR1cFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLngoKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==