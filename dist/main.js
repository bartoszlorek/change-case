!function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}({5:function(e,t,n){"use strict";function a(e){return e&&"complete"===e.status&&void 0===e.url}function r(e,t){var n=e.indexOf(t);n!==-1&&e.splice(n,1)}function c(e){return function(t,n){t.selectionText&&o(n.id,function(){chrome.tabs.sendMessage(n.id,{type:"CHANGE_CASE",value:e})})}}function s(){for(var e=[["upperCase","UPPERCASE"],["lowerCase","lowercase"],["titleCase","Title Case"],["sentenceCase","Sentence case"],null,["camelCase","camelCase"],["pascalCase","PascalCase"],["constantCase","CONSTANT_CASE"],null,["paramCase","param-case"],["snakeCase","snake_case"],["dotCase","dot.case"],null,["toggleCase","tOGGLE cASE"],["noCase","no case"]],t=e.length,n=void 0,a=0;a<t;a++)n=null===e[a]?{type:"separator"}:{title:e[a][1],onclick:c(e[a][0])},n.contexts=["editable"],chrome.contextMenus.create(n)}var o=function(){var e=[];return chrome.tabs.onUpdated.addListener(function(t,n){a(n)&&r(e,t)}),function(t,n){e.indexOf(t)===-1?(e.push(t),chrome.tabs.executeScript(t,{file:"script.js"},n)):n()}}();s()}});