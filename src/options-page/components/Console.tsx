import * as React from 'react';
import styled, {css} from 'styled-components';
import type {Log} from '../useLog';

type PropsType = Readonly<{
  log: Log;
  className?: string;
}>;

const Console = ({className, log}: PropsType) =>
  log.type && <div className={className}>{log.text}</div>;

const styleType =
  (type: Log['type']) => (style: TemplateStringsArray) => (props: PropsType) =>
    props.log.type === type && css(style);

export default styled(Console)`
  margin: 0 auto 0 0;
  white-space: nowrap;
  font-weight: bold;
  overflow: hidden;

  ${styleType('info')`
    color: #009ff1;
  `}

  ${styleType('warn')`
    color: #f1002b;
  `}
`;
