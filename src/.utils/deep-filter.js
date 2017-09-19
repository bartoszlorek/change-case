import { isArray, isPlainObject, forEach } from 'lodash';

// The base function that returns `undefined` is omitted in outer
// recursive context. Inner elements behave similarly.
// baseFilter (outer) => baseMethod => baseFilter (inner) => ...

function baseArray(context, array, predicate) {
    let result = [],
        index = 0;
    forEach(array, value => {
        let next = context(value, predicate);
        if (next !== undefined) {
            result[index++] = next;
        }
    })
    if (index > 0) {
        return result;
    }
}

function baseObject(context, object, predicate) {
    let result = {},
        length = 0;
    forEach(object, (value, key) => {
        let next = context(value, predicate);
        if (next !== undefined) {
            result[key] = next;
            length += 1;
        }
    })
    if (length > 0) {
        return result;
    }
}

function baseFilter(data, predicate, parent) {
    if (isArray(data)) {
        return baseArray(baseFilter, data, predicate) || parent && [];
    }
    if (isPlainObject(data)) {
        return baseObject(baseFilter, data, predicate) || parent && {};
    }
    if (predicate(data)) {
        return data;
    }
}

function deepFilter(data, predicate) {
    if (predicate == null) {
        return data;
    }
    let result = baseFilter(data, predicate, true);
    return result !== undefined ? result : null;
}

export default deepFilter;
