import {
    setSelection,
    selectionRange,
    rangeContent
} from './.utils/selection.min'

import message from './.utils/chrome/message'
import operators from './scripts/operators/index'

import applyMethod from './scripts/apply-method'
import bindShortcuts from './scripts/bind-shortcuts'
import dispatchEvent from './scripts/dispatch-event'
import dispatchError from './scripts/dispatch-error'

const handleChangeCase = methodName => {
    let range = selectionRange()
    if (range.collapsed) {
        return
    }
    let content = rangeContent(range)
    if (content.length === 0) {
        return dispatchError(range)
    }
    applyMethod(methodName, operators).then(method => {
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
