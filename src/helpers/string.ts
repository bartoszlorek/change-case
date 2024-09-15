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
  patterns: string[],
  ignores = /[\s\-\_\.]/
): {
  match: string;
  pattern: string;
  startIndex: number;
  endIndex: number;
}[] {
  const matches = [];
  const normSource = normalizeString(source, ignores);

  for (const pattern of patterns) {
    const normPattern = normalizeString(pattern, ignores);

    let i = -1;
    while ((i = normSource.text.indexOf(normPattern.text, i + 1)) !== -1) {
      const j = i + normPattern.text.length;
      const startIndex = i - normSource.offsets[i];
      const endIndex = j - normSource.offsets[j - 1];

      matches.push({
        match: source.slice(startIndex, endIndex),
        pattern,
        startIndex,
        endIndex,
      });
    }
  }

  return matches;
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
