import {
    INSTALL_STATE,
    UPDATE_STATE,
    NORMAL_STATE
} from '../.utils/chrome/extension-state'

const messages = [
    {
        state: INSTALL_STATE,
        value: 'Thank you. This extension is free, but if you want to support development of this or my other projects, [buy me a beer](https://www.google.com)'
    },
    {
        state: UPDATE_STATE,
        value: 'The extension has been successfully updated!'
    }
]

export default messages
