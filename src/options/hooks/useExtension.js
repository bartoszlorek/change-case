import {useState, useEffect} from 'react';
import {connectToState} from 'Utils/chrome/extension-state';

const useExtension = () => {
  const [extState, setExtState] = useState(null);

  useEffect(() => {
    connectToState(extState => setExtState(extState));
  }, []);

  return {extState};
};

export default useExtension;