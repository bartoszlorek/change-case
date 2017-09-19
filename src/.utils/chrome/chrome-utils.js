import { forEach } from 'lodash';

export {
    onMessage,
    sendMessage,
    sendToContent,
    createMenu,
    setDefaults,
    scriptableTab
}

const validType = type => {
    if (typeof type !== 'string') {
        throw 'message needs type';
    }
}

function onMessage(type, callback) {
    validType(type);
    chrome.runtime.onMessage.addListener(
        (request, sender, response) => {
            if (request.type !== type) return;
            callback(request.data, sender, response);
        }
    )
}

function sendMessage(spec) {
    if (!spec) {
        return;
    }
    let { type, data, callback } = spec;
    validType(type);

    chrome.runtime.sendMessage({
        type, data
    }, callback);
}

function sendToContent(spec) {
    if (!spec) {
        return;
    }
    let { id, type, data, callback } = spec;
    validType(type);

    let send = tabId => {
        chrome.tabs.sendMessage(
            tabId, {
                type,
                data
            }, callback
        )
    }

    if (typeof id === 'number') {
        if (id < 0) { // send to all tabs
            chrome.tabs.query({}, tabs => {
                forEach(tabs, tab => send(tab.id));
            });
        } else {
            send(id);
        }
    } else {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, tabs => {
            send(tabs[0].id);
        });
    }
}

function createMenu(items, callback, defaults) {
    forEach(items, item => {
        let params;

        if (item === null) {
            params = {
                type: 'separator'
            }
        } else {
            params = callback(item);
        }
        if (defaults) {
            params = Object.assign({},
                defaults,
                params
            );
        }
        chrome.contextMenus.create(params);
    })
}

function setDefaults(spec) {
    chrome.storage.sync.get(null, data => {
        let result = {},
            length = 0;

        forEach(spec, (value, name) => {
            if (!data.hasOwnProperty(name)) {
                result[name] = value;
                length += 1;
            }
        });

        if (length) {
            chrome.storage.sync.set(result);
        }
    })
}

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