import {accessStorage, parseCommaList} from '../helpers';
import {initialStorageValues} from '../storage';
import {tokenizer, renderTokens, searchTokens, Token} from '../tokenizer';
import type {MethodHandler} from '../methods/types';

export async function composeMethod(handler: MethodHandler) {
  const storage = accessStorage(initialStorageValues);
  const {correctList, ignoreList} = await storage.getValues();
  const correctTokensList = parseCommaList(correctList).map(tokenizer);
  const ignoreTokensList = parseCommaList(ignoreList).map(tokenizer);

  return (input: string) => {
    const inputTokens = tokenizer(input);

    const correctIndices = new Map<number, Token>();
    for (const correctTokens of correctTokensList) {
      for (const match of searchTokens(inputTokens, correctTokens)) {
        for (let i = 0; i < match.tokens.length; i++) {
          correctIndices.set(match.tokens[i].index, correctTokens[i]);
        }
      }
    }

    const ignoreIndices = new Set<number>();
    for (const ignoreTokens of ignoreTokensList) {
      for (const match of searchTokens(inputTokens, ignoreTokens)) {
        for (const token of match.tokens) {
          ignoreIndices.add(token.index);
        }
      }
    }

    return renderTokens(inputTokens, handler, token => {
      if (correctIndices.has(token.index)) {
        return correctIndices.get(token.index)!.toText();
      }

      if (ignoreIndices.has(token.index)) {
        return token.toText();
      }

      return true;
    });
  };
}
