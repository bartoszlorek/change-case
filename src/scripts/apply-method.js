import CASE_METHODS from './cases';
import nodeValue from './utils/node-value';

// todo: apply filter 

function applyMethod(methodName, node, filter) {
    let method = CASE_METHODS[methodName],
        result;

    if (typeof method !== 'function' || !node) {
        return false;
    }
    let { element, text, offset } = node;
    result = text.substring(0, offset[0])
        + method(text.substring(offset[0], offset[1]))
        + text.substring(offset[1]);

    return nodeValue(element, result);
}

export default applyMethod;