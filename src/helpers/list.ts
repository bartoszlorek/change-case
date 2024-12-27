/**
 * Returns a comma-separated list of unique values.
 */
export function parseCommaList(value: string) {
  const trimmed = value.trim();
  if (trimmed) {
    return Array.from(new Set(trimmed.split(/\s*\,\s*/)));
  }
  return [];
}
