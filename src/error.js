
function activeElement(localDocument) {
    let element = (localDocument || document).activeElement,
        tagName;

    if (! (element && element.tagName)) {
        return false;
    }
        tagName = element.tagName.toLowerCase();
    if (tagName === 'iframe' || tagName === 'frame') {
        return activeElement(element.contentDocument);
    }
    return element;
}

function getAttributes(element, include) {
    if (! (element && element.attributes)) {
        return [];
    }
    let attributes = Array.prototype.slice
        .call(element.attributes);
    
    if (include && include.length &&
        include.constructor === Array) {
        attributes = attributes.filter(
            attr => include.indexOf(attr.name) > -1);
    }
    return attributes;
}

export default function dispatchError() {
    let message = 'An error occurred. You can help fix it out.\n'
        + '---------------------------------------------------------------\n'
        + 'OK - send an email with informations\n'
        + 'CANCEL - just skip it, and have a nice day\n';

    if (window.confirm(message)) {
        let element = activeElement(),
            input = element && element.tagName + ' ',
            email;

        if (input !== false) {
            input += getAttributes(element, ['id', 'class', 'name', 'type'])
                .map(attr => `${attr.name}="${attr.value}"`)
                .join(' ');
        }
        email = 'mailto:bery.lorek@gmail.com?'
            + 'subject=' + encodeURIComponent('Change Case Error')
            + '&body=' + encodeURIComponent(
                'Where?\n' + window.location.href +
                '\n\nWhat?\n' + input);
        window.open(email);
    }
    return false;
}