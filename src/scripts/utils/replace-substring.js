function replaceSubstring(string, start, end, replacement) {
    if (typeof start !== 'number') {
        return string;
    }
    if (typeof end !== 'number') {
        replacement = end;
        end = string.length;
    }
    if (start === end) {
        return '';
    }
    if (start > end) {
        end = [start, start = end][0];
    }

    if (typeof replacement === 'function') {
        replacement = replacement(string.substring(start, end));
    }
    return string.substring(0, start)
        + (replacement || '')
        + string.substring(end);
}

export default replaceSubstring;