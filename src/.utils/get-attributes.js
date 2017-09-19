function getAttributes(element, include) {
    if (element == null) {
        return [];
    }
    let attributes = Array.prototype.slice
        .call(element.attributes);

    if (include != null) {
        attributes = attributes.filter(
            attr => include.indexOf(attr.name) > -1
        )
    }
    return attributes;
}

export default getAttributes;