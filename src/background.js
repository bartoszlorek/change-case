import { sendToContent, createMenu } from './scripts/utils/chrome-utils';

function handleClick(method) {
    return (info, tab) => {
        if (info.selectionText) {
            sendToContent({
                id: tab.id,
                type: 'CHANGE_CASE',
                data: method
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