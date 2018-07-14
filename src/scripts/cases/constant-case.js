import upperCase from './upper-case'
import snakeCase from './snake-case'

function constantCase(string) {
    return upperCase(snakeCase(string))
}

export default constantCase
