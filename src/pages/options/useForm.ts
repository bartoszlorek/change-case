import * as React from 'react';
import {createConfirmation} from 'react-confirm';
import {Dialog} from './components';

type FormValue = string | number | boolean | null | FormValue[];

const confirm = createConfirmation(Dialog, 0);
const confirmText = 'Do you want to discard unsaved changes?';

type PropsType<T> = Readonly<{
  getInitialState: () => T;
  getStorageState: () => Promise<T>;
  onSubmit: (data: T) => Promise<void>;
  onError: (error: unknown) => void;
}>;

export function useForm<T extends Record<string, FormValue>>({
  getInitialState,
  getStorageState,
  onSubmit,
  onError,
}: PropsType<T>) {
  const [fieldsData, setFieldsData] = React.useState<T>(getInitialState);
  const [storedData, setStoredData] = React.useState<T | undefined>();
  const [isUpdated, setIsUpdated] = React.useState(true);

  React.useEffect(() => {
    getStorageState().then(data => {
      setFieldsData(data);
      setStoredData(data);
      setIsUpdated(true);
    });
  }, []);

  const getFieldProps = <K extends keyof T>(name: K) => ({
    value: fieldsData[name],
    onChange: (value: T[K]) => {
      setFieldsData(currentData => ({...currentData, [name]: value}));
      setIsUpdated(storedData?.[name] === value);
    },
  });

  const submitForm = React.useCallback(async () => {
    try {
      if (!isUpdated) {
        await onSubmit(fieldsData);
        setStoredData(fieldsData);
        setIsUpdated(true);
      }
    } catch (error) {
      onError(error);
    }
  }, [isUpdated, fieldsData]);

  const rejectForm = React.useCallback(async () => {
    if (storedData) {
      await confirm({message: confirmText});
      setFieldsData(storedData);
      setIsUpdated(true);
    }
  }, [storedData]);

  return {
    isUpdated,
    getFieldProps,
    submitForm,
    rejectForm,
  };
}
