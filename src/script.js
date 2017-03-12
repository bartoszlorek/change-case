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

function changeCase(methodName, node) {
    let method = CASE_METHODS[methodName],
        result,
        start,
        stop;

    if (typeof method !== 'function') {
        return;
    }
    start = node.range[0];
    stop = node.range[1];
    result = node.text.substring(0, start);
    result += method(node.text.substring(start, stop));
    result += node.text.substring(stop);

    if (node.type === 'textarea' || node.type === 'input') {
        node.element.value = result;

    } else if (node.type === 'text') {
        node.element.nodeValue = result;
    }
}

chrome.runtime.onMessage.addListener(function(request) {
    let methodName = request && request.method || false,
        nodes = getSelectedNodes();
        
    window.getSelection().empty();
    for (let i=0; i<nodes.length; i++) {
        changeCase(methodName, nodes[i]);
    }
});