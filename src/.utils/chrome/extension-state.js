import getStorageData from './get-storage-data';

const EXTENSION_STATE_PORT = 'EXTENSION_STATE_PORT';

export const STATE = {
  INSTALL: 'install',
  UPDATE: 'update',
  NORMAL: 'normal'
};

const createState = (states, defaultState = null) => {
  let state = defaultState;

  return {
    get: () => state,
    set: newState => {
      if (Object.values(states).includes(newState)) {
        state = newState;
      }
    }
  };
};

export const initializeState = (reducers = {}) => {
  const state = createState(STATE, STATE.NORMAL);

  // set state according to runtime and open options
  chrome.runtime.onInstalled.addListener(({reason}) => {
    getStorageData(reducers).then(data => {
      if (data[reason] === true) {
        chrome.runtime.openOptionsPage();
        state.set(reason);
      }
    });
  });

  // set state to normal after closing options
  chrome.runtime.onConnect.addListener(port => {
    if (port.name === EXTENSION_STATE_PORT) {
      port.postMessage({state: state.get()});
      port.onDisconnect.addListener(() => {
        state.set(STATE.NORMAL);
      });
    }
  });
};

export const connectToState = callback => {
  const port = chrome.runtime.connect({name: EXTENSION_STATE_PORT});
  port.onMessage.addListener(data => callback(data.state));
};
