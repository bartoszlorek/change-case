const events = [
    'change',
    'input'
].map(
    event => new Event(event, {
        bubbles: true,
        cancelable: false
    })
)

function dispatchEvent(element) {
    if (element.nodeType !== 1) {
        element = element.parentElement
    }
    events.forEach(event => {
        element.dispatchEvent(event)
    })
}

export default dispatchEvent
