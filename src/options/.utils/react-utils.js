import { get, isPlainObject } from 'lodash'

export function choose(path, cases) {
    if (isPlainObject(cases)) {
        return object => {
            let value = get(object, path)
            return cases[String(value)]
        }
    }
    return object => {
        let value = get(object, path)
        return value && cases
    }
}

export function bind(context, methods) {
    let index = methods != null ? methods.length : 0

    while (index) {
        let name = methods[--index]
        context[name] = context[name].bind(context)
    }
}

export function omit(props, keys) {
    if (keys == null) {
        return props
    }
    let index = -1
    const iterable = Object.keys(props)
    const length = iterable.length
    const result = {}

    while (++index < length) {
        let prop = iterable[index]
        if (keys.indexOf(prop) < 0) {
            result[prop] = props[prop]
        }
    }
    return result
}

export function createMemo(memo = {}) {
    return (name, callback, force) => {
        if (memo[name] === undefined || force) {
            memo[name] = callback
        }
        return memo[name]
    }
}
