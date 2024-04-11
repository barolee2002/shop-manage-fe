import React from 'react';
export function useDebounce(value: string, delay: number = 500 as number) {
  const [debouncedValue, setDebouncedValue] = React.useState('');
  const timerRef = React.useRef<number>();

  React.useEffect(() => {
    timerRef.current = window.setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}
