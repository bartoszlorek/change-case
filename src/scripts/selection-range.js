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
                empty: () => selection.empty(),
                start: element,
                end: element,
                offset: [
                    element.selectionStart,
                    element.selectionEnd
                ]
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
        empty: () => selection.empty(),
        start: range.startContainer,
        end: range.endContainer,
        offset: [
            range.startOffset,
            range.endOffset
        ]
    }
}

export default selectionRange;