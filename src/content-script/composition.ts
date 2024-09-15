import {spliceString, accessStorage, insensitiveStringSearch} from '../helpers';
import {initialStorageValues} from '../storage';
import type {MethodTransformation} from '../methods';

export async function composeMethod(
  method: MethodTransformation
): Promise<MethodTransformation> {
  const storage = accessStorage(initialStorageValues);
  const data = await storage.getValues();
  const ignoreList = parseCommaList(data.ignoreList);
  const correctList = parseCommaList(data.correctList);

  return (input: string) => {
    let output = method(input);

    for (const ignoreValue of ignoreList) {
      const inputResults = insensitiveStringSearch(input, ignoreValue);
      const outputResults = insensitiveStringSearch(output, ignoreValue);

      for (let i = 0; i < outputResults.length; i++) {
        output = spliceString(
          output,
          inputResults[i].match,
          outputResults[i].startIndex,
          outputResults[i].endIndex
        );
      }
    }

    for (const correctValue of correctList) {
      for (const result of insensitiveStringSearch(output, correctValue)) {
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

export function parseCommaList(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed.split(/\s*\,\s*/) : [];
}
