import React from 'react';
import classNames from 'classnames';
import { uniq } from 'lodash';
import { bind } from '../react-utils';
import style from '../style.css';

const Mousetrap = require('mousetrap-record')(require('mousetrap'));
const escKeys = code => code && uniq(code.split(/[\+\s]/)).join('+');

function validKeys(code, handler) {
    if (code[0] === 'del') {
        return '';
    }
    // don't press too long
    let last = code.length - 1;
    if (code[last] === code[last - 1]) {
        handler('invalid keys', 'error');
        return '';
    }
    handler(null);
    return code.join(' ');
}

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
            this.props.onAssign({
                name: this.props.data.name,
                code: validKeys(code, this.props.onMessage)
            });
            this.props.onClick();
            return false;
        });
    }

    handleClick() {
        this.props.onClick(this.props.data.name);
        Mousetrap.record(() => false);
    }

    render() {
        return (
            <div
                className={classNames(
                    this.props.active &&
                    style.itemActive,
                    style.item
                )}
                onClick={this.handleClick}>
                <div>{this.props.data.label}</div>
                <div>{escKeys(this.props.code)}</div>
            </div>
        )
    }
}

export default ShortcutsItem;