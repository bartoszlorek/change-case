function spliceString(string, index, count, replacement) {
    if (index < 0) {
        index = string.length + index;
        if (index < 0) {
            index = 0;
        }
    }
    return (
        string.slice(0, index) +
        (replacement || '') +
        string.slice(index + count)
    )
}

export default spliceString;