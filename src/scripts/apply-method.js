import CASE_METHODS from './cases'

function applyMethod(methodName, operators) {
    let method = CASE_METHODS[methodName]

    if (typeof method !== 'function') {
        return Promise.reject()
    }
    if (typeof operators === 'function') {
        method = operators(method)
    }
    return Promise.resolve(method)
}

export default applyMethod
