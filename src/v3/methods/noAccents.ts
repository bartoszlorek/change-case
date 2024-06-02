import { createDefinition } from "./types";

export const noAccentsDef = createDefinition({
  name: "noAccents",
  text: "no accents",
});

export function noAccents(value: string) {
  return value;
}
