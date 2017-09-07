import rangeNodes from './range-nodes';
import nodeValue from './utils/node-value';

function rangeText(range) {
    if (range === false) {
        return [];
    }
    let nodes = rangeNodes(range),
        length = nodes.length,
        result = [];

    for (let i = 0; i < length; i++) {
        let text = nodeValue(nodes[i]),
            startOffset = 0,
            endOffset = text.length;

        if (i === 0) {
            startOffset = range.startOffset;
        }
        if (i === length - 1) {
            endOffset = range.endOffset;
        }

        result.push({
            node: nodes[i],
            startOffset,
            endOffset,
            text
        })
    }
    return result;
}

export default rangeText;