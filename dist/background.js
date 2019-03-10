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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/.utils/chrome/create-menu.js":
/*!******************************************!*\
  !*** ./src/.utils/chrome/create-menu.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction createMenu(items, callback, defaults) {\n  if (items == null) {\n    return;\n  }\n\n  items.forEach(function (item) {\n    var params;\n\n    if (item === null) {\n      params = {\n        type: 'separator'\n      };\n    } else {\n      params = callback(item);\n    }\n\n    if (defaults) {\n      params = Object.assign({}, defaults, params);\n    }\n\n    chrome.contextMenus.create(params);\n  });\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createMenu);\n\n//# sourceURL=webpack:///./src/.utils/chrome/create-menu.js?");

/***/ }),

/***/ "./src/.utils/chrome/executable-tab.js":
/*!*********************************************!*\
  !*** ./src/.utils/chrome/executable-tab.js ***!
  \*********************************************/
/*! exports provided: default, exec */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"exec\", function() { return exec; });\n// It checks if given tab is allowed for scripting,\n// without breaking extension through errors.\nvar VOID = {\n  code: 'void(0)'\n};\nvar CORRECT = 'correct';\n\nvar getHostname = function getHostname(url) {\n  if (url == null) {\n    return null;\n  }\n\n  var parser = document.createElement('a');\n  parser.href = url;\n  return parser.hostname;\n};\n\nfunction exec(tab, memo) {\n  var tabId = tab == null || typeof tab.id !== 'number' ? -1 : tab.id;\n\n  if (tabId < 0) {\n    return Promise.reject('Incorrect tab');\n  }\n\n  var prop = getHostname(tab.url) || tabId;\n\n  if (memo != null) {\n    var memoized = memo[prop];\n\n    if (memoized !== undefined) {\n      return memoized === CORRECT ? Promise.resolve(tabId) : Promise.reject(memoized);\n    }\n  }\n\n  var memoize = function memoize(value) {\n    if (memo != null) {\n      memo[prop] = value || CORRECT;\n    }\n  };\n\n  return new Promise(function (resolve, reject) {\n    return chrome.tabs.executeScript(tabId, VOID, function () {\n      var error = chrome.runtime.lastError;\n\n      if (error != null) {\n        memoize(error.message);\n        reject(error.message);\n      } else {\n        memoize();\n        resolve(tabId);\n      }\n    });\n  });\n}\n\nfunction executableTab() {\n  var memo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  return function (tab) {\n    return exec(tab, memo);\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (executableTab);\n\n\n//# sourceURL=webpack:///./src/.utils/chrome/executable-tab.js?");

/***/ }),

/***/ "./src/.utils/chrome/extension-state.js":
/*!**********************************************!*\
  !*** ./src/.utils/chrome/extension-state.js ***!
  \**********************************************/
/*! exports provided: STATE, initializeState, connectToState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"STATE\", function() { return STATE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initializeState\", function() { return initializeState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"connectToState\", function() { return connectToState; });\n/* harmony import */ var _get_storage_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-storage-data */ \"./src/.utils/chrome/get-storage-data.js\");\n\nvar EXTENSION_STATE_PORT = 'EXTENSION_STATE_PORT';\nvar STATE = {\n  INSTALL: 'install',\n  UPDATE: 'update',\n  NORMAL: 'normal'\n};\n\nvar createState = function createState(states) {\n  var defaultState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n  var state = defaultState;\n  return {\n    get: function get() {\n      return state;\n    },\n    set: function set(newState) {\n      if (Object.values(states).includes(newState)) {\n        state = newState;\n      }\n    }\n  };\n};\n\nvar initializeState = function initializeState() {\n  var reducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var state = createState(STATE, STATE.NORMAL); // set state according to runtime and open options\n\n  chrome.runtime.onInstalled.addListener(function (_ref) {\n    var reason = _ref.reason;\n    Object(_get_storage_data__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(reducers).then(function (data) {\n      if (data[reason] === true) {\n        chrome.runtime.openOptionsPage();\n        state.set(reason);\n      }\n    });\n  }); // set state to normal after closing options\n\n  chrome.runtime.onConnect.addListener(function (port) {\n    if (port.name === EXTENSION_STATE_PORT) {\n      port.postMessage({\n        state: state.get()\n      });\n      port.onDisconnect.addListener(function () {\n        state.set(STATE.NORMAL);\n      });\n    }\n  });\n};\nvar connectToState = function connectToState(callback) {\n  var port = chrome.runtime.connect({\n    name: EXTENSION_STATE_PORT\n  });\n  port.onMessage.addListener(function (data) {\n    return callback(data.state);\n  });\n};\n\n//# sourceURL=webpack:///./src/.utils/chrome/extension-state.js?");

