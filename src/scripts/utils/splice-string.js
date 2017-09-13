function spliceString(string, start, end, replacement) {
    if (typeof string !== 'string') {
        return '';
    }
    // replacement instead of omitted end
    if (typeof end !== 'number') {
        replacement = end;
    }
    let length = string.length;
    start = index(start, length, 0);
    end = index(end, length, length);

    if (start > end) {
        end = [start, start = end][0];
    }
    if (start >= length || start === end) {
        return string;
    }
    if (typeof replacement === 'function') {
        replacement = replacement(string
            .substring(start, end));
    }
    return string.substring(0, start)
        + (replacement || '')
        + string.substring(end);
}

function index(pos, length, fallback) {
    if (typeof pos === 'number') {
        return pos < 0 ? Math.max(length + pos, 0) : pos;
    }
    return fallback;
}

export default spliceString;