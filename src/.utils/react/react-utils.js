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
    methods.forEach(item => {
        context[item] = context[item].bind(context)
    })
}

export function omit(object, props) {
    if (object == null) {
        return null
    }
    if (props == null || !props.length) {
        return object
    }
    let newObject = {}
    Object.keys(object).forEach(prop => {
        if (props.indexOf(prop) < 0) {
            newObject[prop] = object[prop]
        }
    })
    return newObject
}
