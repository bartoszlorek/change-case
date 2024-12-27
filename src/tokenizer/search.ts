import type {Token} from './token';
import type {TokenizerType} from './tokenizer';

interface SearchResult {
  pattern: string;
  matched: string;
  startIndex: number;
  endIndex: number;
}

export function stringSearch(
  source: string,
  patterns: string[],
  tokenize: TokenizerType
): SearchResult[] {
  if (!source.length || !patterns.length) {
    return [];
  }

  const sourceTokens = tokenize(source);
  const results: SearchResult[] = [];

  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i];
    const patternTokens = tokenize(pattern);

    if (!patternTokens.length) {
      continue;
    }

    let j = -1;
    while ((j = findIndex(sourceTokens, patternTokens[0], j + 1)) !== -1) {
      // matches the remaining pattern tokens
      // starting from the second one
      let k = 1;
      for (; k < patternTokens.length; k++) {
        if (sourceTokens[j + k].value !== patternTokens[k].value) {
          break;
        }
      }

      // didn't get to the end
      if (k < patternTokens.length) {
        continue;
      }

      const startIndex = sourceTokens[j].index;
      const endToken = sourceTokens[j + k - 1];
      const endIndex = endToken.index + endToken.value.length;

      results.push({
        pattern,
        matched: source.slice(startIndex, endIndex),
        startIndex,
        endIndex,
      });
    }
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
