import { createDefinition } from "./types";

export const constantCaseDef = createDefinition({
  name: "constantCase",
  text: "CONSTANT_CASE",
});

export function constantCase(value: string) {
  return value;
}
