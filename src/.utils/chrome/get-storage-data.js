function getStorageData(props = {}) {
  return new Promise(resolve => {
    chrome.storage.sync.get(null, data => {
      const result = {};

      Object.keys(props).forEach(prop => {
        const value = props[prop];

        if (typeof value === 'function') {
          result[prop] = value(data);
        } else {
          result[prop] = data[value];
        }
      });

      resolve(result);
    });
  });
}

export default getStorageData;
