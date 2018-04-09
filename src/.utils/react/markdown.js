const openingTag = mark => mark !== null && mark[0]
const closingTag = mark => mark[mark.length-1]

const matchMark = (char, marks) => {
    let length = marks.length,
        mark

    while (mark = marks[--length]) {
        if (mark[0] === char) {
            return mark
        }
    }
    return null
}

function markdown(string, marks, propTag) {
    marks = marks == null ? [] : marks
    
    let length = string == null ? 0 : string.length
    if (length === 0 || !marks.length) {
        return [{
            mark: null,
            prop: null,
            text: string
        }]
    }

    let results = [],
        matched = null,
        closing = '',
        charset = '',
        index = 0

    const addCharset = prop => {
        if (charset !== '') {
            results.push({
                mark: matched,
                prop: prop || null,
                text: charset
            })
            charset = ''
        }
    }

    const getPropValue = () => {
        let prop = '',
            char = ''

        while (index < length) {
            char = string[index++]
            if (char === propTag[1]) {
                return prop
            }
            prop += char
        }
        return null
    }

    while (index < length) {
        let char = string[index++],
            mark = matchMark(char, marks)

        // if current char is matching with opening tag
        // of registered mark then add existing charset
        // to the result and save match with closing tag
        // for upcoming chars
        if (matched === null && openingTag(mark)) {
            addCharset()
            matched = mark
            closing = closingTag(mark)

        // if current char is matching with closing tag
        // of mark matched before then add existing
        // charset to the result
        } else if (closing === char) {

            // skip opening tag of optional property and get its value
            if (propTag && string[index] === propTag[0]) {
                index++
                addCharset(getPropValue())
            } else {
                addCharset()
            }
            matched = null

        // form charset from non-mark chars
        } else {
            charset += char
        }
    }

    addCharset()
    return results
}

export default markdown
