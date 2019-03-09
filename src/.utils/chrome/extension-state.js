import getStorageData from './get-storage-data';

export const INSTALL_STATE = 'install';
export const UPDATE_STATE = 'update';
export const NORMAL_STATE = 'normal';

const GET_STATE_ONCE = 'GET_STATE_ONCE';

function listenStates(options = {}) {
  let state = NORMAL_STATE;

  chrome.runtime.onInstalled.addListener(({reason}) => {
    getStorageData(options).then(storage => {
      if (storage[reason]) {
        state = reason;
        chrome.runtime.openOptionsPage();
      }
    });
  });

  chrome.runtime.onMessage.addListener((request, sender, response) => {
    if (request.type === GET_STATE_ONCE) {
      response(state);
      state = NORMAL_STATE;
    }
  });
}

// at this moment only once, because in persistent
// world something must change state back to normal
function getStateOnce(callback) {
  chrome.runtime.sendMessage(
    {
      type: GET_STATE_ONCE
    },
    callback
  );
}

export {listenStates, getStateOnce};
