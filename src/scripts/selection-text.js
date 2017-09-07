import selectionRange from './selection-range';
import rangeText from './range-text';

function selectionText(emptyAfter = false) {
    let range = selectionRange(),
        text = rangeText(range);

    if (emptyAfter) {
        range.empty();
    }
    return text;
}

export default selectionText;