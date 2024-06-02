import { createDefinition } from "./types";

export const paramCaseDef = createDefinition({
  name: "paramCase",
  text: "param-case",
});

export function paramCase(value: string) {
  return value;
}
