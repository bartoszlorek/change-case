import * as React from 'react';
import styled from 'styled-components';

type PropsType = Readonly<{
  value: string;
  ariaLabel: string;
  onChange: (value: string) => void;
}>;

const Textarea = ({value, ariaLabel, onChange, ...props}: PropsType) => {
  const handleValueChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
    [onChange]
  );

  return (
    <textarea
      {...props}
      value={value}
      aria-label={ariaLabel}
      rows={5}
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
