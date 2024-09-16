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
