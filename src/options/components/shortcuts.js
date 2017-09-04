import React from 'react';
import classNames from 'classnames';
import { bind } from '../react-utils';
import style from '../style.css';

import ShortcutsItem from './shortcuts-item';

class Shortcuts extends React.Component {
    constructor(props) {
        super(props);
        bind(this, [
            'handelActive',
            'handleAssign'
        ]);
        this.state = {
            active: null,
            keys: {}
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

    handleAssign(item) {
        this.setState(prevState => {
            let newKeys = {};
            newKeys[item.name] = item.code;
            return {
                keys: Object.assign({},
                    prevState.keys,
                    newKeys
                )
            }
        });
    }

    render() {
        let { items, onMessage } = this.props;
        return (
            <div>
                {items && items.map(item =>
                    <ShortcutsItem
                        key={item.name}
                        data={item}
                        code={this.state.keys[item.name]}
                        active={this.state.active === item.name}

                        onClick={this.handelActive}
                        onAssign={this.handleAssign}
                        onMessage={onMessage}
                    />
                )}
            </div>
        )
    }
}

export default Shortcuts;