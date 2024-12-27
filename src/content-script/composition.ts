import {
  spliceString,
  accessStorage,
  stringSearch,
  parseCommaList,
} from '../helpers';
import {initialStorageValues} from '../storage';
import type {MethodType} from '../methods/types';

export async function composeMethod(method: MethodType): Promise<MethodType> {
  const storage = accessStorage(initialStorageValues);
  const data = await storage.getValues();
  const ignoreList = parseCommaList(data.ignoreList);
  const correctList = parseCommaList(data.correctList);

  return (input: string) => {
    let output = method(input);

    for (const ignoreValue of ignoreList) {
      const inputResults = stringSearch(input, ignoreValue);
      const outputResults = stringSearch(output, ignoreValue);

      // TODO: fix inconsistency in matching input and output
      if (inputResults.length === outputResults.length) {
        for (let i = 0; i < outputResults.length; i++) {
          output = spliceString(
            output,
            inputResults[i].match,
            outputResults[i].startIndex,
            outputResults[i].endIndex
          );
        }
      }
    }

    for (const correctValue of correctList) {
      for (const result of stringSearch(output, correctValue)) {
        output = spliceString(
          output,
          correctValue,
          result.startIndex,
          result.endIndex
        );
      }
    }

    return output;
  };
}
