// make bem, not mess.
// block__element--modifier

import classNames from 'classnames';

function add(value) {
    return value ? ' ' + value : '';
}

function selector(block, element, modifier) {
    let result = block || '';
    if (element) {
        result += '__' + element;
    }
    if (modifier) {
        result += '--' + modifier;
    }
    return result;
}

function modifierNames(data) {
    let props = Object.keys(data),
        length = props.length,
        index = -1;

    const result = [];
    while (++index < length) {
        let prop = props[index],
            value = data[prop];
        if (value !== null) {
            if (value !== '') {
                prop += '-';
            }
            result.push(prop + value);
        }
    }
    return result;
}

function validModifier(value) {
    if (value === undefined) {
        return '';
    }
    let type = typeof value;
    if (type === 'string' ||
        type === 'number') {
        return value;
    }
    return null;
}

function makeBem(style) {
    if (style == null) {
        throw 'making bem, first argument should be style';
    }
    const construct = (blockName, elementName) => {
        let _block = blockName || '',
            _element = elementName || '',
            _modifiers = {},
            _extra = '';

        const self = {
            elem: (name) => {
                return construct(_block, name);
            },
            mod: (name, value) => {
                _modifiers[name] = validModifier(value);
                return self;
            },
            extra: (value) => {
                _extra = value;
                return self;
            },
            toString: () => {
                let result = style[selector(
                    _block,
                    _element
                )] || '';

                let modifier = modifierNames(_modifiers);
                if (modifier.length > 0) {
                    result += add(modifier.map(
                        name => style[selector(
                            _block,
                            _element,
                            name
                        )]
                    ).join(' '))
                }
                result += add(_extra);
                return result;
            }
        }
        return self;
    }
    return construct;
}

export default makeBem;