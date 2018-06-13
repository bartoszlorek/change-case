import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { isPlainObject, isEqual } from 'lodash'

import message from '../.utils/chrome/message'
import { bind, createMemo } from '../.utils/react/react-utils'
import { getStateOnce } from '../.utils/chrome/extension-state'
import { deepFilter } from '../.utils/deep.min'

import { isTruthy } from './types'
import messages from './messages'
import confirm from './confirm'

import Section from './components/Section'
import Ribbon from './components/Ribbon'
import Button, { PrimaryButton } from './components/Button'
import Textarea from './components/Textarea'
import Checkbox from './components/Checkbox'
import Console, { createLogger } from './components/Console'
import Shortcuts from './components/Shortcuts'
import Notifications from './components/Notifications'

const LOG_TIMEOUT = 3000

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

const addValue = (data, value) => {
    if (isPlainObject(value)) {
        return Object.assign({}, data, value)
    }
    return value
}

const Sections = styled.div`
    position: relative;
    margin-bottom: 60px;
`

const Controls = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    padding: 14px 17px;
    background: #fff;
    border-top: 1px solid #dddfe2;
    box-shadow: 0px -3px 1px 0px rgba(50, 60, 70, 0.04);

    & > button {
        margin: 0 0 0 6px;
        flex-shrink: 0;
    }
`

class Options extends React.Component {
    constructor(props) {
        super(props)

        this.memo = createMemo()
        this.state = {
            extState: null,
            isUpdated: true,
            savedData: {},
            data: {},
            logger: null
        }
        bind(this, [
            'handleLogs',
            'handleData',
            'handelSave',
            'handleReject'
        ])
        getStateOnce(extState => {
            this.setState({
                extState
            })
        })
    }

    componentDidMount() {
        chrome.storage.sync.get(null, data => {
            this.setState({
                isUpdated: true,
                savedData: data,
                data
            })
        })
    }

    handleLogs(text, type) {
        this.setState({
            logger: createLogger(text, type)
        })
    }

    handleData(name) {
        return this.memo(name, value => {
            this.setState(({ savedData, data }) => {
                let nextData = deepFilter(
                    Object.assign({}, data, {
                        [name]: addValue(data[name], value)
                    }),
                    isTruthy
                )
                return {
                    isUpdated: isEqual(savedData, nextData),
                    data: nextData
                }
            })
        })
    }

    handelSave() {
        if (this.state.isUpdated) {
            return false
        }
        let { sync } = chrome.storage
        sync.clear()
        sync.set(this.state.data, () => {
            this.handleLogs('options saved')
            this.setState({
                isUpdated: true,
                savedData: this.state.data
            })
            message.toTab.all({
                type: 'BIND_SHORTCUTS'
            })
        })
    }

    handleReject() {
        confirm('Do you want to discard unsaved changes?').then(() => {
            this.setState(({ savedData }) => ({
                isUpdated: true,
                data: savedData
            }))
        })
    }

    render() {
        let { extState, isUpdated, data, logger } = this.state
        return (
            <div className={this.props.className}>
                <Sections>
                    <Notifications
                        items={messages}
                        state={extState}
                    />
                    <Section>
                        <Checkbox
                            value={data['updateNotification']}
                            label="Show update notifications"
                            onChange={this.handleData('updateNotification')}
                        />
                    </Section>
                    <Section
                        title="Blacklist"
                        description='comma-separated list of case-insensitive words to ignore during conversion, "e.g. Hello World, New York, John, ..."'
                    >
                        <Textarea
                            value={data['blacklist']}
                            onChange={this.handleData('blacklist')}
                        />
                    </Section>
                    <Section
                        title="Keyboard Shortcuts"
                        description="Click below, then hold the chosen combination to assign keys. Tip: do not use shortcuts that collide with browser's defaults."
                    >
                        <Shortcuts
                            items={shortcutsItems}
                            value={data['shortcuts']}
                            onChange={this.handleData('shortcuts')}
                            onLog={this.handleLogs}
                        />
                    </Section>
                </Sections>
                <Controls>
                    <Console
                        logger={logger}
                        timeout={LOG_TIMEOUT}
                        handler={this.handleLogs}
                    />
                    <Button
                        value="Reject"
                        hidden={isUpdated}
                        onClick={this.handleReject}
                    />
                    <PrimaryButton
                        value="Save"
                        disabled={isUpdated}
                        onClick={this.handelSave}
                    />
                </Controls>
                <Ribbon active={!isUpdated} />
            </div>
        )
    }
}

export default Options

injectGlobal`
    body {
        margin: 0;
        background: #f6f7f9;
    }
`
