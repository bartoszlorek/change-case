import { createDefinition } from "./types";

export const sentenceCaseDef = createDefinition({
  name: "sentenceCase",
  text: "Sentence case",
});

export function sentenceCase(value: string) {
  return value;
}
