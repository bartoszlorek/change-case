// make BEM methodology
// block__element--modifier

function parseEntities(string) {
    let a = string.split('--'),
        b = a[0].split('__');
    return {
        block: b[0],
        element: b[1] || '',
        modifier: a[1] || ''
    }
}

function getEntities(block, style) {
    let result = [];
    for (let selector in style) {
        let match = parseEntities(selector);
        if (match.block === block) {
            match.identifier = style[selector];
            result.push(match);
        }
    }
    return result;
}

function makeBem(block, style) {
    if (block == null) {
        return () => '';
    }
    const entities = getEntities(block, style);
    const length = entities.length;

    const func = (element, modifier) => {
        element = element || '';
        modifier = modifier || '';

        let index = -1;
        while (++index < length) {
            let entity = entities[index];
            if (entity.element === element &&
                entity.modifier === modifier) {
                return entity.identifier;
            }
        }
        return '';
    }
    func.elem = func;
    func.mod = modifier => func(null, modifier);
    return func;
}

export default makeBem;