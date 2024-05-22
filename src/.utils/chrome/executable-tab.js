const noop = function () {};

/**
 * It checks if given tab is allowed for scripting,
 * without breaking extension through errors.
 */
export function isExecutableTab(tab) {
  let tabId = tab == null || typeof tab.id !== 'number' ? -1 : tab.id;
  if (tabId < 0) {
    return Promise.reject('Incorrect tab');
  }

  return new Promise((resolve, reject) =>
    chrome.scripting
      .executeScript({
        target: {tabId},
        func: noop,
      })
      .catch(error => {
        reject(`${error}`);
      })
      .then(() => {
        let error = chrome.runtime.lastError;
        if (error != null) {
          reject(error.message);
        } else {
          resolve(tabId);
        }
      }),
  );
}
