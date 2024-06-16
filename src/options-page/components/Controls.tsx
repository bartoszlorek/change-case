import * as React from 'react';
import styles from './Controls.module.scss';

type PropsType = Readonly<{
  children: React.ReactNode;
}>;

export function Controls({children}: PropsType) {
  return <div className={styles.container}>{children}</div>;
}
