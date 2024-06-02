import { isElement } from "../../helpers";

export function dispatchChangeEvent(node: Node) {
  const element = isElement(node) ? node : node.parentElement;

  if (element) {
    const options = { bubbles: true, cancelable: false };
    element.dispatchEvent(new Event("change", options));
    element.dispatchEvent(new Event("input", options));
  }
}
