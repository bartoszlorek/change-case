import { spliceString } from "../../helpers";
import { SelectionInterface } from "./SelectionInterface";
import { dispatchChangeEvent } from "./nativeEvent";
import { setProperty } from "./nativeSetter";

export class SelectionElement<T extends HTMLInputElement | HTMLTextAreaElement>
  implements SelectionInterface
{
  container: T;
  startOffset: number;
  endOffset: number;
  editable: boolean;
  collapsed: boolean;

  constructor(container: T, startOffset: number, endOffset: number) {
    this.container = container;
    this.startOffset = startOffset;
    this.endOffset = endOffset;
    this.editable = container.disabled ? false : true;
    this.collapsed = startOffset === endOffset;
  }

  textContent(iterate: (value: string, node: Node) => string) {
    const currentValue = this.container.value;
    const currentValueSlice = currentValue.slice(
      this.startOffset,
      this.endOffset
    );

    const nextValueSlice = iterate(currentValueSlice, this.container);
    if (nextValueSlice !== currentValueSlice) {
      const nextValue = spliceString(
        currentValue,
        nextValueSlice,
        this.startOffset,
        this.endOffset
      );

      setProperty(this.container, "value", nextValue);
      dispatchChangeEvent(this.container);

      this.endOffset += nextValueSlice.length - currentValueSlice.length;
      this.select(); // reselect
    }
  }

  select() {
    this.container.setSelectionRange(this.startOffset, this.endOffset);
  }
}
