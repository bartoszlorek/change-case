/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 104);
/******/ })
/************************************************************************/
/******/ ({

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isCompleted(info) {
    return info && info.status === 'complete' && typeof info.url === 'undefined';
}

function removeItem(array, item) {
    var index = array.indexOf(item);
    if (index !== -1) {
        array.splice(index, 1);
    }
}

var executeScript = function () {
    var executedTabs = [];

    chrome.tabs.onUpdated.addListener(function (tabId, info) {
        if (!isCompleted(info)) return;
        removeItem(executedTabs, tabId);
    });
    return function (tabId, callback) {
        if (executedTabs.indexOf(tabId) === -1) {
            chrome.tabs.executeScript(tabId, {
                file: 'script.js'
            }, function () {
                if (chrome.runtime.lastError) {
                    alert(chrome.runtime.lastError.message);
                    return;
                }
                executedTabs.push(tabId);
                callback();
            });
        } else {
            callback();
        }
    };
}();

function handleChangeCase(method) {
    return function (info, tab) {
        if (!info.selectionText) {
            return;
        }
        executeScript(tab.id, function () {
            chrome.tabs.sendMessage(tab.id, {
                type: 'CHANGE_CASE',
                value: method
            });
        });
    };
}

function createMenu() {
    var cases = [['upperCase', 'UPPERCASE'], ['lowerCase', 'lowercase'], ['titleCase', 'Title Case'], ['sentenceCase', 'Sentence case'], null, ['camelCase', 'camelCase'], ['pascalCase', 'PascalCase'], ['constantCase', 'CONSTANT_CASE'], null, ['paramCase', 'param-case'], ['snakeCase', 'snake_case'], ['dotCase', 'dot.case'], null, ['toggleCase', 'tOGGLE cASE'], ['noCase', 'no case']];
    var length = cases.length,
        params = void 0;

    for (var i = 0; i < length; i++) {
        if (cases[i] === null) {
            params = {
                type: 'separator'
            };
        } else {
            params = {
                title: cases[i][1],
                onclick: handleChangeCase(cases[i][0])
            };
        }
        params.contexts = ['editable'];
        chrome.contextMenus.create(params);
    }
}

createMenu();

/***/ })

/******/ });