import { compose } from 'lodash'

import parseCommaList from '../parse-comma-list'
import applyCorrectList from './apply-correct-list'
import applyIgnoreList from './apply-ignore-list'

const operators = method => new Promise(resolve => {
    chrome.storage.sync.get(null, data => {
        const applyOperators = compose(
            applyCorrectList(method, parseCommaList(data.correctList)),
            applyIgnoreList(method, parseCommaList(data.ignoreList))
        )
        return resolve(applyOperators)
    })
})

export default operators
