const get = (obj, path) => {
    return path.split('.').reduce((acc, x) => acc && acc[x], obj)
}

export function bind(context, methods) {
    methods.forEach(item => {
        context[item] = context[item].bind(context)
    })
}

// returns one case by props value
export function choose(valuePath, cases) {
    return props => cases[String(get(props, valuePath))]
}

// returns new props object without values
export function omit(props, values) {
    if (props == null) {
        return null
    }
    if (values == null || !values.length) {
        return props
    }
    let newProps = {}
    Object.keys(props).forEach(prop => {
        if (values.indexOf(prop) < 0) {
            newProps[prop] = props[prop]
        }
    })
    return newProps
}
