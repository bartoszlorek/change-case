function setDefaults(values) {
    if (values == null) {
        return
    }
    chrome.runtime.onInstalled.addListener(event => {
        if (event.reason === 'install') {
            chrome.storage.sync.set(values)
        }
    })
}

export default setDefaults
