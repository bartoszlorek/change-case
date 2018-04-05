import React from 'react'
import styled, { injectGlobal  } from 'styled-components'
import { isPlainObject, isEqual } from 'lodash'
import { sendToContent } from '../.utils/chrome/message'
import { bind } from '../.utils/react/react-utils'
import { isTruthy } from '../.utils/type-conversion'
import { deepFilter } from '../.utils/deep.min'

import confirm from './confirm'

import Section from './components/Section'
import Ribbon from './components/Ribbon'
import Button, { PrimaryButton } from './components/Button'
import Input from './components/Input'
import Textarea from './components/Textarea'
import Message from './components/Message'
import Shortcuts from './components/shortcuts'

const MESSAGE_TIMEOUT = 3000

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
    return isPlainObject(value)
        ? Object.assign({}, data, value)
        : value
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
        let message = null
        if (text != null) {
            message = {
                type,
                text
            }
            clearTimeout(this.messageTimer)
            this.messageTimer = setTimeout(() => {
                this.handleMessage(null)
            }, MESSAGE_TIMEOUT)
        }
        this.setState({ message })
        return type !== 'error'
    }

    handleData(name) {
        return value => this.setState(({ savedData, data }) => {
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
            this.setState(({ savedData }) => ({
                data: savedData,
                upToDate: true
            }))
        })
    }

    render() {
        let { data, upToDate, message } = this.state
        return (
            <div className={this.props.className}>
                <Sections>
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
                        description='Click below to assign keys. Tip: do not use shortcuts that collide with browser combinations.'>
                        <Shortcuts
                            items={shortcutsItems}
                            value={data['shortcuts']}
                            onChange={this.handleData('shortcuts')}
                            onMessage={this.handleMessage}
                        />
                    </Section>
                </Sections>
                <Controls>
                    <Message data={message} />
                    <Button
                        value="Reject"
                        hidden={upToDate}
                        onClick={this.handleReject}
                    />
                    <PrimaryButton
                        value="Save"
                        disabled={upToDate}
                        onClick={this.handelSave}
                    />
                </Controls>
                <Ribbon active={!upToDate} />
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
