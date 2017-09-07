import nextNode from './next-node';
import isTextNode from './utils/is-text-node';

function rangeNodes(range) {
    let node = range && range.start,
        endNode = range && range.end,
        nodes = [];

    if (!node || !endNode) {
        return nodes;
    }
    nodes.push(node);
    if (node === endNode) {
        return nodes;
    }
    while (node && node !== endNode) {
        node = nextNode(node);
        if (isTextNode(node)) {
            nodes.push(node);
        }
    }
    return nodes;
}

export default rangeNodes;