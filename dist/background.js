!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=154)}([,,,,,,function(t,e,n){var r=n(20),o="object"==typeof self&&self&&self.Object===Object&&self,c=r||o||Function("return this")();t.exports=c},function(t,e,n){function r(t){return null==t?void 0===t?a:i:f&&f in Object(t)?c(t):u(t)}var o=n(14),c=n(46),u=n(47),i="[object Null]",a="[object Undefined]",f=o?o.toStringTag:void 0;t.exports=r},function(t,e){function n(t){return null!=t&&"object"==typeof t}t.exports=n},function(t,e){var n=Array.isArray;t.exports=n},,,,,function(t,e,n){var r=n(6),o=r.Symbol;t.exports=o},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},,function(t,e){function n(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=r}var r=9007199254740991;t.exports=n},,,function(t,e,n){(function(e){var n="object"==typeof e&&e&&e.Object===Object&&e;t.exports=n}).call(e,n(45))},function(t,e,n){function r(t){return u(t)?o(t):c(t)}var o=n(42),c=n(52),u=n(22);t.exports=r},function(t,e,n){function r(t){return null!=t&&c(t.length)&&!o(t)}var o=n(31),c=n(17);t.exports=r},function(t,e){function n(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}t.exports=n},,,function(t,e,n){var r=n(44),o=n(8),c=Object.prototype,u=c.hasOwnProperty,i=c.propertyIsEnumerable,a=r(function(){return arguments}())?r:function(t){return o(t)&&u.call(t,"callee")&&!i.call(t,"callee")};t.exports=a},function(t,e,n){(function(t){var r=n(6),o=n(48),c="object"==typeof e&&e&&!e.nodeType&&e,u=c&&"object"==typeof t&&t&&!t.nodeType&&t,i=u&&u.exports===c,a=i?r.Buffer:void 0,f=a?a.isBuffer:void 0,s=f||o;t.exports=s}).call(e,n(15)(t))},function(t,e){function n(t,e){var n=typeof t;return!!(e=null==e?r:e)&&("number"==n||"symbol"!=n&&o.test(t))&&t>-1&&t%1==0&&t<e}var r=9007199254740991,o=/^(?:0|[1-9]\d*)$/;t.exports=n},function(t,e,n){var r=n(49),o=n(50),c=n(51),u=c&&c.isTypedArray,i=u?o(u):r;t.exports=i},function(t,e){function n(t,e){return function(n){return t(e(n))}}t.exports=n},function(t,e,n){function r(t){if(!c(t))return!1;var e=o(t);return e==i||e==a||e==u||e==f}var o=n(7),c=n(23),u="[object AsyncFunction]",i="[object Function]",a="[object GeneratorFunction]",f="[object Proxy]";t.exports=r},,,,,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={tabId:function(t){if("number"!=typeof t)throw"Tab requires `id` as a Number.";return r},type:function(t){if("string"!=typeof t)throw"Message requires `type` as a String.";return r}},o=function(t,e){r.type(t&&t.type),chrome.runtime.sendMessage(t,e)},c=function(t,e,n){r.tabId(t).type(e&&e.type),chrome.tabs.sendMessage(t,e,n)};c.all=function(t,e){chrome.tabs.query({},function(n){n.forEach(function(n){return c(n.id,t,e)})})},c.current=function(t,e){chrome.tabs.query({currentWindow:!0,active:!0},function(n){c(n[0].id,t,e)})};var u={on:function(t,e){if(r.type(t),void 0===chrome.runtime.onMessage)throw"Cannot add listener to `chrome.runtime.onMessage`.";chrome.runtime.onMessage.addListener(function(n,r,o){n.type===t&&e(n,r,o)})},toBack:o,toTab:c};e.default=u},function(t,e,n){function r(t,e){return t&&o(t,e,c)}var o=n(40),c=n(21);t.exports=r},function(t,e,n){var r=n(41),o=r();t.exports=o},function(t,e){function n(t){return function(e,n,r){for(var o=-1,c=Object(e),u=r(e),i=u.length;i--;){var a=u[t?i:++o];if(!1===n(c[a],a,c))break}return e}}t.exports=n},function(t,e,n){function r(t,e){var n=u(t),r=!n&&c(t),s=!n&&!r&&i(t),p=!n&&!r&&!s&&f(t),b=n||r||s||p,d=b?o(t.length,String):[],v=d.length;for(var y in t)!e&&!l.call(t,y)||b&&("length"==y||s&&("offset"==y||"parent"==y)||p&&("buffer"==y||"byteLength"==y||"byteOffset"==y)||a(y,v))||d.push(y);return d}var o=n(43),c=n(26),u=n(9),i=n(27),a=n(28),f=n(29),s=Object.prototype,l=s.hasOwnProperty;t.exports=r},function(t,e){function n(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}t.exports=n},function(t,e,n){function r(t){return c(t)&&o(t)==u}var o=n(7),c=n(8),u="[object Arguments]";t.exports=r},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){function r(t){var e=u.call(t,a),n=t[a];try{t[a]=void 0;var r=!0}catch(t){}var o=i.call(t);return r&&(e?t[a]=n:delete t[a]),o}var o=n(14),c=Object.prototype,u=c.hasOwnProperty,i=c.toString,a=o?o.toStringTag:void 0;t.exports=r},function(t,e){function n(t){return o.call(t)}var r=Object.prototype,o=r.toString;t.exports=n},function(t,e){function n(){return!1}t.exports=n},function(t,e,n){function r(t){return u(t)&&c(t.length)&&!!i[o(t)]}var o=n(7),c=n(17),u=n(8),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,t.exports=r},function(t,e){function n(t){return function(e){return t(e)}}t.exports=n},function(t,e,n){(function(t){var r=n(20),o="object"==typeof e&&e&&!e.nodeType&&e,c=o&&"object"==typeof t&&t&&!t.nodeType&&t,u=c&&c.exports===o,i=u&&r.process,a=function(){try{return i&&i.binding&&i.binding("util")}catch(t){}}();t.exports=a}).call(e,n(15)(t))},function(t,e,n){function r(t){if(!o(t))return c(t);var e=[];for(var n in Object(t))i.call(t,n)&&"constructor"!=n&&e.push(n);return e}var o=n(53),c=n(54),u=Object.prototype,i=u.hasOwnProperty;t.exports=r},function(t,e){function n(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||r)}var r=Object.prototype;t.exports=n},function(t,e,n){var r=n(30),o=r(Object.keys,Object);t.exports=o},function(t,e){function n(t){return t}t.exports=n},,,,,,function(t,e,n){"use strict";function r(){var t=i;chrome.runtime.onInstalled.addListener(function(e){var n=e.reason;n!==c&&n!==u||(t=n,chrome.runtime.openOptionsPage())}),chrome.runtime.onMessage.addListener(function(e,n,r){e.type===a&&(r(t),t=i)})}function o(t){chrome.runtime.sendMessage({type:a},t)}Object.defineProperty(e,"__esModule",{value:!0});var c=e.INSTALL_STATE="install",u=e.UPDATE_STATE="update",i=e.NORMAL_STATE="normal",a="GET_STATE_ONCE";e.listenStates=r,e.getStateOnce=o},,,,,,,,,,,,function(t,e,n){function r(t,e){return(i(t)?o:c)(t,u(e))}var o=n(74),c=n(75),u=n(77),i=n(9);t.exports=r},function(t,e){function n(t,e){for(var n=-1,r=null==t?0:t.length;++n<r&&!1!==e(t[n],n,t););return t}t.exports=n},function(t,e,n){var r=n(39),o=n(76),c=o(r);t.exports=c},function(t,e,n){function r(t,e){return function(n,r){if(null==n)return n;if(!o(n))return t(n,r);for(var c=n.length,u=e?c:-1,i=Object(n);(e?u--:++u<c)&&!1!==r(i[u],u,i););return n}}var o=n(22);t.exports=r},function(t,e,n){function r(t){return"function"==typeof t?t:o}var o=n(55);t.exports=r},,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";function r(t,e){var n=null==t||"number"!=typeof t.id?-1:t.id;if(n<0)return Promise.reject("Incorrect tab");var r=i(t.url)||n;if(null!=e){var o=e[r];if(void 0!==o)return o===u?Promise.resolve(n):Promise.reject(o)}var a=function(t){null!=e&&(e[r]=t||u)};return new Promise(function(t,e){return chrome.tabs.executeScript(n,c,function(){var r=chrome.runtime.lastError;null!=r?(a(r.message),e(r.message)):(a(),t(n))})})}function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(e){return r(e,t)}}Object.defineProperty(e,"__esModule",{value:!0});var c={code:"void(0)"},u="correct",i=function(t){if(null==t)return null;var e=document.createElement("a");return e.href=t,e.hostname};e.default=o,e.exec=r},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){return function(e,n){e.selectionText&&y(n).catch(function(t){return alert(t)}).then(function(e){u.default.toTab(e,{type:"CHANGE_CASE",data:t})})}}var c=n(38),u=r(c),i=n(105),a=r(i),f=n(155),s=r(f),l=n(156),p=r(l),b=n(157),d=r(b),v=n(61),y=(0,a.default)();(0,s.default)([["upperCase","UPPERCASE"],["lowerCase","lowercase"],["titleCase","Title Case"],["sentenceCase","Sentence case"],null,["camelCase","camelCase"],["pascalCase","PascalCase"],["constantCase","CONSTANT_CASE"],null,["paramCase","param-case"],["snakeCase","snake_case"],["dotCase","dot.case"],null,["toggleCase","tOGGLE cASE"],["noAccents","no accents"],["noCase","no case"]],function(t){return{title:t[1],onclick:o(t[0])}},{contexts:["editable"]}),(0,p.default)({shortcuts:{upperCase:"alt+1",lowerCase:"alt+2",titleCase:"alt+3",sentenceCase:"alt+4"}}),(0,v.listenStates)(),(0,d.default)()},function(t,e,n){"use strict";function r(t,e,n){null!=t&&t.forEach(function(t){var r=void 0;r=null===t?{type:"separator"}:e(t),n&&(r=Object.assign({},n,r)),chrome.contextMenus.create(r)})}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e,n){"use strict";function r(t){chrome.storage.sync.get(null,function(e){var n={},r=0;(0,c.default)(t,function(t,o){e.hasOwnProperty(o)||(n[o]=t,r+=1)}),r&&chrome.storage.sync.set(n)})}Object.defineProperty(e,"__esModule",{value:!0});var o=n(73),c=function(t){return t&&t.__esModule?t:{default:t}}(o);e.default=r},function(t,e,n){"use strict";function r(t,e){return null==t.url||e.some(function(e){var n=e.matches;return null==n||!n.length||n.some(function(e){return e===i||new RegExp(e).test(t.url)})})}function o(t,e){r(t,e)&&(0,u.exec)(t).catch(function(t){}).then(function(t){return e.forEach(function(e){var n=e.js,r=e.all_frames;null!=n&&n.forEach(function(e){return chrome.tabs.executeScript(t,{allFrames:!!r,file:e})})})})}function c(){var t=chrome.runtime.getManifest().content_scripts;null!=t&&chrome.tabs.query({},function(e){return e.forEach(function(e){return o(e,t)})})}Object.defineProperty(e,"__esModule",{value:!0});var u=n(105),i="<all_urls>";e.default=c}]);