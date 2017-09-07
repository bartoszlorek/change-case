import applyMethod from './scripts/apply-method';
import selectionText from './scripts/selection-text';
import dispatchEvent from './scripts/dispatch-event';
import dispatchError from './scripts/dispatch-error';

if (typeof chrome !== 'undefined') {
    chrome.runtime.onMessage.addListener(function (request) {
        if (!request || request.type !== 'CHANGE_CASE') {
            return false;
        }
        let methodName = request.value || false,
            selection = selectionText();
        if (selection.length === 0) {
            dispatchError();
            return false;
        }
        for (let i = 0; i < selection.length; i++) {
            applyMethod(methodName, selection[i]);
            dispatchEvent(selection[i].element);
        }
    })
}