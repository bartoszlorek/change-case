import { isArray } from 'lodash'
import findAll from '../.utils/find-all'
import spliceString from '../.utils/splice-string'

const validList = list => {
    if (isArray(list)) {
        return list
    }
    if (typeof list === 'string' && list.trim() !== '') {
        return list.split(/\s*\,\s*/)
    }
    return null
}

function applyBlacklist(method, value, list) {
    let outValue = method(value)
    list = validList(list)

    if (list === null) {
        return outValue
    }
    let srcMatches = findAll(value, list)
    if (srcMatches.length === 0) {
        return outValue
    }
    let outList = list.map(element => method(element)),
        outMatches = findAll(outValue, outList),
        offset = 0

    outMatches.forEach((element, i) => {
        let start = element.index + offset,
            count = element.match.length,
            replace = srcMatches[i].match

        outValue = spliceString(outValue, start, start + count, replace)
        offset += replace.length - count
    })

    return outValue
}

export default applyBlacklist
