import React from 'react';
import classNames from 'classnames';
import { uniq } from 'lodash';
import { bind } from '../utils/react-utils';
import style from '../style.css';

const Mousetrap = require('mousetrap-record')(require('mousetrap'));

class ShortcutsItem extends React.Component {
    constructor(props) {
        super(props);
        bind(this, [
            'handleClick'
        ]);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active === false) {
            return;
        }
        Mousetrap.record(code => {
            let keys = validKeys(code, this.props.onMessage);
            if (keys !== false) {
                this.props.onAssign({
                    [this.props.data.name]: keys
                });
            }
            this.props.onClick();
            return false;
        });
    }

    handleClick() {
        this.props.onClick(this.props.data.name);
        Mousetrap.record(() => false);
    }

    render() {
        let { data, value, active } = this.props;
        return (
            <div
                className={classNames(
                    active &&
                    style.itemActive,
                    style.item
                )}
                onClick={this.handleClick}>
                <div>{data.label}</div>
                <div>{escKeys(value)}</div>
            </div>
        )
    }
}

export function escKeys(code) {
    return code && uniq(code.split(/[\+\s]/)).join('+');
}

export function validKeys(code, handler) {
    if (code[0] === 'del') {
        return '';
    }
    // don't press too long
    let last = code.length - 1;
    if (code[last] === code[last - 1]) {
        handler('invalid keys', 'error');
        return false;
    }
    handler(null);
    return code.join(' ');
}

export default ShortcutsItem;