const isFalsy = value => value == null || value === ''
const isTruthy = value => !isFalsy(value)

export {
    isFalsy,
    isTruthy
}