/***/ }),

/***/ "./src/.utils/chrome/get-current-tab.js":
/*!**********************************************!*\
  !*** ./src/.utils/chrome/get-current-tab.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction getCurrentTab() {\n  return new Promise(function (resolve, reject) {\n    chrome.tabs.query({\n      currentWindow: true,\n      active: true\n    }, function (tabs) {\n      if (tabs.length > 0) {\n        resolve(tabs[0]);\n      } else {\n        reject();\n      }\n    });\n  });\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (getCurrentTab);\n\n//# sourceURL=webpack:///./src/.utils/chrome/get-current-tab.js?");

/***/ }),

/***/ "./src/.utils/chrome/get-storage-data.js":
/*!***********************************************!*\
  !*** ./src/.utils/chrome/get-storage-data.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction getStorageData() {\n  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  return new Promise(function (resolve) {\n    chrome.storage.sync.get(null, function (data) {\n      var result = {};\n      Object.keys(props).forEach(function (prop) {\n        var value = props[prop];\n\n        if (typeof value === 'function') {\n          result[prop] = value(data);\n        } else {\n          result[prop] = data[value];\n        }\n      });\n      resolve(result);\n    });\n  });\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (getStorageData);\n\n//# sourceURL=webpack:///./src/.utils/chrome/get-storage-data.js?");

/***/ }),

/***/ "./src/.utils/chrome/message.js":
/*!**************************************!*\
  !*** ./src/.utils/chrome/message.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar valid = {\n  tabId: function tabId(id) {\n    if (typeof id !== 'number') {\n      throw 'Tab requires `id` as a Number.';\n    }\n\n    return valid;\n  },\n  type: function type(_type) {\n    if (typeof _type !== 'string') {\n      throw 'Message requires `type` as a String.';\n    }\n\n    return valid;\n  }\n};\n\nvar sendToBack = function sendToBack(spec, callback) {\n  valid.type(spec && spec.type);\n  chrome.runtime.sendMessage(spec, callback);\n};\n\nvar sendToTab = function sendToTab(id, spec, callback) {\n  valid.tabId(id).type(spec && spec.type);\n  chrome.tabs.sendMessage(id, spec, callback);\n};\n\nsendToTab.all = function (spec, callback) {\n  chrome.tabs.query({}, function (tabs) {\n    tabs.forEach(function (tab) {\n      return sendToTab(tab.id, spec, callback);\n    });\n  });\n};\n\nsendToTab.current = function (spec, callback) {\n  chrome.tabs.query({\n    currentWindow: true,\n    active: true\n  }, function (tabs) {\n    sendToTab(tabs[0].id, spec, callback);\n  });\n};\n\nvar message = {\n  on: function on(type, callback) {\n    valid.type(type);\n\n    if (chrome.runtime.onMessage === undefined) {\n      throw 'Cannot add listener to `chrome.runtime.onMessage`.';\n    }\n\n    chrome.runtime.onMessage.addListener(function (request, sender, response) {\n      if (request.type === type) {\n        callback(request, sender, response);\n      }\n    });\n  },\n  toBack: sendToBack,\n  toTab: sendToTab\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (message);\n\n//# sourceURL=webpack:///./src/.utils/chrome/message.js?");

/***/ }),

