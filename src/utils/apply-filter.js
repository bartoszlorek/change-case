import { isArray } from 'lodash';
import findAll from './find-all';
import spliceString from './splice-string'

function applyFilter(method, string, ignore) {
    let newString = method(string);
    if (!isArray(ignore) || !ignore.length) {
        return newString;
    }
    let newIgnore = ignore.map(element => method(element)),
        newMatches = findAll(newString, newIgnore),
        oldMatches = findAll(string, ignore);

    newMatches.forEach((element, i) => {
        let { match, index } = element;
        newString = spliceString(
            newString,
            index,
            match.length,
            oldMatches[i].match
        );
    });
    return newString;
}

export default applyFilter;
