const opening = a => a && a[0]
const closing = a => a && a[a.length-1]

const getMark = (char, marks) => {
    let length = marks.length,
        mark

    while (mark = marks[--length]) {
        if (mark[0] === char) {
            return mark
        }
    }
    return null
}

const isProperClosed = (prev, next) => {
    return !(prev !== next && prev !== null && next !== null)
}

function markdown(string, markTags, propTag) {
    markTags = markTags == null ? [] : markTags

    if (!string || !markTags.length) {
        return [{
            mark: null,
            prop: null,
            text: string
        }]
    }

    let results = [],
        currentMark = null,
        closingMark = '',
        charset = '',
        char = '',
        index = 0

    const openingProp = opening(propTag)
    const closingProp = closing(propTag)

    const nextChar = () => {
        return char = string[index++]
    }

    const addCharset = prop => {
        if (charset !== '') {
            results.push({
                mark: currentMark,
                prop: prop || null,
                text: charset
            })
            charset = ''
        }
    }

    const getProp = () => {
        if (string[index] !== openingProp) {
            return null
        }
        let prop = ''

        index++ // skip opening tag
        while (nextChar()) {
            if (char === closingProp) {
                return prop
            }
            prop += char
        }
        return null
    }

    while (nextChar()) {
        let nextMark = getMark(char, markTags)

        if (!isProperClosed(currentMark, nextMark)) {
            throw `There is opening tag '${opening(nextMark)}' instead of closing '${closing(currentMark)}' at index ${index - 1}.`
        }

        // charset before opening tag
        if (currentMark === null && opening(nextMark)) {
            addCharset()
            currentMark = nextMark
            closingMark = closing(nextMark)

        // charset before closing tag
        } else if (char === closingMark) {
            addCharset(getProp())
            currentMark = null
            closingMark = ''

        // charset from non-mark chars
        } else {
            charset += char
        }
    }

    addCharset()
    return results
}

export default markdown
