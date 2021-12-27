// @flow strict

import * as R from "ramda";
import { wordTokenizer } from "./wordTokenizer";

const mapValues = R.map(R.prop("value"));

describe("wordTokenizer()", () => {
  it("tokenizes words", () => {
    expect(mapValues(wordTokenizer("Hello World."))).toEqual([
      "Hello",
      " ",
      "World",
      ".",
    ]);
  });

  it("tokenizes multiple whitespace", () => {
    expect(mapValues(wordTokenizer("Hello   World."))).toEqual([
      "Hello",
      "   ",
      "World",
      ".",
    ]);
  });

  it("tokenizes multiple not a word characters", () => {
    expect(mapValues(wordTokenizer("Hello %%World%%"))).toEqual([
      "Hello",
      " ",
      "%",
      "%",
      "World",
      "%",
      "%",
    ]);
  });

  it("tokenizes punctuation characters", () => {
    expect(
      mapValues(wordTokenizer("Lord* of-the (Rings): Far Away!?"))
    ).toEqual([
      "Lord",
      "*",
      " ",
      "of",
      "-",
      "the",
      " ",
      "(",
      "Rings",
      ")",
      ":",
      " ",
      "Far",
      " ",
      "Away",
      "!",
      "?",
    ]);
  });

  it("tokenizes latin extended characters", () => {
    expect(
      mapValues(wordTokenizer("Duża śliwka aus dem grünen Obstgarten"))
    ).toEqual([
      "Duża",
      " ",
      "śliwka",
      " ",
      "aus",
      " ",
      "dem",
      " ",
      "grünen",
      " ",
      "Obstgarten",
    ]);
  });

  it("tokenizes numeric characters", () => {
    expect(mapValues(wordTokenizer("she is 30 years old"))).toEqual([
      "she",
      " ",
      "is",
      " ",
      "30",
      " ",
      "years",
      " ",
      "old",
    ]);
  });

  it("tokenizes numeric characters followed by latin", () => {
    expect(mapValues(wordTokenizer("he weighs 70kg"))).toEqual([
      "he",
      " ",
      "weighs",
      " ",
      "70kg",
    ]);
  });

  it("tokenizes numeric characters with dot or comma inside", () => {
    expect(mapValues(wordTokenizer("to be exactly 6,620.6 km"))).toEqual([
      "to",
      " ",
      "be",
      " ",
      "exactly",
      " ",
      "6,620.6",
      " ",
      "km",
    ]);
  });
});
