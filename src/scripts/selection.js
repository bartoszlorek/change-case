function nextNode(node) {
    if (node.hasChildNodes()) {
        return node.firstChild;
    } else {
        while (node && !node.nextSibling)
            node = node.parentNode;
        return node ? node.nextSibling : null;
    }
}

function rangeTextNodes(range) {
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

export function interpolateRange(range) {
    if (range === false) {
        return [];
    }
    let nodes = rangeTextNodes(range),
        nodesLength = nodes.length,
        output = [];

    for (let i=0; i<nodesLength; i++) {
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

export function selectionRange(localWindow, localDocument) {
    localWindow = localWindow || window;
    localDocument = localDocument || document;

    let element = localDocument.activeElement,
        tagName = element.tagName && element.tagName.toLowerCase() || false,
        selection,
        range;

    if (tagName === false) return false;
    if (tagName === 'textarea' || tagName === 'input') {
        try {
            return {
                empty: () => localWindow.getSelection().empty(),
                start: element,
                end: element,
                offset: [
                    element.selectionStart,
                    element.selectionEnd
                ]
            }
        } catch(e) {
            return false;
        }
    }
    if (tagName === 'iframe' || tagName === 'frame') {
        return selectionRange(
            element.contentWindow,
            element.contentDocument
        )
    }
    selection = localWindow.getSelection();
    if (selection.rangeCount === 0) {
        return false;
    }
    range = selection.getRangeAt(0);
    
    return {
        empty: () => selection.empty(),
        start: range.startContainer,
        end: range.endContainer,
        offset: [
            range.startOffset,
            range.endOffset
        ]
    }
}

export default function selectionText(emptyAfter = false) {
    let range = selectionRange(),
        nodes = interpolateRange(range);
    if (emptyAfter) range.empty();
    return nodes;
}

export let _private;
if (process && process.env.NODE_ENV === 'test') {
    _private = {
        rangeTextNodes,
        nextNode
    }
}