export interface MethodDefinition {
  name: string;
  text: string;
}

export function createDefinition(def: MethodDefinition) {
  return def;
}

export type MethodTransformation = (input: string) => string;
