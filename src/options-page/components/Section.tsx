import * as React from 'react';
import {Wrap} from './Wrap';
import styles from './Section.module.scss';

type PropsType = Readonly<{
  title: string;
  description: string;
  children: React.ReactNode;
}>;

export function Section({title, description, children}: PropsType) {
  return (
    <Wrap>
      {(title || description) && (
        <p className={styles.description}>
          {title && <b>{title}: </b>}
          {description}
        </p>
      )}
      {children}
    </Wrap>
  );
}
