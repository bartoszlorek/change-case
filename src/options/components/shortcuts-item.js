import React from 'react';
import classNames from 'classnames';
import { uniq } from 'lodash';
import { bind } from '../utils/react-utils';
import style from '../style.css';

const Mousetrap = require('mousetrap-record')(require('mousetrap'));
const escKeys = code => code && uniq(code.split(/[\+\s]/)).join('+');

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
            this.props.onClick();
            this.props.onAssign(
                this.props.data.name,
                code
            );
            return false;
        })
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

export default ShortcutsItem;