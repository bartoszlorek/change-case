import React from 'react';
import classNames from 'classnames';
import { bind } from './reactness';
import style from './style.css';

class ShortcutItem extends React.Component {
    constructor(props) {
        super(props);
        bind(this, [
            'handleClick',
        ]);
    }

    handleClick() {
        this.props.setActive(this.props.slug);
    }

    render() {
        return (
            <div
                className={classNames(
                    this.props.active && style.itemActive,
                    style.item
                )}
                onClick={this.handleClick}>
                {this.props.name}
            </div>
        )
    }
}

export default ShortcutItem;