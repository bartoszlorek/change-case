'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isobject = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

function isObjectObject(o) {
  return isobject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

var isPlainObject = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};

function makeArrayEach(func) {
    return function (iteratee, array, parent) {
        var length = array.length,
            index = -1;

        while (++index < length) {
            if (func(iteratee, array[index], index, parent) === false) {
                return false;
            }
        }
    };
}

function makeObjectEach(func) {
    return function (iteratee, object, parent) {
        var props = Object.keys(object),
            length = props.length,
            index = -1;

        while (length--) {
            var key = props[++index];
            if (func(iteratee, object[key], key, parent) === false) {
                return false;
            }
        }
    };
}

var arrayEach = makeArrayEach(baseEach);
var objectEach = makeObjectEach(baseEach);

function baseEach(iteratee, value, key, parent) {
    if (Array.isArray(value)) {
        return arrayEach(iteratee, value, key);
    }
    if (isPlainObject(value)) {
        return objectEach(iteratee, value, key);
    }
    return iteratee(value, key, parent);
}

function deepEach(value, iteratee) {
    if (value == null) {
        return null;
    }
    if (iteratee == null) {
        return value;
    }
    baseEach(iteratee, value);
    return value;
}

function makeArrayMap(func) {
    return function (iteratee, array, parent) {
        var length = array.length,
            index = -1,
            result = [];

        while (++index < length) {
            result[index] = func(iteratee, array[index], index, parent);
        }
        return result;
    };
}

function makeObjectMap(func) {
    return function (iteratee, object, parent) {
        var props = Object.keys(object),
            length = props.length,
            index = -1,
            result = {};

        while (length--) {
            var key = props[++index];
            result[key] = func(iteratee, object[key], key, parent);
        }
        return result;
    };
}

var arrayMap = makeArrayMap(baseMap);
var objectMap = makeObjectMap(baseMap);

function baseMap(iteratee, value, key, parent) {
    if (Array.isArray(value)) {
        return arrayMap(iteratee, value, key);
    }
    if (isPlainObject(value)) {
        return objectMap(iteratee, value, key);
    }
    return iteratee(value, key, parent);
}

function deepMap(value, iteratee) {
    if (value == null) {
        return null;
    }
    if (iteratee == null) {
        return value;
    }
    return baseMap(iteratee, value);
}

function makeArrayFilter(func) {
    return function (predicate, array, parent) {
        var length = array.length,
            index = -1,
            resIndex = 0,
            result = [];

        while (++index < length) {
            var value = func(predicate, array[index], index, parent);
            if (value !== undefined) {
                result[resIndex++] = value;
            }
        }
        if (resIndex > 0 || parent === undefined) {
            return result;
        }
    };
}

function makeObjectFilter(func) {
    return function (predicate, object, parent) {
        var props = Object.keys(object),
            length = props.length,
            index = -1,
            resLength = 0,
            result = {};

        while (length--) {
            var key = props[++index],
                value = func(predicate, object[key], key, parent);
            if (value !== undefined) {
                result[key] = value;
                resLength += 1;
            }
        }
        if (resLength > 0 || parent === undefined) {
            return result;
        }
    };
}

var arrayFilter = makeArrayFilter(baseFilter);
var objectFilter = makeObjectFilter(baseFilter);

function baseFilter(predicate, value, key, parent) {
    if (Array.isArray(value)) {
        return arrayFilter(predicate, value, key);
    }
    if (isPlainObject(value)) {
        return objectFilter(predicate, value, key);
    }
    if (predicate(value, key, parent)) {
        return value;
    }
}

function deepFilter(value, predicate) {
    if (value == null) {
        return null;
    }
    if (predicate == null) {
        return value;
    }
    var result = baseFilter(predicate, value);
    return result !== undefined ? result : null;
}

exports.deepEach = deepEach;
exports.deepMap = deepMap;
exports.deepFilter = deepFilter;
