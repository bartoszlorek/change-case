import applyMethod from './scripts/apply-method';
import selectionRange from './scripts/utils/selection-range';
import rangeText from './scripts/range-text';
import dispatchEvent from './scripts/dispatch-event';
import dispatchError from './scripts/dispatch-error';

const selectionText = () => rangeText(selectionRange());

chrome.runtime.onMessage.addListener(function (request) {
    if (!request || request.type !== 'CHANGE_CASE') {
        return false;
    }
    let methodName = request.value || false,
        selection = selectionText();
    if (selection.length === 0) {
        return dispatchError();
    }
    for (let i = 0; i < selection.length; i++) {
        applyMethod(methodName, selection[i]);
        dispatchEvent(selection[i].node);
    }
});