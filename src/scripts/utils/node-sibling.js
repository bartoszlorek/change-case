export {
    nextNode,
    prevNode
}

function isType(node, type) {
    if (node && typeof type === 'number') {
        return node.nodeType === type;
    }
    return true;
}

function nextNode(node, type) {
    let result = null;
    if (!node) {
        return result;
    }

    if (node.hasChildNodes()) {
        result = node.firstChild;
    } else {
        while (node && !node.nextSibling) {
            node = node.parentNode;
        }
        if (node !== null) {
            result = node.nextSibling;
        }
    }

    if (!isType(result, type)) {
        return nextNode(result, type);
    }
    return result;
}

function prevNode(node, type) {
    let result = null;
    if (!node) {
        return result;
    }

    if (node.hasChildNodes()) {
        result = node.firstChild;
    } else {
        while (node && !node.previousSibling) {
            node = node.parentNode;
        }
        if (node !== null) {
            result = node.previousSibling;
        }
    }

    if (!isType(result, type)) {
        return prevNode(result, type);
    }
    return result;
}