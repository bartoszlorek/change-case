import { createDefinition } from "./types";

export const snakeCaseDef = createDefinition({
  name: "snakeCase",
  text: "snake_case",
});

export function snakeCase(value: string) {
  return value;
}
