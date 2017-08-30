function spliceString(string, index, count, add) {
    if (index < 0) {
        index = string.length + index;
        if (index < 0) {
            index = 0;
        }
    }
    return string.slice(0, index) + (add || '') +
        string.slice(index + count);
}

export default spliceString;