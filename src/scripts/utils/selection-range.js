import { nextNode, prevNode } from './node-sibling';
import isTextNode from './is-text-node';

function selectionRange(_window = window, _document = document) {
    let selection = _window.getSelection(),
        element = _document.activeElement;

    if (!element) {
        return null;
    }
    let tagName = element.tagName.toLowerCase();
    if (tagName === 'textarea' || tagName === 'input') {
        try {
            return {
                startContainer: element,
                startOffset: element.selectionStart,
                endContainer: element,
                endOffset: element.selectionEnd
            }
        } catch (e) {
            return null;
        }
    }
    if (tagName === 'iframe' || tagName === 'frame') {
        return selectionRange(
            element.contentWindow,
            element.contentDocument
        )
    }
    if (selection.rangeCount > 0) {
        return validNativeRange(selection.getRangeAt(0));
    }
    return null;
}

function validNativeRange(range) {
    let {
        startContainer,
        startOffset,
        endContainer,
        endOffset
    } = range;

    if (!isTextNode(startContainer)) {
        startContainer = nextNode(startContainer, 3);
        startOffset = 0;
    }
    if (!isTextNode(endContainer)) {
        endContainer = prevNode(endContainer, 3);
        endOffset = endContainer.nodeValue.length;
    }
    return {
        startContainer,
        startOffset,
        endContainer,
        endOffset
    }
}

export default selectionRange;