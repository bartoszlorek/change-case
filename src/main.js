
var executeScript = (function() {
	var executedTabs = [];

	return function(tabId, callback) {
		if (executedTabs.indexOf(tabId) === -1) {
			executedTabs.push(tabId);
			chrome.tabs.executeScript(tabId, {
				file: 'script.js'
			}, callback);

		} else {
			callback();
		}
	}
})();

function changeCase(method) {
	return function(info, tab) {
		if (! info.editable) {
			return;
		}
		executeScript(tab.id, function() {
			chrome.tabs.sendMessage(tab.id, {
				method: method
			});
		});
	}
}

function createMenu() {
	var cases = {
		upperCase: 'UPPERCASE',
		lowerCase: 'lowercase',
		titleCase: 'Title Case',
		sentenceCase: 'Sentence case',
		camelCase: 'camelCase',
		pascalCase: 'PascalCase',
		constantCase: 'CONSTANT_CASE',
		paramCase: 'param-case',
		snakeCase: 'snake_case',
		dotCase: 'dot.case',
		noCase: 'no case'
	}
	for (var name in cases) {
		chrome.contextMenus.create({
			title: cases[name],
			contexts: ['selection'], //editable
			onclick: changeCase(name)
		});
	}
}

createMenu();