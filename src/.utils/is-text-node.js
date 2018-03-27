function isTextNode(node) {
    return !!(node && node.nodeType === 3)
}

export default isTextNode
