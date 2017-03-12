
function isCompleted(info) {
    return info && info.status === 'complete'
        && typeof info.url === 'undefined';
}

function removeItem(array, item) {
    let index = array.indexOf(item);
    if (index !== -1) {
        array.splice(index, 1);
    }
}

const executeScript = (function() {
    let executedTabs = [];

    chrome.tabs.onUpdated.addListener(function(tabId, info) {
        if (! isCompleted(info)) return;
        removeItem(executedTabs, tabId);
    });
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
    const cases = [
        ['upperCase', 'UPPERCASE'],
        ['lowerCase', 'lowercase'],
        ['titleCase', 'Title Case'],
        ['sentenceCase', 'Sentence case'],
        null,
        ['camelCase', 'camelCase'],
        ['pascalCase', 'PascalCase'],
        ['constantCase', 'CONSTANT_CASE'],
        null,
        ['paramCase', 'param-case'],
        ['snakeCase', 'snake_case'],
        ['dotCase', 'dot.case'],
        null,
        ['toggleCase', 'tOGGLE cASE'],
        ['noCase', 'no case']
    ];
    let length = cases.length,
        params;

    for (let i=0; i<length; i++) {
        if (cases[i] === null) {
            params = {
                type: 'separator'
            }
        } else {
            params = {
                title: cases[i][1],
                onclick: changeCase(cases[i][0])
            }
        }
        params.contexts = ['selection'];
        chrome.contextMenus.create(params);
    }
}

createMenu();