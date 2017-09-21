function matchSelector(string) {
    let parts = string.split('--');
    parts[0] = parts[0].split('__');
    return {
        block: parts[0][0],
        element: parts[0][1] || '',
        modifier: parts[1] || ''
    }
}

function blockSelectors(name, style) {
    let length = name.length,
        result = [],
        match;

    for (let selector in style) {
        if (selector.substr(0, length) === name) {
            match = matchSelector(selector);
            match.hash = style[selector];
            result.push(match);
        }
    }
    return result;
}

function makeBem(blockName, style) {
    if (blockName == null) {
        return () => '';
    }
    let selectors = blockSelectors(
        blockName,
        style
    )
    return (element, modifier) => {
        element = element || '';
        modifier = modifier || '';
        let result = selectors.filter(a =>
            a.element === element &&
            a.modifier === modifier
        )
        return result.length ? result[0].hash : '';
    }
}

export default makeBem;