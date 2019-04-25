import * as React from 'react';
import styled, {css} from 'styled-components';
import {LOG_TYPE} from './../hooks/useLog';

const styleType = type => style => props =>
  props.log.type === type && css(style);

const Console = ({className, log}) =>
  log.type && <div className={className}>{log.text}</div>;

export default styled(Console)`
  margin: 0 auto 0 0;
  white-space: nowrap;
  font-weight: bold;
  overflow: hidden;

  ${styleType(LOG_TYPE.INFO)`
    color: #009ff1;
  `}

  ${styleType(LOG_TYPE.WARN)`
    color: #f1002b;
  `}
`;
