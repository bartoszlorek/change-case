import lowerCase from './lower-case'
import upperCase from './upper-case'

function toggleCase(string) {
    let length = string.length,
        result = ''

    for (let i = 0; i < length; i++) {
        let char = string[i],
            upper = upperCase(char)
        result += char === upper ? lowerCase(char) : upper
    }
    return result
}

export default toggleCase
