import { createDefinition } from "./types";

export const lowerCaseDef = createDefinition({
  name: "lowerCase",
  text: "lowercase",
});

export function lowerCase(value: string) {
  return value;
}
