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
            start = i ? 0 : range.offset[0],
            end = i === length - 1
                ? range.offset[1]
                : text.length;

        result.push({
            element: nodes[i],
            offset: [start, end],
            text: text
        })
    }
    return result;
}

export default rangeText;