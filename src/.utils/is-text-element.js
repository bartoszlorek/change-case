function isTextElement(node) {
    return !!(node && typeof node.value === 'string');
}

export default isTextElement;
