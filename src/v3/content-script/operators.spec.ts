import { parseCommaList, applyIgnoreList, applyCorrectList } from "./operators";

describe("parseCommaList()", () => {
  it.each`
    input             | output
    ${""}             | ${[]}
    ${"  "}           | ${[]}
    ${"a,b,c"}        | ${["a", "b", "c"]}
    ${" a,b bb , c "} | ${["a", "b bb", "c"]}
  `('"$input" => $output', ({ input, output }) => {
    expect(parseCommaList(input)).toEqual(output);
  });
});

describe("applyIgnoreList()", () => {
  it.each`
    ignoreList     | source                       | target
    ${undefined}   | ${"lazy brown fox"}          | ${"LAZY BROWN FOX"}
    ${"Brown"}     | ${"lazy brown fox"}          | ${"LAZY brown FOX"}
    ${"Fox, LAZY"} | ${"Lazy fox eats lazy dog."} | ${"Lazy fox EATS lazy DOG."}
    ${"I, John"}   | ${"i am john in home."}      | ${"i AM john IN HOME."}
  `("$ignoreList: $source => $target", ({ ignoreList, source, target }) => {
    const textNode = { source, target };

    expect(applyIgnoreList(ignoreList)(textNode)).toEqual({
      source,
      target,
    });
  });
});

describe("applyCorrectList()", () => {
  it.each`
    correctList      | source                       | target
    ${null}          | ${"lazy brown fox"}          | ${"lazy brown fox"}
    ${"Brown"}       | ${"lazy brown fox"}          | ${"lazy Brown fox"}
    ${["Fox, LAZY"]} | ${"Lazy fox eats lazy dog."} | ${"LAZY Fox eats LAZY dog."}
    ${["I, John"]}   | ${"i am john in home."}      | ${"I am John in home."}
  `("$correctList: $source => $target", ({ correctList, source, target }) => {
    const textNode = { source, target };

    expect(applyCorrectList(correctList)(textNode)).toEqual({
      source,
      target,
    });
  });
});
