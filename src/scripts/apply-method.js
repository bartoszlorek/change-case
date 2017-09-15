import CASE_METHODS from './cases';
import nodeValue from './utils/node-value';
import spliceString from './utils/splice-string';

function applyMethod(methodName, element, filter) {
    let method = CASE_METHODS[methodName],
        result;

    if (typeof method !== 'function' || element == null) {
        return Promise.reject();
    }
    if (typeof filter === 'function') {
        method = filter(method);
    }
    return Promise.resolve(method).then(resolved => {
        let { text, startOffset, endOffset } = element;
        return nodeValue(element.node, spliceString(
            text, startOffset, endOffset, resolved));
    });
}

export default applyMethod;
