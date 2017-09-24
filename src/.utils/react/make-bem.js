import classNames from 'classnames';

// make bem, not mess.
// block__element--modifier

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

function makeBem(style) {
    if (style == null) {
        throw 'making bem, first argument should be style';
    }
    return (block) => {
        let output = style[block] || '';

        const self = {
            class: (classes) => {
                output += add(classNames(classes));
                return self;
            },
            elem: (element, modifier) => {
                output += add(
                    style[selector(
                        block,
                        element,
                        modifier
                    )]
                )
                return self;
            },
            mod: (modifier) => {
                output += add(
                    style[selector(
                        block,
                        null,
                        modifier
                    )]
                )
                return self;
            },
            toString: () => output
        }
        return self;
    }
}

export default makeBem;