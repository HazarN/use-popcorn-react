import { useEffect } from 'react';

export function useKeyboard(eventType, eventCallback) {
  useEffect(() => {
    document.addEventListener(eventType, eventCallback);

    return () => document.removeEventListener(eventType, eventCallback);
  }, [eventType, eventCallback]);
}
