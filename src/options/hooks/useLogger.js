import {useState, useCallback, useRef} from 'react';

export const TYPE = {
  INFO: 'info',
  WARN: 'warn'
};

const useLogger = ({timeout}) => {
  const [text, setText] = useState(null);
  const [type, setType] = useState(TYPE.INFO);
  const timer = useRef(null);

  const logText = useCallback(
    (text, type) => {
      setText(text || null);
      setType(type || TYPE.INFO);

      if (text !== null) {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          logText(null);
        }, timeout);
      }
    },
    [text, type]
  );

  const getLogger = () => {
    return text === null ? null : {text, type};
  };

  return {
    logger: getLogger(),
    logInfo: text => logText(text, TYPE.INFO),
    logWarn: text => logText(text, TYPE.WARN)
  };
};

export default useLogger;
