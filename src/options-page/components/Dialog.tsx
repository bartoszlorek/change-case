import * as React from 'react';
import {confirmable} from 'react-confirm';
import {Button} from './Button';
import {Wrap} from './Wrap';
import styles from './Dialog.module.scss';

type PropsType = Readonly<{
  message: string;
  proceed?: () => void;
  dismiss?: () => void;
}>;

export const Dialog = confirmable(({message, proceed, dismiss}: PropsType) => (
  <div className={styles.overlay}>
    <div className={styles.container}>
      <Wrap>{message}</Wrap>
      <div className={styles.buttons}>
        <Button text="No" onClick={dismiss} />
        <Button type="primary" text="Yes" onClick={proceed} />
      </div>
    </div>
  </div>
));
