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

const executeScript = (function () {
    let executedTabs = [];

    chrome.tabs.onUpdated.addListener(function (tabId, info) {
        if (!isCompleted(info)) return;
        removeItem(executedTabs, tabId);
    });
    return function (tabId, callback) {
        if (executedTabs.indexOf(tabId) === -1) {
            chrome.tabs.executeScript(tabId, {
                file: 'content-script.js'
            }, () => {
                if (chrome.runtime.lastError) {
                    alert(chrome.runtime.lastError.message);
                    return;
                }
                executedTabs.push(tabId);
                callback();
            })
        } else {
            callback();
        }
    }
})();

function handleChangeCase(method) {
    return function (info, tab) {
        if (!info.selectionText) {
            return;
        }
        executeScript(tab.id, function () {
            chrome.tabs.sendMessage(tab.id, {
                type: 'CHANGE_CASE',
                value: method
            })
        })
    }
}

function createMenu() {
    const items = [
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
    let length = items.length,
        params;

    for (let i = 0; i < length; i++) {
        if (items[i] === null) {
            params = {
                type: 'separator'
            }
        } else {
            params = {
                title: items[i][1],
                onclick: handleChangeCase(items[i][0])
            }
        }
        params.contexts = ['editable'];
        chrome.contextMenus.create(params);
    }
}

createMenu();