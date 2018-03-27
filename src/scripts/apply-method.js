import CASE_METHODS from './cases'

function applyMethod(item, methodName, filter) {
    let method = CASE_METHODS[methodName]

    if (typeof method !== 'function' || item == null) {
        return Promise.reject()
    }
    if (typeof filter === 'function') {
        method = filter(method)
    }
    return Promise.resolve(method).then(resolved =>
        item.selectedText = resolved(item.selectedText)
    )
}

export default applyMethod
