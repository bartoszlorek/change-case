import * as React from 'react';
import cx from 'classnames';
import type {Log} from '../useLog';
import styles from './Console.module.scss';

type PropsType = Readonly<{
  log: Log;
}>;

export function Console({log}: PropsType) {
  if (log.text === '') {
    return null;
  }

  const consoleClass = cx(styles.console, {
    [styles.consoleInfo]: log.type === 'info',
    [styles.consoleWarn]: log.type === 'warn',
  });

  return <div className={consoleClass}>{log.text}</div>;
}
