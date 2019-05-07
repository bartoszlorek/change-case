import {useState, useEffect} from 'react';
import {connectToState, STATE} from '@utils/chrome/extension-state';

const useExtension = () => {
  const [extState, setExtState] = useState(STATE.DEFAULT);

  useEffect(() => {
    connectToState(extState => setExtState(extState));
  }, []);

  return {extState};
};

export default useExtension;
