function getAttributes(element, include) {
    if (! (element && element.attributes)) {
        return [];
    }
    let attributes = Array.prototype.slice
        .call(element.attributes);

    if (include && include.length &&
        include.constructor === Array) {
        attributes = attributes.filter(attr =>
            include.indexOf(attr.name) > -1);
    }
    return attributes;
}

function activeElement(localDocument) {
    let element = (localDocument || document).activeElement,
        tagName = element.tagName.toLowerCase();
    if (tagName === 'iframe' || tagName === 'frame')
        return activeElement(element.contentDocument);
    return element;
}

export default function dispatchError() {
    let element = activeElement(),
        issue = '';

    if (element && element.tagName) {
        issue += element.tagName.toLowerCase() + ' ';
        issue += getAttributes(element, ['id', 'class', 'name', 'type'])
            .map(attr => `${attr.name}="${attr.value}"`)
            .join(' ');
        issue = '<'+ issue.trim() +'>';
    }
    prompt("An error occurred. Publish the following informations like current url and issue, on the extension page.",
        window.location.href + issue);
}