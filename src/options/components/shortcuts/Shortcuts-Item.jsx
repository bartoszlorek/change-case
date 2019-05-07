import React from 'react';
import styled, {css} from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import {choose} from '@utils/react-utils';
import {uniq} from 'lodash';

import Dots from './Shortcuts-Dots';
import Badge from './Badge';

const record = require('mousetrap-record');
const mousetrap = record(require('mousetrap'));

const Block = styled.div`
  padding: 0.75em;
  height: 36px;
  box-sizing: border-box;
`;

const AddBadge = styled(Badge)`
  & span {
    font-weight: normal;
    color: #666;
  }
`;

const RemoveBadge = styled(Badge)`
  & span {
    font-weight: normal;
    color: #f1002b;
  }
  &:hover span,
  &:focus span {
    background: #f1002b;
  }
  &:active span {
    background: #bf0022;
  }
`;

class ShortcutsItem extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    if (nextProps.active === false) {
      return;
    }
    mousetrap.record(code => {
      this.props.onClick();
      this.props.onAssign(this.props.data.name, code);
      return false;
    });
  }

  isItem = event => !this.props.className.indexOf(event.target.classList[0]);

  handleClick = () => {
    this.props.onClick(this.props.data.name);
    mousetrap.record(() => false);
  };

  handleClickOutside = event => {
    if (this.props.active && !this.isItem(event)) {
      this.handleClick();
    }
  };

  handleRemoveBadge = event => {
    event.stopPropagation();
    this.props.onAssign(this.props.data.name, ['del']);
  };

  displayValue = () => {
    let value = this.props.value;
    if (value == null) {
      return '';
    }
    return uniq(value.split(/[\+\s]/)).join('+');
  };

  render() {
    let {className, data, active} = this.props;
    let value = this.displayValue();
    return (
      <div className={className} onClick={this.handleClick}>
        <Block>{data.label}</Block>
        <Block>{value}</Block>
        {!active &&
          (value ? (
            <RemoveBadge value="×" onClick={this.handleRemoveBadge} />
          ) : (
            <AddBadge value="+" />
          ))}
        {active && <Dots />}
      </div>
    );
  }
}

export default styled(onClickOutside(ShortcutsItem))`
  position: relative;
  border-top: 1px dashed #dddfe2;
  display: flex;
  justify-content: flex-end;

  &:first-child {
    border-top: 0;
  }
  &:hover {
    background: #eaedf0;
    cursor: pointer;
  }
  & > *:first-child {
    margin-right: auto;
  }

  ${choose(
    'active',
    css`
      &,
      &:hover {
        color: #fff;
        background: #009ff1;
        border-top-color: #009ff1;
        border-top-style: solid;
      }
      & + * {
        border-top: 1px solid #009ff1;
      }
    `
  )};
`;
