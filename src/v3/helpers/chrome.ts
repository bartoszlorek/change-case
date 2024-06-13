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
