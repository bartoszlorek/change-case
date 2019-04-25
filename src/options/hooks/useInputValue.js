import {useCallback} from 'react';

const useInputValue = fn => useCallback(e => fn(e.target.value), [fn]);

export default useInputValue;
