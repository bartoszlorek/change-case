export const INSTALL_STATE = 'install'
export const UPDATE_STATE = 'update'
export const NORMAL_STATE = 'normal'

const OPEN_OPTIONS = 'EMIT_OPEN_OPTIONS'

function listenOptions() {
    let state = NORMAL_STATE

    chrome.runtime.onInstalled.addListener(({ reason }) => {
        if (reason === INSTALL_STATE || reason === UPDATE_STATE) {
            state = reason
            chrome.runtime.openOptionsPage()
        }
    })

    chrome.runtime.onMessage.addListener((request, sender, response) => {
        if (request.type === OPEN_OPTIONS) {
            response(state)
            state = NORMAL_STATE
        }
    })
}

function emitOptions(callback) {
    chrome.runtime.sendMessage({
        type: OPEN_OPTIONS
    }, callback)
}

export { 
    listenOptions,
    emitOptions
}
