import CASES_METHODS from './cases';

function nextNode(node) {
    if (node.hasChildNodes()) {
        return node.firstChild;
    } else {
        while (node && !node.nextSibling)
            node = node.parentNode;
        return node ? node.nextSibling : null;
    }
}

function getRangeTextNodes(range) {
    let node = range.startContainer,
        endNode = range.endContainer,
        textNodes = [];

    if (node === endNode) {
        return [node];
    }
    if (node.nodeType === 3) {
        textNodes.push(node);
    }
    while (node && node !== endNode) {
        node = nextNode(node);
        if (node.nodeType === 3) {
            textNodes.push(node);
        }
    }
    return textNodes;
}

function getRangeText(range) {
    let nodes = getRangeTextNodes(range),
        nodesLength = nodes.length,
        selection = [],
        start,
        stop,
        text;

    for (let i=0; i<nodesLength; i++) {
        text = nodes[i].nodeValue;
        start = i === 0 ? range.startOffset : 0;
        stop = i === nodesLength - 1
            ? range.endOffset
            : text.length;

        if (nodesLength === 1) {
            stop = range.endOffset;
        }
        selection.push({
            element: nodes[i],
            range: [start, stop],
            text: text,
            type: 'text'
        })
    }
    return selection;
}

function getValue(element) {
    return {
        element: element,
        range: [
            element.selectionStart,
            element.selectionEnd
        ],
        text: element.value,
        type: element.tagName.toLowerCase()
    }
}

function getSelectedNodes() {
    let element = document.activeElement,
        tagName = element.tagName && element.tagName.toLowerCase() || false,
        type = element.type && element.type.toLowerCase() || false,
        localWindow = window;

    if (tagName === 'textarea' || tagName === 'input' && type === 'text') {
        return [ getValue(element) ];
    }
    if (tagName === 'iframe') {
        localWindow = element.contentWindow || element;
    }
    return getRangeText(localWindow
        .getSelection()
        .getRangeAt(0));
}

function changeCase(method, node) {
    if (typeof CASES_METHODS[method] !== 'function') {
        return;
    }
    let before = node.text.substring(0, node.range[0]),
        current = node.text.substring(node.range[0], node.range[1]),
        after = node.text.substring(node.range[1]),
        text = before + CASES_METHODS[method](current) + after;

    if (node.type === 'textarea' || node.type === 'input') {
        node.element.value = text;

    } else if (node.type === 'text') {
        node.element.nodeValue = text;
    }
}

chrome.runtime.onMessage.addListener(function(request) {
    let method = request && request.method || false,
        nodes = getSelectedNodes();
        
    window.getSelection().empty();
    for (let i=0; i<nodes.length; i++) {
        changeCase(method, nodes[i]);
    }
});