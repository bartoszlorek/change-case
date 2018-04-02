function isClassComponent(value) {
    return typeof value === 'function' &&
        !!value.prototype.isReactComponent
}

function isFunctionComponent(value) {
    return (
        typeof value === 'function' &&
        value.name[0] === value.name[0].toUpperCase() &&
        String(value).includes('.createElement(')
    )
}

function isReactComponent(value) {
    return isClassComponent(value) ||
        isFunctionComponent(value)
}

export default isReactComponent

export {
    isClassComponent,
    isFunctionComponent
}
