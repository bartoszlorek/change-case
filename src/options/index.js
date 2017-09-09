import React from 'react';
import { isPlainObject } from 'lodash';
import { bind } from './utils/react-utils';
import style from './style.css';

import Wrap from './components/wrap';
import Input from './components/input';
import Textarea from './components/textarea';
import Message from './components/message';
import Shortcuts from './components/shortcuts';

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

class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            data: {}
        }
        bind(this, [
            'handelSave',
            'handleMessage',
            'handleData'
        ]);
    }

    componentDidMount() {
        chrome.storage.sync.get(null, data => {
            this.setState({ data });
        });
    }

    handelSave() {
        chrome.storage.sync.set(this.state.data, () => {
            this.handleMessage('options saved');
        });
    }

    handleMessage(text, type) {
        this.setState({
            message: !text ? null : {
                type: type || 'info',
                text
            }
        });
        if (text) {
            setTimeout(() => {
                this.handleMessage(null);
            }, 3000);
        }
    }

    handleData(name) {
        return (value) => {
            this.setState(prevState => ({
                data: Object.assign({}, prevState.data, {
                    [name]: addValue(
                        prevState.data[name],
                        value
                    )
                })
            }));
        }
    }

    render() {
        return (
            <div className={style.app}>
                <Wrap
                    title='Blacklist'
                    description='comma-separated list of words to ignore during conversion, "e.g. Hello World, New York, John, ..."'>
                    <Textarea
                        value={this.state.data['blacklist']}
                        onChange={this.handleData('blacklist')}>
                    </Textarea>
                </Wrap>
                <Wrap
                    title='Keyboard Shortcuts'
                    description='press "Delete" to remove assignment'>
                    <Shortcuts
                        items={shortcutsItems}
                        value={this.state.data['shortcuts']}
                        onChange={this.handleData('shortcuts')}
                        onMessage={this.handleMessage}
                    />
                </Wrap>
                <div className={style.controls}>
                    <Message data={this.state.message} />
                    <button onClick={this.handelSave}>Save</button>
                </div>
            </div >
        )
    }
}

export function addValue(data, value) {
    if (isPlainObject(value)) {
        return Object.assign({}, data, value);
    }
    return value;
}

export default Options;