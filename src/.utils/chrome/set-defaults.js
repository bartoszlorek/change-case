import { forEach } from 'lodash';

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

export default setDefaults;