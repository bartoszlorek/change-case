import {
    sendToContent,
    createMenu,
    setDefaults
} from './scripts/utils/chrome-utils';

function handleClick(methodName) {
    return (info, tab) => {
        if (info.selectionText) {
            sendToContent({
                id: tab.id,
                type: 'CHANGE_CASE',
                data: methodName
            })
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