import React from 'react';
import useInputValue from '../../hooks/useInputValue';

const Input = ({value, onChange, ...props}) => {
  const handleValueChange = useInputValue(onChange);

  return (
    <input
      {...props}
      type="text"
      value={value || ''}
      onChange={handleValueChange}
    />
  );
};

export default Input;
