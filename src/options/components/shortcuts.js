import React from 'react';
import classNames from 'classnames';
import { bind } from '../../.utils/react/react-utils';
import { forEach } from 'lodash';
import style from '../style.css';

import ShortcutsItem from './shortcuts-item';

class Shortcuts extends React.Component {
    constructor(props) {
        super(props);
        bind(this, [
            'handelActive',
            'handleAssign',
            'validKeys'
        ]);
        this.state = {
            active: null
        }
    }

    handelActive(itemName) {
        this.setState(prevState => {
            let active = null;
            if (itemName && itemName !== prevState.active) {
                active = itemName;
            }
            return { active }
        });
    }

    handleAssign(itemName, code) {
        let result = this.validKeys(itemName, code);
        if (result !== false) {
            this.props.onChange({
                [itemName]: result
            });
        }
    }

    validKeys(itemName, code) {
        if (code[0] === 'del') {
            return '';
        }
        let { value, onMessage } = this.props;

        // don't press too long
        let last = code.length - 1;
        if (code[last] === code[last - 1]) {
            onMessage('invalid keys', 'error');
            return false;
        }

        code = code.join(' ');
        let result = isAssigned(code, value);
        if (result !== false) {
            let message = 'already assigned';
            if (result !== itemName) {
                message += ` to ${result}`;
            }
            onMessage(message, 'error');
            return false;
        }

        onMessage('correctly assigned');
        return code;
    }

    render() {
        let { items, value } = this.props;
        return (
            <div>
                {items && items.map(item =>
                    <ShortcutsItem
                        key={item.name}
                        data={item}
                        value={value && value[item.name]}
                        active={this.state.active === item.name}

                        onClick={this.handelActive}
                        onAssign={this.handleAssign}
                    />
                )}
            </div>
        )
    }
}

function isAssigned(code, state) {
    let result = false;
    forEach(state, (value, name) => {
        if (code === value) {
            result = name;
            return false;
        }
    });
    return result;
}

export default Shortcuts;