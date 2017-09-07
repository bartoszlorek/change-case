import rangeNodes from './utils/range-nodes';
import nodeValue from './utils/node-value';
import isTextNode from './utils/is-text-node';

export default (range) => rangeNodes(range)
    .filter(isTextNode)
    .map((node, index, nodes) => {
        let text = nodeValue(node),
            startOffset = 0,
            endOffset = text.length;

        if (index === 0) {
            startOffset = range.startOffset;
        }
        if (index === nodes.length - 1) {
            endOffset = range.endOffset;
        }
        return {
            node,
            startOffset,
            endOffset,
            text
        }
    });