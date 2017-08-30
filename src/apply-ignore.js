function replaceAll(string, search, replace) {
    return string.replace(new RegExp(search, 'g'), replace);
}

function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

function applyIgnore(method, text, ignore) {
    let result = method(text);
    if (!isArray(ignore)) {
        return result;
    }
    ignore.forEach(word => {
        let convertedWord = method(word);
        result = replaceAll(result, convertedWord, word);
    })
    return result;
}

export default applyIgnore;