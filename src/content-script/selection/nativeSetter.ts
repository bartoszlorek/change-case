/**
 * https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-change-or-input-event-in-react-js/46012210
 */
export function setProperty<T extends Node>(
  node: T,
  property: keyof T,
  value: string
) {
  let prototype = node;

  while (prototype) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, property);
    if (descriptor?.set) {
      return descriptor.set.call(node, value);
    }

    prototype = Object.getPrototypeOf(prototype);
  }
}
