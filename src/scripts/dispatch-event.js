function dispatchEvent(element) {
    if (element.nodeType !== 1) {
        element = element.parentElement;
    }
    let params = { 'bubbles': true },
        events = ['input'];
    for (let i = 0; i < events.length; i++) {
        element.dispatchEvent(
            new Event(events[i], params));
    }
}

export default dispatchEvent;


// if ("createEvent" in document) {
//     var evt = document.createEvent("HTMLEvents");
//     evt.initEvent("change", false, true);
//     element.dispatchEvent(evt);
// }
// else
//     element.fireEvent("onchange");
