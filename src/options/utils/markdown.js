function markdown(string = '', marks) {
    if (marks == null) {
        return [{
            mark: null,
            text: string
        }]
    }
    let offset = 0,
        count = 0,
        regex = new RegExp(marks
            .map(a => '\\' + a)
            .join('|')
        );
    return string
        .split(regex)
        .map(text => {
            let index = offset - 1,
                mark = null;

            if (index > -1) {
                if (count % 2 === 0) {
                    mark = string[index];
                }
                count += 1;
            }
            offset += text.length + 1;

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
