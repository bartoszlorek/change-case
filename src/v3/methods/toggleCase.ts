import { createDefinition } from "./types";

export const toggleCaseDef = createDefinition({
  name: "toggleCase",
  text: "tOGGLE cASE",
});

export function toggleCase(value: string) {
  return value;
}
