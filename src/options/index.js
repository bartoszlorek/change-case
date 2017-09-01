import React from 'react';
import style from './style.css';

import Blacklist from './components/blacklist';
import Shortcuts from './components/shortcuts';
import Controls from './components/controls';

const methods = [
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
    }

    handelSave() {
        console.log('save')
    }

    render() {
        return (
            <div className={style.app}>
                <Blacklist />
                <Shortcuts methods={methods} />
                <Controls onSave={this.handelSave} />
            </div>
        )
    }
}

export default Options;