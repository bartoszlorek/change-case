import { compose } from 'lodash'
import parseCommaList from './.internal/parse-comma-list'
import createState from './.internal/create-state'

import applyCorrectList from './apply-correct-list'
import applyIgnoreList from './apply-ignore-list'
import applyMethod from '../operators/apply-method'

const outputResult = state => state.result

const operators = method => new Promise(resolve => {
    chrome.storage.sync.get(null, data => resolve(
        compose(
            outputResult,
            applyCorrectList(parseCommaList(data.correctList)),
            applyIgnoreList(parseCommaList(data.ignoreList)),
            applyMethod(method),
            createState()
        )
    ))
})

export default operators
