import React from 'react';
import { isPlainObject, isEqual } from 'lodash';
import { bind } from './utils/react-utils';
import style from './style.css';

import Wrap from './components/wrap';
import Ribbon from './components/ribbon';
import Button from './components/button';
import Input from './components/input';
import Textarea from './components/textarea';
import Message from './components/message';
import Shortcuts from './components/shortcuts';

import { sendToContent } from '../scripts/utils/chrome-utils';

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
    { name: 'noCase', label: 'no case' }
];

const addValue = (data, value) => {
    if (isPlainObject(value)) {
        return Object.assign({}, data, value);
    }
    return value;
}

class Options extends React.Component {
    constructor(props) {
        super(props);
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
        ]);
    }

    componentDidMount() {
        chrome.storage.sync.get(null, data => {
            this.setState({
                upToDate: true,
                savedData: data,
                data
            });
        });
    }

    handelSave() {
        chrome.storage.sync.set(this.state.data, () => {
            this.handleMessage('options saved');
            this.setState({
                upToDate: true,
                savedData: this.state.data
            });
            sendToContent({
                type: 'BIND_SHORTCUTS',
                id: -1
            });
        })
    }

    handleMessage(text = null, type = 'info') {
        let message = text && { type, text };
        if (message != null) {
            clearTimeout(this.messageTimer);
            this.messageTimer = setTimeout(() => {
                this.handleMessage(null);
            }, 3000);
        }
        this.setState({ message });
    }

    handleData(name) {
        return value => this.setState(prevState => {
            let { savedData, data } = prevState;
            let nextData = Object.assign({}, data, {
                [name]: addValue(
                    data[name],
                    value
                )
            });
            return {
                data: nextData,
                upToDate: isEqual(
                    savedData,
                    nextData
                )
            }
        });
    }

    handleReject() {
        this.setState(prevState => ({
            data: prevState.savedData,
            upToDate: true
        }))
    }

    render() {
        let { data, upToDate, message } = this.state;
        return (
            <div className={style.app}>
                <Wrap
                    title='Blacklist'
                    description='comma-separated list of case-insensitive words to ignore during conversion, "e.g. Hello World, New York, John, ..."'>
                    <Textarea
                        value={data['blacklist']}
                        onChange={this.handleData('blacklist')}>
                    </Textarea>
                </Wrap>
                <Wrap
                    title='Keyboard Shortcuts'
                    description='press *Delete* to remove assignment. Tip: do not use shortcuts that collide with browser combinations.'>
                    <Shortcuts
                        items={shortcutsItems}
                        value={data['shortcuts']}
                        onChange={this.handleData('shortcuts')}
                        onMessage={this.handleMessage}
                    />
                </Wrap>
                <div className={style.controls}>
                    <Message data={message} />
                    <Button
                        label='Reject'
                        visible={!upToDate}
                        onClick={this.handleReject}
                    />
                    <Button
                        label='Save'
                        onClick={this.handelSave}
                    />
                </div>
                <Ribbon active={!upToDate} />
            </div >
        )
    }
}

export default Options;