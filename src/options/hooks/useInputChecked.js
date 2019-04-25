import {useCallback} from 'react';

const useInputChecked = fn => useCallback(e => fn(e.target.checked), [fn]);

export default useInputChecked;
