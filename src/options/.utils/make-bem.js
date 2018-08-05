'use strict';

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

// based on classnames by Jed Watson
// http://jedwatson.github.io/classnames

function classValue(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    if (type === 'string' || type === 'number') {
        return value;
    }
    return !!value;
}

function baseClassNames(props) {
    var index = -1;
    var length = props == null ? 0 : props.length;
    var result = {};

    while (++index < length) {
        var prop = props[index];
        if (!prop) {
            continue;
        }

        var type = typeof prop === 'undefined' ? 'undefined' : _typeof(prop);
        if (type === 'string' || type === 'number') {
            result[prop] = true;
        } else if (type === 'object' && !Array.isArray(prop)) {
            for (var key in prop) {
                if (Object.hasOwnProperty.call(prop, key)) {
                    result[key] = classValue(prop[key]);
                }
            }
        }
    }

    return result;
}

function joinClassNames(classes, filter) {
    if (classes == null) {
        return '';
    }
    var withFilter = typeof filter === 'function';
    var props = Object.keys(classes);
    var length = props.length;

    var index = -1,
        result = '';

    while (++index < length) {
        var prop = props[index],
            value = classes[prop];

        if (value) {
            result += ' ' + (withFilter ? filter(prop, value) : prop);
        }
    }

    return result;
}

function makeSelector(spec) {
    return function (block, element, modifier, value) {
        var result = '';

        if (block) {
            result += block;
        }
        if (element) {
            result += spec.element + element;
        }
        if (modifier) {
            result += spec.modifier + modifier;
            if (value && value !== true) {
                result += spec.value + value;
            }
        }
        if (result && spec.prefix) {
            result = spec.prefix + result;
        }

        return result;
    };
}

// the default naming scheme is Two Dashes style

var defaults$1 = {
    prefix: '',
    element: '__',
    modifier: '--',
    value: '--'
};

function makeBem(style, options) {
    var spec = objectAssign({}, defaults$1, options);
    var getSelector = makeSelector(spec);

    var constructor = function constructor(block, element, modifiers, extras) {
        var _block = block || '',
            _element = element || '',
            _modifiers = {},
            _extras = {};

        var getEntity = function getEntity(modifier, value) {
            var selector = getSelector(_block, _element, modifier, value);
            return style != null ? style[selector] || selector : selector;
        };

        var self = {
            elem: function elem(name, modifiers, extras) {
                return constructor(_block, name, modifiers, extras);
            },
            mod: function mod() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                _modifiers = objectAssign({}, _modifiers, baseClassNames(args));
                return self;
            },
            extra: function extra() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                _extras = objectAssign({}, _extras, baseClassNames(args));
                return self;
            },
            toString: function toString() {
                return getEntity() + joinClassNames(_modifiers, getEntity) + joinClassNames(_extras);
            }
        };

        if (modifiers != null) {
            self.mod(modifiers);
        }
        if (extras != null) {
            self.extra(extras);
        }
        return self;
    };

    return constructor;
}

module.exports = makeBem;
