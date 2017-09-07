import CASE_METHODS from './cases';
import nodeValue from './utils/node-value';

// todo: apply filter 

function applyMethod(methodName, selected, filter) {
    let method = CASE_METHODS[methodName],
        result;

    if (typeof method !== 'function' || !selected) {
        return false;
    }
    let { text, startOffset, endOffset } = selected;
    result = text.substring(0, startOffset)
        + method(text.substring(startOffset, endOffset))
        + text.substring(endOffset);

    return nodeValue(selected.node, result);
}

export default applyMethod;