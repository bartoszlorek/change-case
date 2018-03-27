import indicesOf from './indices-of'

function findAll(string, search) {
    if (!string || !(search && search.length)) {
        return []
    }
    if (typeof search === 'string') {
        search = [search]
    }
    let tmpString = string.toLowerCase(),
        matches = []

    search.forEach(value => {
        value = value.toLowerCase()
        indicesOf(tmpString, value).forEach(index => {
            matches.push({
                match: string.slice(index, index + value.length),
                index: index
            })
        })
    })

    if (matches.length) {
        matches.sort((a, b) => a.index - b.index)
    }
    return matches
}

export default findAll
