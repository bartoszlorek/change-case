import * as React from 'react';
import {createConfirmation} from 'react-confirm';
import {Dialog} from './components';

const {sync} = chrome.storage;
const confirm = createConfirmation(Dialog, 0);
const confirmText = 'Do you want to discard unsaved changes?';

type PropsType<T> = Readonly<{
  transform: (data: {[key: string]: any}) => Map<T, string>;
  onSave: () => void;
}>;

const useForm = <T extends string>({onSave, transform}: PropsType<T>) => {
  const transformRef = React.useRef(transform);
  const [isUpdated, setIsUpdated] = React.useState(true);
  const [savedData, setSavedData] = React.useState<Map<T, string>>(
    () => new Map()
  );
  const [data, setData] = React.useState<Map<T, string>>(() => new Map());

  React.useEffect(() => {
    transformRef.current = transform;
  }, [transform]);

  React.useEffect(() => {
    sync.get(null, data => {
      setIsUpdated(true);
      setSavedData(transformRef.current(data));
      setData(transformRef.current(data));
    });
  }, []);

  const getFieldProps = React.useCallback(
    (name: T) => ({
      value: data.get(name) || '',
      onChange: (value: string) => {
        const cloned = new Map(data);
        cloned.set(name, value);

        setIsUpdated(savedData.get(name) === value);
        setData(cloned);
      },
    }),
    [savedData, data]
  );

  const saveForm = React.useCallback(() => {
    if (isUpdated) {
      return;
    }

    sync.clear();
    sync.set(Object.fromEntries(data), () => {
      setIsUpdated(true);
      setSavedData(data);
      onSave();
    });
  }, [isUpdated, data, onSave]);

  const rejectForm = React.useCallback(() => {
    confirm({message: confirmText}).then(() => {
      setIsUpdated(true);
      setData(savedData);
    });
  }, [savedData]);

  return {
    isUpdated,
    getFieldProps,
    saveForm,
    rejectForm,
  };
};

export default useForm;
