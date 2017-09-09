import { forEach } from 'lodash';
import Mousetrap from 'mousetrap';

function makeBindLocal(shortcuts, callback) {
    return _document => {
        let mousetrap = new Mousetrap(_document.body);
        mousetrap.stopCallback = () => false;

        forEach(shortcuts, (code, methodName) => {
            if (!code) {
                return;
            }
            mousetrap.bind(code, e => {
                callback(methodName);
                return false;
            });
        })
    }
}

function bindShortcuts(shortcuts, callback) {
    if (!shortcuts) {
        return;
    }
    let bindLocal = makeBindLocal(
        shortcuts,
        callback
    );
    bindLocal(document);

    // todo: bind to iframes active long after load
    forEach(document.querySelectorAll('iframe'), iframe => {
        bindLocal(iframe.contentWindow.document);
    })
}

export default bindShortcuts;