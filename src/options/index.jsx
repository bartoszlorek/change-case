import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { isPlainObject, isEqual } from 'lodash'

import message from '../.utils/chrome/message'
import { bind } from '../.utils/react/react-utils'
import { getStateOnce } from '../.utils/chrome/extension-state'
import { deepFilter } from '../.utils/deep.min'

import { isTruthy } from './types'
import messages from './messages'
import confirm from './confirm'

import Section from './components/Section'
import Ribbon from './components/Ribbon'
import Button, { PrimaryButton } from './components/Button'
import Input from './components/Input'
import Textarea from './components/Textarea'
import Console, { log } from './components/Console'
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
    overflow: auto;
    flex-shrink: 1;
`

const Controls = styled.div`
    padding: 14px 17px;
    background: #fff;
    border-top: 1px solid #dddfe2;
    display: flex;
    flex-shrink: 0;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0px -3px 1px 0px rgba(50, 60, 70, 0.04);

    & > button {
        margin: 0 0 0 6px;
        flex-shrink: 0;
    }
`

class Options extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updated: true,
            extState: null,
            savedData: {},
            data: {},
            logs: null
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
                updated: true,
                savedData: data,
                data
            })
        })
    }

    handleLogs(text, type) {
        this.setState({
            logs: log(text, type)
        })
    }

    handleData(name) {
        return value => {
            this.setState(({ savedData, data }) => {
                let nextData = deepFilter(
                    Object.assign({}, data, {
                        [name]: addValue(data[name], value)
                    }),
                    isTruthy
                )
                return {
                    data: nextData,
                    updated: isEqual(savedData, nextData)
                }
            })
        }
    }

    handelSave() {
        if (this.state.updated) {
            return false
        }
        let { sync } = chrome.storage
        sync.clear()
        sync.set(this.state.data, () => {
            this.handleLogs('options saved')
            this.setState({
                savedData: this.state.data,
                updated: true
            })
            message.toTab.all({
                type: 'BIND_SHORTCUTS'
            })
        })
    }

    handleReject() {
        confirm('Do you want to discard unsaved changes?').then(() => {
            this.setState(({ savedData }) => ({
                data: savedData,
                updated: true
            }))
        })
    }

    render() {
        let { updated, extState, data, logs } = this.state
        return (
            <div className={this.props.className}>
                <Sections>
                    <Notifications
                        values={messages}
                        state={extState}
                    />
                    <Section
                        title="Blacklist"
                        description="comma-separated list of case-insensitive words to ignore during conversion, &quot;e.g. Hello World, New York, John, ...&quot;"
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
                        value={logs}
                        timeout={LOG_TIMEOUT}
                        handler={this.handleLogs}
                    />
                    <Button
                        value="Reject"
                        hidden={updated}
                        onClick={this.handleReject}
                    />
                    <PrimaryButton
                        value="Save"
                        disabled={updated}
                        onClick={this.handelSave}
                    />
                </Controls>
                <Ribbon active={!updated} />
            </div>
        )
    }
}

export default styled(Options)`
    display: flex;
    flex-direction: column;
    max-height: 600px;
`

injectGlobal`
    body {
        margin: 0;
        background: #f6f7f9;
    }
`
