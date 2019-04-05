import {useState, useCallback, useEffect} from 'react';
import {isPlainObject, isEqual} from 'lodash';
import {deepFilter} from 'Utils/deep';
import {isTruthy} from '../types';

import confirm from '../components/dialog/confirm';

const {sync} = chrome.storage;
const confirmText = 'Do you want to discard unsaved changes?';

const addValue = (data, value) => {
  if (isPlainObject(value)) {
    return {...data, ...value};
  }
  return value;
};

const useForm = ({onSave}) => {
  const [isUpdated, setIsUpdated] = useState(true);
  const [savedData, setSavedData] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    sync.get(null, data => {
      setIsUpdated(true);
      setSavedData(data);
      setData(data);
    });
  }, []);

  const getFieldProps = useCallback(
    name => ({
      value: data[name],
      onChange: value => {
        const nextData = deepFilter(
          {...data, [name]: addValue(data[name], value)},
          isTruthy
        );
        setIsUpdated(isEqual(savedData, nextData));
        setData(nextData);
      }
    }),
    [savedData, data]
  );

  const saveForm = useCallback(() => {
    if (isUpdated) {
      return;
    }
    sync.clear();
    sync.set(data, () => {
      setIsUpdated(true);
      setSavedData(data);
      onSave && onSave();
    });
  }, [isUpdated, data]);

  const rejectForm = useCallback(() => {
    confirm(confirmText).then(() => {
      setIsUpdated(true);
      setData(savedData);
    });
  }, [savedData]);

  return {
    isUpdated,
    getFieldProps,
    saveForm,
    rejectForm
  };
};

export default useForm;
