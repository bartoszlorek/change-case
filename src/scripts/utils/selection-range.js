function selectionRange(_window, _document) {
    _window = _window || window;
    _document = _document || document;

    let selection = _window.getSelection(),
        element = _document.activeElement,
        tagName = element.tagName && element.tagName.toLowerCase();

    if (!tagName) {
        return false;
    }

    if (tagName === 'textarea' || tagName === 'input') {
        try {
            return {
                startContainer: element,
                startOffset: element.selectionStart,
                endContainer: element,
                endOffset: element.selectionEnd
            }
        } catch (e) {
            return false;
        }
    }

    if (tagName === 'iframe' || tagName === 'frame') {
        return selectionRange(
            element.contentWindow,
            element.contentDocument
        )
    }

    if (selection.rangeCount === 0) {
        return false;
    }
    let range = selection.getRangeAt(0);
    return {
        startContainer: range.startContainer,
        startOffset: range.startOffset,
        endContainer: range.endContainer,
        endOffset: range.endOffset
    }
}

export default selectionRange;