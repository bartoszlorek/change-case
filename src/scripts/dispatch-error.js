import isTextNode from 'Utils/is-text-node';

const validUrl = url => url.split('?')[0];
const include = ['id', 'class', 'name', 'type'];
const message =
  'An error occurred. Publish the following informations on the extension page.';

function commonAncestor(range) {
  let element = range.commonAncestorContainer;
  return isTextNode(element) ? element.parentElement : element;
}

function getAttributes(element) {
  if (element == null) {
    return [];
  }
  return [].slice.call(element.attributes);
}

function dispatchError(range) {
  let element = commonAncestor(range),
    props = '';

  if (element != null) {
    let tagName = element.tagName.toLowerCase();
    props = getAttributes(element)
      .filter(attr => include.indexOf(attr.name) > -1)
      .map(attr => `${attr.name}="${attr.value}"`)
      .join(' ');

    if (props) {
      tagName += ' ';
    }
    props = `<${tagName + props}>`;
  }
  prompt(message, props + validUrl(window.location.href));
}

export default dispatchError;
