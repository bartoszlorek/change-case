function applyMethod(method) {
    return state => {
        state.result = method(state.source)
        state.method = method
        return state
    }
}

export default applyMethod
