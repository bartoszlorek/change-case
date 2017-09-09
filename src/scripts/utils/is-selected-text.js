function isSelectedText(selection) {
    if (selection.length === 1) {
        let { startOffset, endOffset } = selection[0];
        return startOffset !== endOffset;
    }
    return selection.length > 1;
}

export default isSelectedText;