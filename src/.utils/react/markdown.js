function markdown(string, marks) {
    string = string == null ? '' : string
    marks = marks == null ? [] : marks

    if (!string || !marks.length) {
        return [{
            mark: null,
            text: string
        }]
    }
    const regex = new RegExp(marks
        .map(a => '\\' + a)
        .join('|'))

    let offset = 0

    return string
        .split(regex)
        .map((text, index) => {
            let mark = null

            if (index % 2 !== 0) {
                mark = string[offset - 1]
            }
            offset += text.length + 1

            if (text !== '') {
                return {
                    mark,
                    text
                }
            }
        })
        .filter(a => a);
}

export default markdown;
