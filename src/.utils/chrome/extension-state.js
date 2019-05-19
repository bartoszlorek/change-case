import getStorageData from './get-storage-data';

const EXTENSION_STATE_PORT = 'EXTENSION_STATE_PORT';

export const STATE = {
  DEFAULT: 'default',
  INSTALL: 'install',
  UPDATE: 'update'
};

const createState = (defaultState = null) => {
  let state = defaultState;

  return {
    get: () => state,
    set: newState => {
      if (Object.values(STATE).includes(newState)) {
        state = newState;
      }
    }
  };
};

export const initializeState = (reducers = {}) => {
  const state = createState(STATE.DEFAULT);

  // set state according to installation reason and show options
  chrome.runtime.onInstalled.addListener(({reason}) => {
    getStorageData(reducers).then(data => {
      if (data[reason] === true) {
        chrome.runtime.openOptionsPage();
        state.set(reason);
      }
    });
  });

  // set state to the default after closing options
  chrome.runtime.onConnect.addListener(port => {
    if (port.name === EXTENSION_STATE_PORT) {
      port.postMessage({state: state.get()});
      port.onDisconnect.addListener(() => {
        state.set(STATE.DEFAULT);
      });
    }
  });
};

export const connectToState = callback => {
  const port = chrome.runtime.connect({name: EXTENSION_STATE_PORT});
  port.onMessage.addListener(data => callback(data.state));
};
