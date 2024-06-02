import { createDefinition } from "./types";

export const pascalCaseDef = createDefinition({
  name: "pascalCase",
  text: "PascalCase",
});

export function pascalCase(value: string) {
  return value;
}
