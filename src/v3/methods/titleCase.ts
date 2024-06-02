import { createDefinition } from "./types";

export const titleCaseDef = createDefinition({
  name: "titleCase",
  text: "Title Case",
});

export function titleCase(value: string) {
  return value;
}
