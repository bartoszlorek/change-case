import {
  spliceString,
  isEditableNode,
  isTextNode,
  getNextNode,
  nodeDocument,
  nodeWindow,
} from "../../helpers";
import { SelectionInterface } from "./SelectionInterface";
import { dispatchChangeEvent } from "./nativeEvent";
import { setProperty } from "./nativeSetter";

interface RangeInit {
  startContainer: Node;
  startOffset: number;
  endContainer: Node;
  endOffset: number;
  commonAncestorContainer: Node;
  collapsed: boolean;
}

export class SelectionRange implements SelectionInterface {
  startContainer: Node;
  startOffset: number;
  endContainer: Node;
  endOffset: number;
  commonAncestorContainer: Node;
  editable: boolean;
  collapsed: boolean;

  constructor({
    startContainer,
    startOffset,
    endContainer,
    endOffset,
    commonAncestorContainer,
    collapsed,
  }: RangeInit) {
    this.startContainer = startContainer;
    this.startOffset = startOffset;
    this.endContainer = endContainer;
    this.endOffset = endOffset;
    this.commonAncestorContainer = commonAncestorContainer;
    this.collapsed = collapsed;

    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/contentEditable
     */
    this.editable = this.commonAncestorContainer
      ? isEditableNode(this.commonAncestorContainer)
      : false;
  }

  textContent(iterate: (value: string, node: Node) => string) {
    const textNodes: Node[] = [];
    let node: Node | null = this.startContainer;

    if (isTextNode(this.startContainer)) {
      textNodes.push(this.startContainer);
    }

    while (node && node !== this.endContainer) {
      node = getNextNode(node);
      if (node && isTextNode(node)) {
        textNodes.push(node);
      }
    }

    let hasTextContentChanged = false;
    for (let i = 0; i < textNodes.length; i++) {
      const startOffset = i > 0 ? 0 : this.startOffset;
      const endOffset = i === textNodes.length - 1 ? this.endOffset : Infinity;

      const node = textNodes[i];
      const currentValue = node.nodeValue || "";
      const currentValueSlice = currentValue.slice(startOffset, endOffset);

      const nextValueSlice = iterate(currentValueSlice, node);
      if (nextValueSlice !== currentValueSlice) {
        const nextValue = spliceString(
          currentValue,
          nextValueSlice,
          startOffset,
          endOffset
        );

        hasTextContentChanged = true;
        setProperty(node, "nodeValue", nextValue);
        dispatchChangeEvent(node);

        if (i === textNodes.length - 1) {
          this.endOffset += nextValueSlice.length - currentValueSlice.length;
        }
      }
    }

    if (hasTextContentChanged) {
      this.select(); // reselect
    }
  }

  select() {
    const selection = nodeWindow(this.startContainer)?.getSelection();
    const range = nodeDocument(this.startContainer).createRange();

    if (selection) {
      range.setStart(this.startContainer, this.startOffset);
      range.setEnd(this.endContainer, this.endOffset);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}
