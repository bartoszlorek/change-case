export function spliceString(
  value: string,
  replacement: string,
  start?: number,
  end?: number
) {
  return value.slice(0, start) + replacement + value.slice(end);
}

export function upperCaseFirst(value: string) {
  if (value.length > 0) {
    return value[0].toLocaleUpperCase() + value.slice(1).toLocaleLowerCase();
  }
  return '';
}

export function startsNumeric(value: string) {
  return /^[0-9]/.test(value);
}

export function insensitiveStringSearch(
  source: string,
  target: string,
  ignores = /[\s\-\_\.]/
): {
  match: string;
  startIndex: number;
  endIndex: number;
}[] {
  if (!source || !target) {
    return [];
  }
  const results = [];
  const normSource = normalizeString(source, ignores);
  const normTarget = normalizeString(target, ignores);

  let i = -1;
  while ((i = normSource.text.indexOf(normTarget.text, i + 1)) !== -1) {
    const j = i + normTarget.text.length;
    const startIndex = i - normSource.offsets[i];
    const endIndex = j - normSource.offsets[j - 1];

    results.push({
      match: source.slice(startIndex, endIndex),
      startIndex,
      endIndex,
    });
  }

  return results;
}

function normalizeString(value: string, ignores: RegExp) {
  const chars = [...value.toLocaleLowerCase()];
  const offsets: number[] = [];
  let text = '';
  let offset = 0;

  for (let char of chars) {
    if (ignores.test(char)) {
      offset -= 1;
      continue;
    }
    text += char;
    offsets.push(offset);
  }

  return {
    text,
    offsets,
  };
}
