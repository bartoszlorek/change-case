import { isPlainObject, isArray, forEach } from 'lodash';

function sanitizeWith(data, comparator) {
    if (comparator == null) {
        return data;
    }
    if (isPlainObject(data)) {
        let object = {},
            length = 0;
        forEach(data, (value, key) => {
            let result = sanitizeWith(value, comparator);
            if (result !== undefined) {
                object[key] = result;
                length += 1;
            }
        })
        if (length > 0) {
            return object;
        }

    } else if (isArray(data)) {
        let array = [];
        forEach(data, value => {
            let result = sanitizeWith(value, comparator);
            if (result !== undefined) {
                array.push(result);
            }
        })
        if (array.length > 0) {
            return array;
        }

    } else if (comparator(data)) {
        return data;
    }
}

export default sanitizeWith;