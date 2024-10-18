import { useState, useEffect } from 'react';

export function useLocalStorageState(initialState, lsKey) {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(lsKey);

    if (!stored) return initialState;
    else return JSON.parse(stored);
  });

  useEffect(
    () => localStorage.setItem(lsKey, JSON.stringify(state)),
    [state, lsKey]
  );

  return [state, setState];
}
