type SearchResult = {
  match: string;
  startIndex: number;
  endIndex: number;
};

const WHITESPACE = /\s/;
const SEPARATORS = /[\s\-\_\.]/;

export function stringSearch(source: string, target: string): SearchResult[] {
  if (!source || !target) {
    return [];
  }
  if (WHITESPACE.test(source)) {
    return wordSearch(source, target);
  } else {
    return fuzzySearch(source, target);
  }
}

function wordSearch(source: string, target: string): SearchResult[] {
  const results = [];
  const normSource = source.toLocaleLowerCase();
  const normTarget = target.toLocaleLowerCase();

  const regex = new RegExp(`\\b${normTarget}\\b`, 'g');
  for (const match of normSource.matchAll(regex)) {
    const startIndex = match.index;
    const endIndex = match.index + match[0].length;

    results.push({
      match: source.slice(startIndex, endIndex),
      startIndex,
      endIndex,
    });
  }

  return results;
}

function fuzzySearch(source: string, target: string): SearchResult[] {
  const results = [];
  const normSource = normalizeString(source);
  const normTarget = normalizeString(target);

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

function normalizeString(value: string) {
  const chars = [...value.toLocaleLowerCase()];
  const offsets: number[] = [];
  let text = '';
  let offset = 0;

  for (let char of chars) {
    if (SEPARATORS.test(char)) {
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
