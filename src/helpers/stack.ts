export class Stack<T> extends Array {
  constructor(initialValues?: T[]) {
    super();

    if (initialValues) {
      this.push(...initialValues);
    }
  }

  current(): T | undefined {
    return this[this.length - 1];
  }

  isCurrent(value: T) {
    return this.current() === value;
  }

  setCurrent(value: T) {
    this[Math.max(0, this.length - 1)] = value;
  }
}
