import rangeNodes from './range-nodes';
import nodeValue from './node-value';

export default range => rangeNodes(range).map(
    (node, index, nodes) => {
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
    }
);