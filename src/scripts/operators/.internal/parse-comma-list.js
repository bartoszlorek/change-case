function parseCommaList(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'string' && (value = value.trim())) {
    return value.split(/\s*\,\s*/);
  }
  return [];
}

export default parseCommaList;
