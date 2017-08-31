import React from 'react';
import style from './style.css';

import Blacklist from './blacklist';
import Shortcuts from './shortcuts';
import Controls from './controls';

const methods = [
    ['uppercase', 'UPPERCASE'],
    ['lowercase', 'lowercase'],
    ['titleCase', 'Title Case'],
    ['sentenceCase', 'Sentence case'],
    ['camelCase', 'camelCase'],
    ['pascalCase', 'PascalCase'],
    ['constantCase', 'CONSTANT_CASE'],
    ['paramCase', 'param-case'],
    ['snakeCase', 'snake_case'],
    ['dotCase', 'dot.case'],
    ['toggleCase', 'tOGGLE cASE'],
    ['noCase', 'no case']
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