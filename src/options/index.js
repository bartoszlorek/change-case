import React from 'react'
import styled from 'styled-components'
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

const Controls = styled.div`
    position: fixed;
    bottom: 0; left: 0; right: 0;
    padding: 14px 17px;
    background: #fff;
    border-top: 1px solid #dddfe2;
    display: flex;
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
        let { className, data, upToDate, message } = this.state
        return (
            <div className={className}>
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
                <Controls>
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
                </Controls>
                <Ribbon active={!upToDate} />
            </div>
        )
    }
}

export default styled(Options)`
    padding-bottom: 59px;
`
