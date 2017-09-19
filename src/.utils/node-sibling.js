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

function checkType(func) {
    return (node, type) => {
        node = func(node);

        if (typeof type === 'number') {
            while (node && node.nodeType !== type) {
                node = func(node);
            }
        }
        return node;
    }
}