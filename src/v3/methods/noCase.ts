import { createDefinition } from "./types";

export const noCaseDef = createDefinition({
  name: "noCase",
  text: "no case",
});

export function noCase(value: string) {
  return value;
}
