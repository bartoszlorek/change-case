import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import mark from './mark';

const Notification = ({className, value}) => (
  <div className={className}>{mark(value)}</div>
);

Notification.propTypes = {
  value: PropTypes.string
};

Notification.defaultProps = {
  value: ''
};

export default styled(Notification)`
  position: relative;
  padding: 18px;
  margin-top: 4px;
  text-align: center;
  background: #009ff1;
  font-size: 1.25em;
  color: #fff;

  & h2 {
    font-weight: normal;
    margin: 0;
  }
`;
