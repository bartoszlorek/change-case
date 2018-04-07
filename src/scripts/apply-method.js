// The filter wraps around method function
// const filter = method => value => {}

import CASE_METHODS from './cases'

function applyMethod(methodName, filter) {
    let method = CASE_METHODS[methodName]

    if (typeof method !== 'function') {
        return Promise.reject()
    }
    if (typeof filter === 'function') {
        method = filter(method)
    }
    return Promise.resolve(method)
}

export default applyMethod
