const nextNode = checkType(getNode('nextSibling'));
const prevNode = checkType(getNode('previousSibling'));

export {
    nextNode,
    prevNode
}

function getNode(direction) {
    return node => {
        if (!node) {
            return null;
        }
        if (node.hasChildNodes()) {
            return node.firstChild;
        } else {
            while (node && !node[direction]) {
                node = node.parentNode;
            }
            if (node !== null) {
                node = node[direction];
            }
            return node;
        }
    }
}

function isType(node, type) {
    if (node && typeof type === 'number') {
        return node.nodeType === type;
    }
    return true;
}

function checkType(func) {
    return (node, type) => {
        do node = func(node);
        while (!isType(node, type));
        return node;
    }
}