import * as React from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';

type PropsType = Readonly<{
  text: string;
  size?: 'small' | 'full';
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}>;

export function Button({
  text,
  size = 'small',
  type = 'secondary',
  ...restProps
}: PropsType) {
  const buttonClass = cx(styles.button, {
    [styles.buttonFull]: size === 'full',
    [styles.buttonPrimary]: type === 'primary',
  });

  return (
    <button className={buttonClass} {...restProps}>
      {text}
    </button>
  );
}
