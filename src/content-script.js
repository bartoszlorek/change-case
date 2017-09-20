import selectionRange from './.utils/selection-range';
import rangeContent from './.utils/range-content';
import { onMessage } from './.utils/chrome/message';

import applyMethod from './scripts/apply-method';
import applyBlacklist from './scripts/apply-blacklist';
import bindShortcuts from './scripts/bind-shortcuts';
import dispatchEvent from './scripts/dispatch-event';
import dispatchError from './scripts/dispatch-error';

const filter = method => new Promise(resolve => {
    chrome.storage.sync.get('blacklist', data => resolve(
        value => applyBlacklist(method, value, data.blacklist)
    ))
});

const handleChangeCase = methodName => {
    let range = selectionRange();
    if (range.collapsed) {
        return;
    }
    let content = rangeContent(range);
    if (content.length === 0) {
        return dispatchError(range);
    }
    content.forEach(element => {
        applyMethod(methodName, element, filter);
        dispatchEvent(element.node);
    })
}

const handleShortcuts = () => {
    chrome.storage.sync.get('shortcuts', data => {
        bindShortcuts(data.shortcuts, handleChangeCase);
    });
}

onMessage('CHANGE_CASE', handleChangeCase);
onMessage('BIND_SHORTCUTS', handleShortcuts);
handleShortcuts();