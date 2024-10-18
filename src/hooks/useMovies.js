import { useState, useEffect } from 'react';

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    callback?.();

    const controller = new AbortController();

    async function getMoviesByQuery(query) {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `https://www.omdbapi.com/?&apikey=${process.env.REACT_APP_KEY}&s=${query}`,
          {
            signal: controller.signal,
          }
        );
        const data = await res.json();

        if (!res.ok) throw new Error('Failed to fetch!');

        if (!data.Search) throw new Error(data.Error);

        setMovies(data.Search);
        setError('');
      } catch (err) {
        console.error(err);

        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    getMoviesByQuery(query);

    return () => controller.abort();
  }, [query]); // Eslint tells that you should add 'callback' but when i add it, program fails about requesting(too many request at the same time)

  return { movies, setMovies, isLoading, error };
}
