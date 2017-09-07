import rangeNodes from './range-nodes';

function rangeText(range) {
    if (range === false) {
        return [];
    }
    let nodes = rangeNodes(range),
        nodesLength = nodes.length,
        output = [];

    for (let i = 0; i < nodesLength; i++) {
        let node = nodes[i],
            text = node.nodeType === 3
                ? node.nodeValue : node.value,
            start = i == 0 ? range.offset[0] : 0,
            stop = i == nodesLength - 1
                ? range.offset[1] : text.length;
        output.push({
            element: node,
            range: [start, stop],
            text: text
        })
    }
    return output;
}

export default rangeText;