import message from './.utils/chrome/message'
import executableTab from './.utils/chrome/executable-tab'
import createMenu from './.utils/chrome/create-menu'
import setDefaults from './.utils/chrome/set-defaults'
import initScripts from './.utils/chrome/initialize-scripts'

import {
    listenStates,
    INSTALL_STATE,
    UPDATE_STATE
} from './.utils/chrome/extension-state'

const exec = executableTab()

function handleClick(methodName) {
    return (info, tab) => {
        if (info.selectionText) {
            exec(tab)
                .catch(error => alert(error))
                .then(id => {
                    message.toTab(id, {
                        type: 'CHANGE_CASE',
                        data: methodName
                    })
                })
        }
    }
}

createMenu(
    [
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
        ['noAccents', 'no accents'],
        ['noCase', 'no case']
    ],
    item => ({
        title: item[1],
        onclick: handleClick(item[0])
    }),
    {
        contexts: ['editable']
    }
)

setDefaults({
    updateNotification: true,
    shortcuts: {
        upperCase: 'alt+1',
        lowerCase: 'alt+2',
        titleCase: 'alt+3',
        sentenceCase: 'alt+4'
    }
})

listenStates({
    [INSTALL_STATE]: () => true,
    [UPDATE_STATE]: data => data.updateNotification
})

initScripts()
