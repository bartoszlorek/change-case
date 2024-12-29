import {tokenizer} from './tokenizer';
import type {Token} from './token';

interface SearchResult {
  match: string;
  startIndex: number;
  endIndex: number;
}

export function stringSearch(
  source: string,
  target: string,
  fromIndex: number = 0
): SearchResult[] {
  if (!source || !target) {
    return [];
  }
  const results: SearchResult[] = [];
  const sourceTokens = normalize(tokenizer(source.slice(fromIndex)));
  const targetTokens = normalize(tokenizer(target));

  let j = -1;
  while ((j = findIndex(sourceTokens, targetTokens[0], j + 1)) !== -1) {
    // matches the remaining pattern tokens
    // starting from the second one
    let k = 1;
    for (; k < targetTokens.length; k++) {
      if (sourceTokens[j + k].value !== targetTokens[k].value) {
        break;
      }
    }

    // didn't get to the end
    if (k < targetTokens.length) {
      continue;
    }

    const startIndex = sourceTokens[j].index + fromIndex;
    const endToken = sourceTokens[j + k - 1];
    const endIndex = endToken.index + endToken.value.length + fromIndex;

    results.push({
      match: source.slice(startIndex, endIndex),
      startIndex,
      endIndex,
    });
  }

  return results;
}

function findIndex(array: Token[], token: Token, startIndex: number = 0) {
  for (let i = startIndex; i < array.length; i++) {
    if (token.value === array[i].value) {
      return i;
    }
  }
  return -1;
}

function normalize(tokens: Token[]): Token[] {
  for (const token of tokens) {
    token.value = token.value.toLocaleLowerCase();
  }
  return tokens;
}
