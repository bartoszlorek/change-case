import isTextNode from './is-text-node';
import isTextElement from './is-text-element';

function nodeValue(node, value) {
    if (isTextNode(node)) {
        return typeof value === 'string'
            ? node.nodeValue = value
            : node.nodeValue;
    }
    if (isTextElement(node)) {
        return typeof value === 'string'
            ? node.value = value
            : node.value;
    }
    return '';
}

export default nodeValue;