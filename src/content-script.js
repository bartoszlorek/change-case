import {
    setSelection,
    selectionRange,
    rangeContent
} from './.utils/selection.min'

import message from './.utils/chrome/message'

import applyMethod from './scripts/apply-method'
import applyBlacklist from './scripts/apply-blacklist'
import bindShortcuts from './scripts/bind-shortcuts'
import dispatchEvent from './scripts/dispatch-event'
import dispatchError from './scripts/dispatch-error'
import parseList from './scripts/parse-list'

const filter = method => new Promise(resolve => {
    chrome.storage.sync.get('blacklist', data => resolve(value => {
        let list = parseList(data.blacklist)
        return applyBlacklist(method, value, list)
    }))
})

const handleChangeCase = methodName => {
    let range = selectionRange()
    if (range.collapsed) {
        return
    }
    let content = rangeContent(range)
    if (content.length === 0) {
        return dispatchError(range)
    }
    applyMethod(methodName, filter).then(method => {
        content.forEach(item => {
            item.selectedText = method(item.selectedText)
            dispatchEvent(item.node)
        })
        setSelection(range)
    })
}

const handleShortcuts = () => {
    chrome.storage.sync.get('shortcuts', data => {
        bindShortcuts(data.shortcuts, handleChangeCase)
    })
}

message.on('CHANGE_CASE', ({ data }) => handleChangeCase(data))
message.on('BIND_SHORTCUTS', handleShortcuts)
handleShortcuts()
