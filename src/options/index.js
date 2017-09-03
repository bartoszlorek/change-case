import React from 'react';
import { bind } from './react-utils';
import style from './style.css';

import Wrap from './components/wrap';
import Message from './components/message';
import Shortcuts from './components/shortcuts';

const ShortcutsItems = [
    { name: 'uppercase', label: 'UPPERCASE' },
    { name: 'lowercase', label: 'lowercase' },
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
            message: null
        }
        bind(this, [
            'handelSave',
            'handleMessage'
        ]);
    }

    handelSave() {
        console.log('save')
    }

    handleMessage(text, type) {
        this.setState({
            message: !text ? null : {
                type: type || 'info',
                text
            }
        });
    }

    render() {
        return (
            <div className={style.app}>
                <Wrap
                    title='Blacklist'
                    description='comma-separated list of words to ignore during conversion, "e.g. Hello World, New York, John, ..."'>
                    <textarea rows='5'></textarea>
                </Wrap>
                <Wrap
                    title='Keyboard Shortcuts'
                    description='press "Delete" to remove assignment'>
                    <Shortcuts
                        items={ShortcutsItems}
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

export default Options;