export function isEditableNode(node: Node) {
  return isElement<HTMLElement>(node)
    ? node.isContentEditable
    : node.parentElement?.isContentEditable === true;
}

export function isElement<T extends Element>(node: Node): node is T {
  return node.nodeType === Node.ELEMENT_NODE;
}

export function isTextNode(node: Node) {
  return node.nodeType === Node.TEXT_NODE;
}

export function isElementTagName<T extends Element>(
  elem: Element,
  tagName: string
): elem is T {
  return elem.tagName.toUpperCase() === tagName;
}

export function getNextNode(node: Node) {
  if (node.hasChildNodes()) {
    return node.firstChild;
  }

  if (node.nextSibling) {
    return node.nextSibling;
  }

  let parentNode = node.parentNode;
  while (parentNode) {
    if (parentNode.nextSibling) {
      return parentNode.nextSibling;
    }
    parentNode = parentNode.parentNode;
  }

  return null;
}

export function iframeDocument(iframe: HTMLIFrameElement | HTMLFrameElement) {
  return iframe.contentDocument || iframe.contentWindow?.document;
}

export function iframeWindow(iframe: HTMLIFrameElement | HTMLFrameElement) {
  return iframe.contentWindow || iframe.contentDocument?.defaultView || null;
}

export function nodeDocument(node: Node) {
  return node.ownerDocument || document;
}

export function nodeWindow(node: Node): Window | null {
  return nodeDocument(node).defaultView;
}
