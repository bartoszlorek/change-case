import { forEach } from 'lodash'
import Mousetrap from 'mousetrap'

let instances = []

function indexOfInstance(body) {
    let index = -1
    forEach(instances, (instance, i) => {
        if (instance.target === body) {
            index = i
            return false
        }
    })
    return index
}

function getMousetrap(body) {
    let index = indexOfInstance(body)
    if (index !== -1) {
        return instances[index].reset()
    }
    let mousetrap = new Mousetrap(body)
    mousetrap.stopCallback = () => false
    instances.push(mousetrap)
    return mousetrap
}

function makeBindToLocal(shortcuts, callback) {
    return body => {
        let mousetrap = getMousetrap(body)
        forEach(shortcuts, (code, methodName) => {
            if (!code) {
                return
            }
            mousetrap.bind(code, e => {
                callback(methodName)
                return false
            })
        })
    }
}

function bindShortcuts(shortcuts, callback) {
    if (!shortcuts) {
        return
    }
    let bindToLocal = makeBindToLocal(
        shortcuts,
        callback
    )
    bindToLocal(document.body)

    // todo: bind to iframes active long after load
    forEach(document.querySelectorAll('iframe'), iframe => {
        bindToLocal(iframe.contentWindow.document.body)
    })
}

export default bindShortcuts
