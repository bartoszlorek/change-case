function getCurrentTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(
      {
        currentWindow: true,
        active: true
      },
      tabs => {
        if (tabs.length > 0) {
          resolve(tabs[0]);
        } else {
          reject();
        }
      }
    );
  });
}

export default getCurrentTab;
