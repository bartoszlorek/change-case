import * as React from 'react';
import styled, {css} from 'styled-components';

type PropsType = Readonly<{
  active: boolean;
}>;

function Ribbon({active, ...restProps}: PropsType) {
  return <div {...restProps} />;
}

export default styled(Ribbon)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #d1d6e0;
  box-shadow: 0 0 6px rgba(0, 159, 241, 0);
  transition: all 0.2s ease;
  flex-shrink: 0;
  height: 3px;

  ${(props: PropsType) =>
    props.active &&
    css`
      background: #009ff1;
      box-shadow: 0 0 6px rgba(0, 159, 241, 0.85);
    `};
`;
