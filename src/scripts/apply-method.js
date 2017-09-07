import CASE_METHODS from './cases';

function applyMethod(methodName, node) {
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

    if (node.element.nodeType === 3)
        node.element.nodeValue = result;
    else node.element.value = result;
    return true;
}

export default applyMethod;