import isTextNode from './is-text-node';

function nodeValue(node, value) {
    let prop = isTextNode(node)
        ? 'nodeValue'
        : 'value';

    return value !== undefined
        ? node[prop] = value
        : node[prop];
}

export default nodeValue;