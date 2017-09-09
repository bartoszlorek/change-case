import selectionRange from './scripts/utils/selection-range';
import { onMessage } from './scripts/utils/chrome-utils';

import rangeText from './scripts/range-text';
import dispatchEvent from './scripts/dispatch-event';
import dispatchError from './scripts/dispatch-error';

import applyMethod from './scripts/apply-method';
import applyBlacklist from './scripts/apply-blacklist';

const selectionText = () => rangeText(selectionRange());

const filter = method => new Promise(resolve => {
    chrome.storage.sync.get('blacklist', data => resolve(
        value => applyBlacklist(method, value, data.blacklist)
    ))
});

onMessage('CHANGE_CASE', methodName => {
    let selection = selectionText();
    if (selection.length === 0) {
        return dispatchError();
    }
    selection.forEach(selected => {
        applyMethod(methodName, selected, filter);
        dispatchEvent(selected.node);
    })
});