import * as React from 'react';
import styles from './Textarea.module.scss';

type PropsType = Readonly<{
  value: string;
  ariaLabel: string;
  onChange: (value: string) => void;
}>;

export function Textarea({value, ariaLabel, onChange}: PropsType) {
  const handleValueChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
    [onChange]
  );

  return (
    <textarea
      value={value}
      aria-label={ariaLabel}
      className={styles.textarea}
      onChange={handleValueChange}
      rows={5}
    />
  );
}
