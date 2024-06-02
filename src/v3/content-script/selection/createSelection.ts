import { iframeDocument, iframeWindow, isElementTagName } from "../../helpers";
import { SelectionElement } from "./SelectionElement";
import { SelectionRange } from "./SelectionRange";

export function createSelection(
  win: Window = window,
  doc: Document = win.document
) {
  const elem = doc.activeElement;
  if (elem === null) {
    return null;
  }

  if (
    isElementTagName<HTMLTextAreaElement>(elem, "TEXTAREA") ||
    isElementTagName<HTMLInputElement>(elem, "INPUT")
  ) {
    return new SelectionElement(
      elem,
      elem.selectionStart || 0,
      elem.selectionEnd || 0
    );
  }

  if (
    isElementTagName<HTMLIFrameElement>(elem, "IFRAME") ||
    isElementTagName<HTMLFrameElement>(elem, "FRAME")
  ) {
    // the same-origin policy
    try {
      const win = iframeWindow(elem);
      const doc = iframeDocument(elem);

      if (!win || !doc) {
        throw "missing window or document";
      }
      return createSelection(win, doc);
    } catch {
      return null;
    }
  }

  const nativeSelection = win.getSelection();
  if (nativeSelection && nativeSelection.rangeCount > 0) {
    return new SelectionRange(nativeSelection.getRangeAt(0));
  }

  return null;
}
