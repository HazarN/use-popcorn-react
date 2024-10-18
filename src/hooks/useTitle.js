import { useEffect } from 'react';

export function useTitle(title, cleanupTitle) {
  useEffect(() => {
    if (!title) return;

    document.title = `Movie | ${title}`;

    return () => (document.title = cleanupTitle);
  }, [title]);
}
