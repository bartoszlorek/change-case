import * as React from 'react';
import cx from 'classnames';
import styles from './Ribbon.module.scss';

type PropsType = Readonly<{
  active: boolean;
}>;

export function Ribbon({active}: PropsType) {
  return <div className={cx(styles.ribbon, active && styles.ribbonActive)} />;
}
