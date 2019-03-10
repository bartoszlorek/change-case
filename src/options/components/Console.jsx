import * as React from 'react';
import styled, {css} from 'styled-components';
import {choose} from 'Utils/react-utils';
import {TYPE} from './../controllers/LoggerController';

const Console = ({className, logger}) =>
  logger && <div className={className}>{logger.text}</div>;

export default styled(Console)`
  margin: 0 auto 0 0;
  white-space: nowrap;
  overflow: hidden;

  ${choose('logger.type', {
    [TYPE.INFO]: css`
      color: #009ff1;
      font-weight: bold;
    `,
    [TYPE.WARN]: css`
      color: #f1002b;
      font-weight: bold;
    `
  })};
`;
