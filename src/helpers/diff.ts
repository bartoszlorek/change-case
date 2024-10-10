export function stringIndexDiff(input: string, output: string) {
  const inputChars = [...input.toLocaleLowerCase()];
  const outputChars = [...output.toLocaleLowerCase()];
  const results: number[] = [];

  let searchOffset = 0;
  for (let i = 0; i < inputChars.length; i++) {
    const index = outputChars.indexOf(inputChars[i], searchOffset);

    if (index !== -1) {
      results.push(index - i);
      searchOffset = index + 1;
    } else {
      results.push(NaN);
    }
  }

  return results;
}
