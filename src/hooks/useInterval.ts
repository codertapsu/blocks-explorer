import { noop } from 'lodash';
import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number | null | false, immediate: boolean): void => {
  const savedCallback = useRef(noop);
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });
  // Execute callback if immediate is set.
  useEffect(() => {
    if (!immediate) return;
    if (delay === null || delay === false) return;
    savedCallback.current();
  }, [immediate]);
  // Set up the interval.
  useEffect(() => {
    if (delay === null || delay === false) {
      return undefined;
    }
    const tick = () => {
      return savedCallback.current();
    };
    const id = setInterval(tick, delay);
    return () => {
      return clearInterval(id);
    };
  }, [delay]);
};
