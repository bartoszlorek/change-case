import * as React from 'react';
import styles from './Sections.module.scss';

type PropsType = Readonly<{
  children: React.ReactNode;
}>;

export function Sections({children}: PropsType) {
  return <div className={styles.container}>{children}</div>;
}
