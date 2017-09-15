import isTextNode from './utils/is-text-node';
import getAttributes from './utils/get-attributes';
import URL from 'url-parse';

const include = ['id', 'class', 'name', 'type'];
const message = 'An error occurred. Publish the following informations on the extension page.';

function commonElement(range) {
    let element = range.commonAncestorContainer;
    return isTextNode(element)
        ? element.parentElement
        : element;
}

function currentUrl() {
    let { origin, href } = new URL(window.location.href);
    return origin !== 'null' ? origin : href;
}

function dispatchError(range) {
    let element = commonElement(range),
        issue = '';

    if (element != null) {
        issue = [].concat(
            element.tagName.toLowerCase(),
            getAttributes(element, include).map(
                attr => `${attr.name}="${attr.value}"`
            )
        );
        issue = `<${issue.join(' ')}>`;
    }

    prompt(message, issue + currentUrl());
}

export default dispatchError;