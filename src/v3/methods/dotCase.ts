import { createDefinition } from "./types";

export const dotCaseDef = createDefinition({
  name: "dotCase",
  text: "dot.case",
});

export function dotCase(value: string) {
  return value;
}
