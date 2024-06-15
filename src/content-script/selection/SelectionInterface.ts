export interface SelectionInterface {
  editable: boolean;
  collapsed: boolean;

  textContent(iterate: (value: string, node: Node) => string): void;
  select(): void;
}
