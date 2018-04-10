const isProperClosed = (prev, next) => {
    return !(prev !== next && prev && next)
}

const parseTag = tag => ({
    opening: tag && tag[0],
    closing: tag && tag[tag.length-1],
    value: tag
})

const matchMark = (char, marks) => {
    let length = marks.length,
        index = -1

    while (++index < length) {
        if (marks[index].opening === char) {
            return marks[index]
        }
    }
    return null
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

    const markData = markTags.map(parseTag)
    const propData = parseTag(propTag)

    let results = [],
        current = null,
        charset = '',
        char = '',
        index = -1

    const nextChar = () => {
        return char = string[++index]
    }

    const addCharset = prop => {
        if (charset !== '') {
            results.push({
                mark: current ? current.value : null,
                prop: prop || null,
                text: charset
            })
            charset = ''
        }
    }

    const getProp = () => {
        if (string[index + 1] !== propData.opening) {
            return null
        }
        let value = ''
        index++ // skip opening tag
        while (nextChar()) {
            if (char === propData.closing) {
                return value
            }
            value += char
        }
        return null
    }

    while (nextChar()) {
        let match = matchMark(char, markData)

        if (!isProperClosed(current, match)) {
            throw `There is opening tag '${match.opening}' instead of closing '${current.closing}' at index ${index}.`
        }

        // charset before opening tag
        if (current === null && match !== null) {
            addCharset()
            current = match

        // charset before closing tag (inside mark)
        } else if (current && current.closing === char) {
            addCharset(getProp())
            current = null

        // charset from other chars
        } else {
            charset += char
        }
    }

    addCharset()
    return results
}

export default markdown
