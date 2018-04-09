export const INSTALL_STATE = 'install'
export const UPDATE_STATE = 'update'
export const NORMAL_STATE = 'normal'

const GET_STATE_ONCE = 'GET_STATE_ONCE'

function listenStates() {
    let state = NORMAL_STATE

    chrome.runtime.onInstalled.addListener(({ reason }) => {
        if (reason === INSTALL_STATE || reason === UPDATE_STATE) {
            state = reason
            chrome.runtime.openOptionsPage()
        }
    })

    chrome.runtime.onMessage.addListener((request, sender, response) => {
        if (request.type === GET_STATE_ONCE) {
            response(state)
            state = NORMAL_STATE
        }
    })
}

// at this moment only once, because in persistent
// world something must change state back to normal
function getStateOnce(callback) {
    chrome.runtime.sendMessage({
        type: GET_STATE_ONCE
    }, callback)
}

export {
    listenStates,
    getStateOnce
}
