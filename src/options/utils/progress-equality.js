import { isPlainObject, isArray } from 'lodash';

// Progress means that the next has more properties than the prev.
// New properties (not existing in the previous object) with 'falsy'
// values are treated as equal.

const isFalsy = value => value == null || value === '';

function progressEquality(prev, next, key) {
    let prevFalsy = isFalsy(prev),
        nextFalsy = isFalsy(next);

    if (nextFalsy && prevFalsy) {
        return true;
    }
    if (nextFalsy !== prevFalsy) {
        return false;
    }
    if (isPlainObject(next)) {
        return testObject(prev, next);
    }
    if (isArray(next)) {
        return testArray(prev, next);
    }
    return prev === next;
}

function testObject(prev, next) {
    let keys = Object.keys(next),
        i = keys.length;

    while (i--) {
        let result = progressEquality(
            prev[keys[i]],
            next[keys[i]]
        )
        if (result !== undefined) {
            return result;
        }
    }
}

function testArray(prev, next) {
    if (prev.length > next.length) {
        return false;
    }
    let i = next.length;
    while (i--) {
        let result = progressEquality(
            prev[i],
            next[i]
        )
        if (result !== undefined) {
            return result;
        }
    }
}

export default progressEquality;