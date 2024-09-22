import * as React from 'react';
import styles from './Wrap.module.scss';

type PropsType = Readonly<{
  children: React.ReactNode;
}>;

export function Wrap({children}: PropsType) {
  return <div className={styles.container}>{children}</div>;
}
