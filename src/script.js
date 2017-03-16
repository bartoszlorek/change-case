import CASE_METHODS from './cases';

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

function parseNodes(range) {
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

function selectionRange(localWindow, localDocument) {
    localWindow = localWindow || window;
    localDocument = localDocument || document;

    let element = localDocument.activeElement,
        tagName = element.tagName && element.tagName.toLowerCase() || false,
        type = element.type && element.type.toLowerCase() || false,
        selection,
        range;

    if (tagName === false) return false;
    if (tagName === 'textarea' || tagName === 'input' && type === 'text') {
        return {
            empty: () => localWindow.getSelection().empty(),
            start: element,
            end: element,
            offset: [
                element.selectionStart,
                element.selectionEnd
            ]
        }
    }
    if (tagName === 'iframe' || tagName === 'frame') {
        localWindow = element.contentWindow;
        localDocument = element.contentDocument;
    }
    selection = localWindow.getSelection();
    if (selection.rangeCount === 0) {
        return false;
    }
    range = selection.getRangeAt(0);

    // sometimes iframe returns incorrect active element
    // with offsets equal to 1 as a Range type
    if ((tagName === 'iframe' || tagName === 'frame')
    &&  range.startOffset - range.endOffset === 0) {
        return selectionRange(
            localWindow,
            localDocument)
    }
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

function changeCase(methodName, node) {
    let method = CASE_METHODS[methodName],
        result,
        start,
        stop;
        
    if (typeof method !== 'function' || !(node && node.text)) {
        return false;
    }
    start = node.range[0];
    stop = node.range[1];
    result = node.text.substring(0, start);
    result += method(node.text.substring(start, stop));
    result += node.text.substring(stop);

    if ( node.element.nodeType === 3 )
         node.element.nodeValue = result;
    else node.element.value = result;
    return true;
}

if (typeof chrome !== 'undefined') {
    chrome.runtime.onMessage.addListener(function(request) {
        let methodName = request && request.method || false,
            range = selectionRange(),
            nodes = parseNodes(range);

        if (range !== false) range.empty();
        for (let i=0; i<nodes.length; i++) {
            changeCase(methodName, nodes[i]);
        }
    })
}

export let testExport;
if (process && process.env.NODE_ENV === 'test') {
    testExport = {
        nextNode,
        getRangeTextNodes,
        parseRange,
        changeCase
    }
}