/***/ "./src/.utils/chrome/set-defaults.js":
/*!*******************************************!*\
  !*** ./src/.utils/chrome/set-defaults.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction setDefaults(values) {\n  if (values == null) {\n    return;\n  }\n\n  chrome.runtime.onInstalled.addListener(function (event) {\n    if (event.reason === 'install') {\n      chrome.storage.sync.set(values);\n    }\n  });\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (setDefaults);\n\n//# sourceURL=webpack:///./src/.utils/chrome/set-defaults.js?");

/***/ }),

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var Utils_chrome_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Utils/chrome/message */ \"./src/.utils/chrome/message.js\");\n/* harmony import */ var Utils_chrome_executable_tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Utils/chrome/executable-tab */ \"./src/.utils/chrome/executable-tab.js\");\n/* harmony import */ var Utils_chrome_get_current_tab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utils/chrome/get-current-tab */ \"./src/.utils/chrome/get-current-tab.js\");\n/* harmony import */ var Utils_chrome_create_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utils/chrome/create-menu */ \"./src/.utils/chrome/create-menu.js\");\n/* harmony import */ var Utils_chrome_set_defaults__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! Utils/chrome/set-defaults */ \"./src/.utils/chrome/set-defaults.js\");\n/* harmony import */ var Utils_chrome_extension_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Utils/chrome/extension-state */ \"./src/.utils/chrome/extension-state.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\nvar _initializeState;\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\nvar exec = Object(Utils_chrome_executable_tab__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\nvar handleMethod = function handleMethod(tab, name) {\n  return exec(tab).catch(function (error) {\n    return alert(error);\n  }).then(function (id) {\n    var options = {\n      file: 'content-script.js'\n    };\n    chrome.tabs.executeScript(id, options, function () {\n      Utils_chrome_message__WEBPACK_IMPORTED_MODULE_0__[\"default\"].toTab(id, {\n        type: 'CHANGE_CASE',\n        name: name\n      });\n    });\n  });\n};\n\nvar handleClick = function handleClick(name) {\n  return function (info, tab) {\n    if (info.selectionText) {\n      handleMethod(tab, name);\n    }\n  };\n};\n\nObject(Utils_chrome_create_menu__WEBPACK_IMPORTED_MODULE_3__[\"default\"])([[_constants__WEBPACK_IMPORTED_MODULE_6__[\"upperCase\"].name, _constants__WEBPACK_IMPORTED_MODULE_6__[\"upperCase\"].text], [_constants__WEBPACK_IMPORTED_MODULE_6__[\"lowerCase\"].name, _constants__WEBPACK_IMPORTED_MODULE_6__[\"lowerCase\"].text], [_constants__WEBPACK_IMPORTED_MODULE_6__[\"titleCase\"].name, _constants__WEBPACK_IMPORTED_MODULE_6__[\"titleCase\"].text], [_constants__WEBPACK_IMPORTED_MODULE_6__[\"sentenceCase\"].name, _constants__WEBPACK_IMPORTED_MODULE_6__[\"sentenceCase\"].text], null, [_constants__WEBPACK_IMPORTED_MODULE_6__[\"camelCase\"].name, _constants__WEBPACK_IMPORTED_MODULE_6__[\"camelCase\"].text], [_constants__WEBPACK_IMPORTED_MODULE_6__[\"pascalCase\"].name, _constants__WEBPACK_IMPORTED_MODULE_6__[\"pascalCase\"].text], [_constants__WEBPACK_IMPORTED_MODULE_6__[\"constantCase\"].name, _constants__WEBPACK_IMPORTED_MODULE_6__[\"constantCase\"].text], null, [_constants__WEBPACK_IMPORTED_MODULE_6__[\"paramCase\"].name, _constants__WEBPACK_IMPORTED_MODULE_6__[\"paramCase\"].text], [_constants__WEBPACK_IMPORTED_MODULE_6__[\"snakeCase\"].name, _constants__WEBPACK_IMPORTED_MODULE_6__[\"snakeCase\"].text], [_constants__WEBPACK_IMPORTED_MODULE_6__[\"dotCase\"].name, _constants__WEBPACK_IMPORTED_MODULE_6__[\"dotCase\"].text], null, [_constants__WEBPACK_IMPORTED_MODULE_6__[\"toggleCase\"].name, _constants__WEBPACK_IMPORTED_MODULE_6__[\"toggleCase\"].text], [_constants__WEBPACK_IMPORTED_MODULE_6__[\"noAccents\"].name, _constants__WEBPACK_IMPORTED_MODULE_6__[\"noAccents\"].text], [_constants__WEBPACK_IMPORTED_MODULE_6__[\"noCase\"].name, _constants__WEBPACK_IMPORTED_MODULE_6__[\"noCase\"].text]], function (item) {\n  return {\n    title: item[1],\n    onclick: handleClick(item[0])\n  };\n}, {\n  contexts: ['editable']\n});\nObject(Utils_chrome_set_defaults__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({\n  updateNotification: true\n});\nObject(Utils_chrome_extension_state__WEBPACK_IMPORTED_MODULE_5__[\"initializeState\"])((_initializeState = {}, _defineProperty(_initializeState, Utils_chrome_extension_state__WEBPACK_IMPORTED_MODULE_5__[\"STATE\"].INSTALL, function () {\n  return true;\n}), _defineProperty(_initializeState, Utils_chrome_extension_state__WEBPACK_IMPORTED_MODULE_5__[\"STATE\"].UPDATE, function (data) {\n  return data.updateNotification;\n}), _initializeState));\nchrome.commands.onCommand.addListener(function (command) {\n  var name = command.replace(/^\\d+_/, '');\n\n  if (_constants__WEBPACK_IMPORTED_MODULE_6__[\"methodNames\"].indexOf(name) !== -1) {\n    Object(Utils_chrome_get_current_tab__WEBPACK_IMPORTED_MODULE_2__[\"default\"])().then(function (tab) {\n      return handleMethod(tab, name);\n    });\n  }\n}); // after 2.2.0 update - remove this code in the future\n// blacklist is depreciated, instead use ignoreList\n\nchrome.storage.sync.get('blacklist', function (data) {\n  if (data.blacklist !== undefined) {\n    chrome.storage.sync.set({\n      ignoreList: data.blacklist\n    });\n    chrome.storage.sync.remove('blacklist');\n  }\n});\n\n//# sourceURL=webpack:///./src/background.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: upperCase, lowerCase, titleCase, sentenceCase, camelCase, pascalCase, constantCase, paramCase, snakeCase, dotCase, toggleCase, noAccents, noCase, methodNames, methodTexts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"upperCase\", function() { return upperCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lowerCase\", function() { return lowerCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"titleCase\", function() { return titleCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sentenceCase\", function() { return sentenceCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"camelCase\", function() { return camelCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pascalCase\", function() { return pascalCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"constantCase\", function() { return constantCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"paramCase\", function() { return paramCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"snakeCase\", function() { return snakeCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dotCase\", function() { return dotCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggleCase\", function() { return toggleCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"noAccents\", function() { return noAccents; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"noCase\", function() { return noCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"methodNames\", function() { return methodNames; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"methodTexts\", function() { return methodTexts; });\nvar upperCase = {\n  name: 'upperCase',\n  text: 'UPPERCASE'\n};\nvar lowerCase = {\n  name: 'lowerCase',\n  text: 'lowercase'\n};\nvar titleCase = {\n  name: 'titleCase',\n  text: 'Title Case'\n};\nvar sentenceCase = {\n  name: 'sentenceCase',\n  text: 'Sentence case'\n};\nvar camelCase = {\n  name: 'camelCase',\n  text: 'camelCase'\n};\nvar pascalCase = {\n  name: 'pascalCase',\n  text: 'PascalCase'\n};\nvar constantCase = {\n  name: 'constantCase',\n  text: 'CONSTANT_CASE'\n};\nvar paramCase = {\n  name: 'paramCase',\n  text: 'param-case'\n};\nvar snakeCase = {\n  name: 'snakeCase',\n  text: 'snake_case'\n};\nvar dotCase = {\n  name: 'dotCase',\n  text: 'dot.case'\n};\nvar toggleCase = {\n  name: 'toggleCase',\n  text: 'tOGGLE cASE'\n};\nvar noAccents = {\n  name: 'noAccents',\n  text: 'no accents'\n};\nvar noCase = {\n  name: 'noCase',\n  text: 'no case'\n};\nvar methodNames = [upperCase.name, lowerCase.name, titleCase.name, sentenceCase.name, camelCase.name, pascalCase.name, constantCase.name, paramCase.name, snakeCase.name, dotCase.name, toggleCase.name, noAccents.name, noCase.name];\nvar methodTexts = [upperCase.text, lowerCase.text, titleCase.text, sentenceCase.text, camelCase.text, pascalCase.text, constantCase.text, paramCase.text, snakeCase.text, dotCase.text, toggleCase.text, noAccents.text, noCase.text];\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ })

/******/ });