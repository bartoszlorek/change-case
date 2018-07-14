import upperCase from '../upper-case'

function upperCaseFirst(string) {
    string = String(string)
    return upperCase(string.charAt(0)) + string.substr(1)
}

export default upperCaseFirst
