import CASE_METHODS from './scripts/cases';
import dispatchError from './scripts/error';
import selectionText from './scripts/selection';

function dispatchEvents(element) {
    if (element.nodeType !== 1) {
        element = element.parentElement;
    }
    let params = { 'bubbles': true },
        events = [ 'input' ];
    for (let i=0; i<events.length; i++) {
        element.dispatchEvent(
            new Event(events[i], params));
    }
}

function changeCase(methodName, node) {
    let method = CASE_METHODS[methodName],
        result,
        start,
        stop;
        
    if (typeof method !== 'function' || !(node && node.text)) {
        return false;
    }
    start = node.range[0];
    stop = node.range[1];
    result = node.text.substring(0, start);
    result += method(node.text.substring(start, stop));
    result += node.text.substring(stop);

    if ( node.element.nodeType === 3 )
         node.element.nodeValue = result;
    else node.element.value = result;

    dispatchEvents(node.element);
    return true;
}

if (typeof chrome !== 'undefined') {
    chrome.runtime.onMessage.addListener(function(request) {
        if (! request || request.type !== 'CHANGE_CASE') {
            return false;
        }
        let methodName = request.value || false,
            selection = selectionText();
        if (selection.length === 0) {
            dispatchError();
            return false;
        }
        for (let i=0; i<selection.length; i++) {
            changeCase(methodName, selection[i]);
        }
    })
}

export let _private;
if (process && process.env.NODE_ENV === 'test') {
    _private = {
        changeCase
    }
}