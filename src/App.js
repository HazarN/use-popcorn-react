import { useEffect, useState } from 'react';

import { Navbar, Logo, SearchBar, NavbarResult } from './components/Navbar';
import {
  Box,
  Summary,
  WatchedList,
  SearchedList,
  SelectedMovie,
} from './components/Box';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  // useState callback functions and all initial values
  // rendered when mounting
  const [watched, setWatched] = useState(function () {
    if (!localStorage.getItem('watched')) return [];

    const stored = localStorage.getItem('watched');

    return JSON.parse(stored);
  });

  function handleSelect(id) {
    setSelectedId(selectedId => (selectedId = selectedId === id ? null : id));
  }

  function handleUnselect() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem('watched', JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(() => {
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

    handleUnselect();
    getMoviesByQuery(query);

    return () => controller.abort();
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NavbarResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <SearchedList movies={movies} onSelect={handleSelect} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onUnselect={handleUnselect}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
