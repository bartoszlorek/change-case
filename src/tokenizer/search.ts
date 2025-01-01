import type {Token} from './token';

interface SearchResult {
  index: number;
  tokens: Token[];
}

/**
 * Returns source tokens found by fuzzy matching
 * of target tokens, preserving the order of them.
 */
export function searchTokens(source: Token[], target: Token[]) {
  if (!source.length || !target.length) {
    return [];
  }

  const results: SearchResult[] = [];

  let j = -1;
  while ((j = fuzzyFindIndex(source, target[0], j + 1)) !== -1) {
    // matches the remaining target tokens
    // starting from the second one
    let k = 1;
    for (; k < target.length; k++) {
      if (!target[k].isFuzzyEqual(source[j + k])) {
        break;
      }
    }

    // didn't get to the end
    if (k < target.length) {
      continue;
    }

    const tokens: Token[] = [];

    k = 0;
    for (; k < target.length; k++) {
      tokens.push(source[j + k]);
    }

    results.push({
      index: tokens[0].index,
      tokens,
    });
  }

  return results;
}

export function fuzzyFindIndex(
  array: Token[],
  token: Token,
  startIndex: number = 0
) {
  for (let i = startIndex; i < array.length; i++) {
    if (array[i].isFuzzyEqual(token)) {
      return i;
    }
  }
  return -1;
}
