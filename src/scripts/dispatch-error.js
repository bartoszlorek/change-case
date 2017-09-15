import isTextNode from './utils/is-text-node';
import getAttributes from './utils/get-attributes';

const validUrl = url => url.split('?')[0];
const include = ['id', 'class', 'name', 'type'];
const message = 'An error occurred. Publish the following informations on the extension page.';

function commonElement(range) {
    let element = range.commonAncestorContainer;
    return isTextNode(element)
        ? element.parentElement
        : element;
}

function dispatchError(range) {
    let element = commonElement(range),
        props = '';

    if (element != null) {
        let tagName = element.tagName.toLowerCase();
        props = getAttributes(element, include)
            .map(attr => `${attr.name}="${attr.value}"`)
            .join(' ');

        if (props) {
            tagName += ' ';
        }
        props = `<${tagName + props}>`;
    }
    prompt(message, props + validUrl(
        window.location.href
    ));
}

export default dispatchError;