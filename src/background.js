import { sendToContent } from './.utils/chrome/message';
import scriptableTab from './.utils/chrome/scriptable-tab';
import setDefaults from './.utils/chrome/set-defaults';
import createMenu from './.utils/chrome/create-menu';

const scriptable = scriptableTab();

function handleClick(methodName) {
    return (info, tab) => {
        if (info.selectionText) {
            scriptable(tab).then(id =>
                sendToContent({
                    type: 'CHANGE_CASE',
                    data: methodName,
                    id
                })
            ).catch(error => alert(error));
        }
    }
}

createMenu([
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
],
    item => ({
        title: item[1],
        onclick: handleClick(item[0])
    }), {
        contexts: ['editable']
    }
);

setDefaults({
    shortcuts: {
        upperCase: 'alt+1',
        lowerCase: 'alt+2',
        titleCase: 'alt+3',
        sentenceCase: 'alt+4'
    }
});

chrome.runtime.onInstalled.addListener(details => {
    let { reason } = details;
    if (reason === 'install' || reason === 'update') {
        chrome.runtime.openOptionsPage();
    }
});