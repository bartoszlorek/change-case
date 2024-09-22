import * as React from 'react';

export interface LogData {
  type: 'info' | 'warn';
  text: string;
}

export interface Log extends LogData {
  info: (text: string) => void;
  warn: (text: string) => void;
}

const defaultLogData: LogData = {
  type: 'info',
  text: '',
};

type PropsType = Readonly<{
  timeout: number;
}>;

export function useLog({timeout}: PropsType): Log {
  const timer = React.useRef<NodeJS.Timeout>();
  const [data, setData] = React.useState<LogData>(defaultLogData);

  const methods = React.useMemo(() => {
    const logger = (type: LogData['type'], text: string) => {
      setData({type, text});

      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setData(defaultLogData);
      }, timeout);
    };

    return {
      info: (text: string) => logger('info', text),
      warn: (text: string) => logger('warn', text),
    };
  }, [timeout]);

  return React.useMemo(
    () => ({
      ...data,
      ...methods,
    }),
    [data, methods]
  );
}
