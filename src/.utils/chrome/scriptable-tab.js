function scriptableTab() {
    const cache = {};
    return (tab) => {
        let tabId = tab == null ? -1 : tab.id;
        if (tabId < 0) {
            return Promise.reject('This tab cannot be scripted.');
        }
        let error = cache[tabId];
        if (error !== undefined) {
            return error === false
                ? Promise.resolve(tabId)
                : Promise.reject(error);
        }
        return new Promise((resolve, reject) => {
            chrome.tabs.executeScript(tabId, {
                code: 'void(0)'
            }, () => {
                let { lastError } = chrome.runtime;
                if (lastError) {
                    cache[tabId] = lastError.message;
                    reject(lastError.message);
                } else {
                    cache[tabId] = false;
                    resolve(tabId);
                }
            })
        })
    }
}

export default scriptableTab;