/**
 * https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
 */
export function asyncMessageHandler<
  Message extends {type: string},
  Response = void
>(
  type: Message['type'],
  callback: (
    message: Message,
    sender: chrome.runtime.MessageSender
  ) => Promise<Response>
) {
  return (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    if (message?.type === type) {
      callback(message, sender).then(sendResponse);
      return true; // allows for an async response
    }
  };
}

type StorageValue = number | string | boolean | null | StorageValue[];

export function accessStorage<T extends Record<string, StorageValue>>(
  initialValues: T
) {
  function setValues(data: Partial<T>) {
    return chrome.storage.sync.set(data);
  }

  function getValues(): Promise<T> {
    return chrome.storage.sync.get(initialValues).then(result => {
      const output = {} as T;
      for (const [key, value] of Object.entries(initialValues)) {
        output[key as keyof T] = result[key] ?? value;
      }
      return output;
    });
  }

  return {
    setValues,
    getValues,
  };
}
