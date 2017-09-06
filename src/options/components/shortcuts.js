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

    handleAssign(itemData) {
        this.props.onChange(itemData);
    }

    render() {
        let { items, value, onMessage } = this.props;
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
                        onMessage={onMessage}
                    />
                )}
            </div>
        )
    }
}

export default Shortcuts;