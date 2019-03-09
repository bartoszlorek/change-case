const valid = {
  tabId: id => {
    if (typeof id !== 'number') {
      throw 'Tab requires `id` as a Number.';
    }
    return valid;
  },
  type: type => {
    if (typeof type !== 'string') {
      throw 'Message requires `type` as a String.';
    }
    return valid;
  }
};

const sendToBack = (spec, callback) => {
  valid.type(spec && spec.type);
  chrome.runtime.sendMessage(spec, callback);
};

const sendToTab = (id, spec, callback) => {
  valid.tabId(id).type(spec && spec.type);
  chrome.tabs.sendMessage(id, spec, callback);
};

sendToTab.all = (spec, callback) => {
  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => sendToTab(tab.id, spec, callback));
  });
};

sendToTab.current = (spec, callback) => {
  chrome.tabs.query(
    {
      currentWindow: true,
      active: true
    },
    tabs => {
      sendToTab(tabs[0].id, spec, callback);
    }
  );
};

const message = {
  on: (type, callback) => {
    valid.type(type);

    if (chrome.runtime.onMessage === undefined) {
      throw 'Cannot add listener to `chrome.runtime.onMessage`.';
    }
    chrome.runtime.onMessage.addListener((request, sender, response) => {
      if (request.type === type) {
        callback(request, sender, response);
      }
    });
  },
  toBack: sendToBack,
  toTab: sendToTab
};

export default message;
