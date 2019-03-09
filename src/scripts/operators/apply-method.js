function applyMethod(method) {
  return state => ({
    ...state,
    result: method(state.source),
    method
  });
}

export default applyMethod;
