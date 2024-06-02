import { createDefinition } from "./types";

export const camelCaseDef = createDefinition({
  name: "camelCase",
  text: "camelCase",
});

export function camelCase(value: string) {
  return value;
}
