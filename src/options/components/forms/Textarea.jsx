import React from 'react';
import styled from 'styled-components';
import useInputValue from '../../hooks/useInputValue';

const Textarea = ({value, rows, onChange, ...props}) => {
  const handleValueChange = useInputValue(onChange);

  return (
    <textarea
      {...props}
      value={value || ''}
      rows={rows || '5'}
      onChange={handleValueChange}
    />
  );
};

export default styled(Textarea)`
  width: 100%;
  resize: vertical;
  border: 1px solid #dddfe2;
  padding: 4px 6px;
  box-sizing: border-box;
  outline: 0;

  &:focus {
    border-color: #009ff1;
  }
`;
