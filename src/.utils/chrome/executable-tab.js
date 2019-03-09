// It checks if given tab is allowed for scripting,
// without breaking extension through errors.

const VOID = {code: 'void(0)'};
const CORRECT = 'correct';

const getHostname = url => {
  if (url == null) {
    return null;
  }
  let parser = document.createElement('a');
  parser.href = url;
  return parser.hostname;
};

function exec(tab, memo) {
  let tabId = tab == null || typeof tab.id !== 'number' ? -1 : tab.id;
  if (tabId < 0) {
    return Promise.reject('Incorrect tab');
  }

  let prop = getHostname(tab.url) || tabId;
  if (memo != null) {
    let memoized = memo[prop];
    if (memoized !== undefined) {
      return memoized === CORRECT
        ? Promise.resolve(tabId)
        : Promise.reject(memoized);
    }
  }
  const memoize = value => {
    if (memo != null) {
      memo[prop] = value || CORRECT;
    }
  };

  return new Promise((resolve, reject) =>
    chrome.tabs.executeScript(tabId, VOID, () => {
      let error = chrome.runtime.lastError;
      if (error != null) {
        memoize(error.message);
        reject(error.message);
      } else {
        memoize();
        resolve(tabId);
      }
    })
  );
}

function executableTab(memo = {}) {
  return tab => exec(tab, memo);
}

export default executableTab;
export {exec};
