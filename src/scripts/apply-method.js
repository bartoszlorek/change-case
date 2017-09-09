import CASE_METHODS from './cases';
import nodeValue from './utils/node-value';
import replaceSubstring from './utils/replace-substring';

function applyMethod(methodName, selected, filter) {
    let method = CASE_METHODS[methodName],
        result;

    if (typeof method !== 'function' || !selected) {
        return Promise.reject();
    }
    if (typeof filter === 'function') {
        method = filter(method);
    }

    return Promise.resolve(method).then(resolved => {
        let { text, startOffset, endOffset } = selected;
        return nodeValue(selected.node, replaceSubstring(
            text, startOffset, endOffset, resolved));
    });
}

export default applyMethod;