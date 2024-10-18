import { useRef } from 'react';
import { useKeyboard } from '../hooks/useKeyboard';

export const Navbar = ({ children }) => {
  return <nav className='nav-bar'>{children}</nav>;
};

// Subcomponets

export const Logo = ({ onUnselect, setMovies }) => {
  function handleTransact() {
    onUnselect();
    setMovies((movies) => []);
  }

  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1 onClick={handleTransact}>usePopcorn</h1>
    </div>
  );
};
export const SearchBar = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useKeyboard('keydown', (e) => {
    if (e.code === 'Enter') {
      if (document.activeElement === inputEl.current) return;

      inputEl.current.focus();
      setQuery('');
    }

    inputEl.current.focus();
  });

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};
export const NavbarResult = ({ movies }) => {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
};
