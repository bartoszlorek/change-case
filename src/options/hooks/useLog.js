import {useState, useCallback, useMemo, useRef} from 'react';

export const LOG_TYPE = {
  INFO: 'info',
  WARN: 'warn'
};

const useLog = ({timeout}) => {
  const timer = useRef(null);
  const [log, setLog] = useState({
    type: null,
    text: ''
  });

  const baseLog = useCallback(
    (type = null, text = '') => {
      setLog({type, text});

      if (type) {
        clearTimeout(timer.current);
        timer.current = setTimeout(baseLog, timeout);
      }
    },
    [timeout]
  );

  return useMemo(() => {
    log.info = text => baseLog(LOG_TYPE.INFO, text);
    log.warn = text => baseLog(LOG_TYPE.WARN, text);

    return log;
  }, [baseLog, log]);
};

export default useLog;
