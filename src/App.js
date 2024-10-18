import { useEffect, useState } from 'react';
import { useMovies } from './hooks/useMovies';

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
  const [selectedId, setSelectedId] = useState(null);
  // useState callback functions and all initial values
  // rendered when mounting
  const [watched, setWatched] = useState(function () {
    if (!localStorage.getItem('watched')) return [];

    const stored = localStorage.getItem('watched');

    return JSON.parse(stored);
  });

  const { movies, isLoading, error } = useMovies(query, handleUnselect);

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
