import React from 'react'
import { isPlainObject, isEqual } from 'lodash'
import { sendToContent } from '../.utils/chrome/message'
import { bind } from '../.utils/react/react-utils'
import { isTruthy } from '../.utils/type-conversion'
import { deepFilter } from '../.utils/deep.min'

import bem from './bem'
import confirm from './functions/confirm'

import Section from './components/Section'
import Ribbon from './components/Ribbon'
import Button, { PrimaryButton } from './components/Button'
import Input from './components/Input'
import Textarea from './components/Textarea'
import Message from './components/Message'
import Shortcuts from './components/shortcuts'

const shortcutsItems = [
    { name: 'upperCase', label: 'UPPERCASE' },
    { name: 'lowerCase', label: 'lowercase' },
    { name: 'titleCase', label: 'Title Case' },
    { name: 'sentenceCase', label: 'Sentence case' },
    { name: 'camelCase', label: 'camelCase' },
    { name: 'pascalCase', label: 'PascalCase' },
    { name: 'constantCase', label: 'CONSTANT_CASE' },
    { name: 'paramCase', label: 'param-case' },
    { name: 'snakeCase', label: 'snake_case' },
    { name: 'dotCase', label: 'dot.case' },
    { name: 'toggleCase', label: 'tOGGLE cASE' },
    { name: 'noAccents', label: 'no accents' },
    { name: 'noCase', label: 'no case' }
]

const addValue = (data, value) => isPlainObject(value)
    ? Object.assign({}, data, value) : value

class Options extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: null,
            upToDate: true,
            savedData: {},
            data: {}
        }
        bind(this, [
            'handelSave',
            'handleMessage',
            'handleData',
            'handleReject'
        ])
    }

    componentDidMount() {
        chrome.storage.sync.get(null, data => {
            this.setState({
                upToDate: true,
                savedData: data,
                data
            })
        })
    }

    handelSave() {
        if (this.state.upToDate) {
            return false
        }
        let { sync } = chrome.storage
        sync.clear()
        sync.set(this.state.data, () => {
            this.handleMessage('options saved')
            this.setState({
                upToDate: true,
                savedData: this.state.data
            })
            sendToContent({
                type: 'BIND_SHORTCUTS',
                id: -1
            })
        })
    }

    handleMessage(text = null, type = 'info') {
        let message = text && { type, text }
        if (message != null) {
            clearTimeout(this.messageTimer)
            this.messageTimer = setTimeout(() => {
                this.handleMessage(null)
            }, 3000)
        }
        this.setState({ message })
    }

    handleData(name) {
        return value => this.setState(prevState => {
            let { savedData, data } = prevState
            let nextData = deepFilter(
                Object.assign({}, data, {
                    [name]: addValue(
                        data[name],
                        value
                    )
                }),
                isTruthy
            )
            return {
                data: nextData,
                upToDate: isEqual(
                    savedData,
                    nextData
                )
            }
        })
    }

    handleReject() {
        confirm('Do you want to discard unsaved changes?').then(() => {
            this.setState(prevState => ({
                data: prevState.savedData,
                upToDate: true
            }))
        })
    }

    render() {
        let { data, upToDate, message } = this.state
        return (
            <div className={bem('app')}>
                <Section
                    title='Blacklist'
                    description='comma-separated list of case-insensitive words to ignore during conversion, "e.g. Hello World, New York, John, ..."'>
                    <Textarea
                        value={data['blacklist']}
                        onChange={this.handleData('blacklist')}>
                    </Textarea>
                </Section>
                <Section
                    title='Keyboard Shortcuts'
                    description='press *Delete* to remove assignment. Tip: do not use shortcuts that collide with browser combinations.'>
                    <Shortcuts
                        items={shortcutsItems}
                        value={data['shortcuts']}
                        onChange={this.handleData('shortcuts')}
                        onMessage={this.handleMessage}
                    />
                </Section>
                <div className={bem('controls')}>
                    <Message data={message} />
                    <Button
                        hidden={upToDate}
                        onClick={this.handleReject}>
                        Reject
                    </Button>
                    <PrimaryButton
                        disabled={upToDate}
                        onClick={this.handelSave}>
                        Save
                    </PrimaryButton>
                </div>
                <Ribbon active={!upToDate} />
            </div>
        )
    }
}

export default Options
