import React from 'react';
import styled from 'styled-components';
import useInputChecked from '../../hooks/useInputChecked';

const Checkbox = ({className, value, label, onChange, ...props}) => {
  const handleCheckedChange = useInputChecked(onChange);

  return (
    <div className={className}>
      <label>
        <input
          {...props}
          type="checkbox"
          checked={!!value}
          onChange={handleCheckedChange}
        />
        {label}
      </label>
    </div>
  );
};

export default styled(Checkbox)`
  line-height: 2em;

  & label:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  & input {
    margin: 0 10px 0 0;
    vertical-align: -0.15em;
    cursor: pointer;
  }
`;
