import { isArray, isPlainObject, forEach } from 'lodash';

// Base functions should return 'next' value or undefined
// to get omitted in outer recursive context. Elements
// behave similarly, however inside the inner context.

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

function filter(data, predicate, parent) {
    if (isArray(data)) {
        return baseArray(filter, data, predicate) || parent && [];
    }
    if (isPlainObject(data)) {
        return baseObject(filter, data, predicate) || parent && {};
    }
    if (predicate(data)) {
        return data;
    }
}

function deepFilter(data, predicate) {
    if (predicate == null) {
        return data;
    }
    let result = filter(data, predicate, true);
    return result !== undefined ? result : null;
}

export default deepFilter;