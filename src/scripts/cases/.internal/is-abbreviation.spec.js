import isAbbreviation from './is-abbreviation';

describe('isAbbreviation()', () => {
  it.each`
    input             | output
    ${undefined}      | ${false}
    ${null}           | ${false}
    ${''}             | ${false}
    ${'I am A.B.'}    | ${true}
    ${'e.g.'}         | ${true}
    ${'and now A.D.'} | ${true}
    ${'alt.'}         | ${true}
    ${'hello Sgt.'}   | ${true}
    ${'ok'}           | ${false}
    ${'doggy.'}       | ${false}
    ${'Mom?'}         | ${false}
    ${'there.'}       | ${false}
  `('"$input" —— $output', ({input, output}) => {
    expect(isAbbreviation(input)).toBe(output);
  });
});
