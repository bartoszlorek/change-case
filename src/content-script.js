import selectionRange from './scripts/utils/selection-range';
import isSelectedText from './scripts/utils/is-selected-text';
import { onMessage } from './scripts/utils/chrome-utils';

import rangeText from './scripts/range-text';
import dispatchEvent from './scripts/dispatch-event';
import dispatchError from './scripts/dispatch-error';

import applyMethod from './scripts/apply-method';
import applyBlacklist from './scripts/apply-blacklist';
import bindShortcuts from './scripts/bind-shortcuts';

const selectionText = () => rangeText(selectionRange());

const filter = method => new Promise(resolve => {
    chrome.storage.sync.get('blacklist', data => resolve(
        value => applyBlacklist(method, value, data.blacklist)
    ))
});

const handleChangeCase = methodName => {
    let selection = selectionText();
    if (selection.length === 0) {
        return dispatchError();
    }
    if (!isSelectedText(selection)) {
        return;
    }
    selection.forEach(selected => {
        applyMethod(methodName, selected, filter);
        dispatchEvent(selected.node);
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