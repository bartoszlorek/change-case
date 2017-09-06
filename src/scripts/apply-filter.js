import { isArray } from 'lodash';
import findAll from './utils/find-all';
import spliceString from './utils/splice-string'

function applyFilter(method, string, ignore) {
    let outString = method(string);
    if (!isArray(ignore) || !ignore.length) {
        return outString;
    }
    let outIgnore = ignore.map(element => method(element)),
        outMatches = findAll(outString, outIgnore),
        srcMatches = findAll(string, ignore),
        offset = 0;

    outMatches.forEach((element, i) => {
        let start = element.index + offset,
            count = element.match.length,
            replace = srcMatches[i].match;

        outString = spliceString(outString, start, count, replace);
        offset += replace.length - count;
    });

    return outString;
}

export default applyFilter;
