import indicesOf from './indices-of'

function findAll(string = '', search = '', insensitive = false) {
    if (!string || !(search && search.length)) {
        return []
    }
    if (typeof search === 'string') {
        search = [search]
    }
    let buffer = insensitive ? string.toLowerCase() : string,
        result = []

    search.forEach(value => {
        if (insensitive) {
            value = value.toLowerCase()
        }
        indicesOf(buffer, value).forEach(index => {
            result.push({
                match: string.slice(index, index + value.length),
                index
            })
        })
    })

    if (result.length) {
        result.sort((a, b) => a.index - b.index)
    }
    return result
}

export default findAll
