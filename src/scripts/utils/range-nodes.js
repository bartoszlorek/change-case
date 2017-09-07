import nextNode from './next-node';

function rangeNodes(range) {
    let nodes = [],
        node,
        endNode;

    if (range) {
        node = range.startContainer;
        endNode = range.endContainer;
    } else {
        return nodes;
    }

    nodes.push(node);
    if (node === endNode) {
        return nodes;
    }

    while (node && node !== endNode) {
        nodes.push(node = nextNode(node));
    }
    return nodes;
}

export default rangeNodes;