import nextNode from './next-node';

function rangeNodes(range) {
    let node = range && range.start || null,
        endNode = range && range.end || null,
        nodes = [];

    if (!node || !endNode) return nodes;
    if (node === endNode) return [node];
    if (node.nodeType === 3) {
        nodes.push(node);
    }
    while (node && node !== endNode) {
        node = nextNode(node);
        if (node.nodeType === 3) {
            nodes.push(node);
        }
    }
    return nodes;
}

export default rangeNodes;