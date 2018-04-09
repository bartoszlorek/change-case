const openingTag = tag => tag && tag[0]
const closingTag = tag => tag && tag[tag.length-1]

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
    return prev !== next && prev !== null && next !== null
}

function markdown(string, markTags, propTag) {
    markTags = markTags == null ? [] : markTags

    let length = string == null ? 0 : string.length
    if (length === 0 || !markTags.length) {
        return [{
            mark: null,
            prop: null,
            text: string
        }]
    }

    let openingProp = openingTag(propTag),
        closingProp = closingTag(propTag)

    let results = [],
        current = null,
        closing = '',
        charset = '',
        index = 0

    const addCharset = prop => {
        if (charset !== '') {
            results.push({
                mark: current,
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
        let prop = '',
            char = ''

        index++ // skip opening tag
        while (index < length) {
            char = string[index++]
            if (char === closingProp) {
                return prop
            }
            prop += char
        }
        return null
    }

    while (index < length) {
        let char = string[index++],
            mark = getMark(char, markTags)

        if (isProperClosed(current, mark)) {
            throw `There is opening tag '${mark}' instead of closing '${current}' at index ${index - 1}.`
        }

        // charset before opening tag
        if (current === null && openingTag(mark)) {
            addCharset()
            current = mark
            closing = closingTag(mark)

        // charset before closing tag
        } else if (closing === char) {
            addCharset(getProp())
            current = null
            closing = ''

        // charset from non-mark chars
        } else {
            charset += char
        }
    }

    addCharset()
    return results
}

export default markdown
