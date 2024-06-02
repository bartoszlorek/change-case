import { pipe } from "ramda";
import { spliceString, findAllWords } from "../helpers";
import type { MethodTransformation } from "../methods";

export function buildOperators(
  method: MethodTransformation
): Promise<(value: string) => string> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(null, (data) => {
      resolve(
        pipe(
          createTextNode,
          applyMethod(method),
          applyIgnoreList(data.ignoreList),
          applyCorrectList(data.correctList),
          outputTextNode
        )
      );
    });
  });
}

interface TextNodeType {
  source: string;
  target: string;
}

function createTextNode(value: string): TextNodeType {
  return {
    source: value,
    target: value,
  };
}

function outputTextNode(node: TextNodeType) {
  return node.target;
}

function applyMethod(method: MethodTransformation) {
  return (node: TextNodeType): TextNodeType => ({
    source: node.source,
    target: method(node.source),
  });
}

export function applyIgnoreList(ignoreList?: string) {
  const data = parseCommaList(ignoreList || "");

  return (node: TextNodeType) => {
    if (!data.length) {
      return node;
    }

    let target = node.target;
    for (const { index, match } of findAllWords(node.source, data)) {
      target = spliceString(target, match, index, index + match.length);
    }

    return {
      source: node.source,
      target,
    };
  };
}

export function applyCorrectList(correctList?: string) {
  const data = parseCommaList(correctList || "");

  return (node: TextNodeType) => {
    if (!data.length) {
      return node;
    }

    let target = node.target;
    for (const { index, match, value } of findAllWords(node.target, data)) {
      target = spliceString(target, value, index, index + match.length);
    }

    return {
      source: node.source,
      target,
    };
  };
}

export function parseCommaList(value: string) {
  return value.trim().split(/\s*\,\s*/);
}
