import { useEffect, useRef, useState } from 'react';

export const Navbar = ({ children }) => {
  return <nav className='nav-bar'>{children}</nav>;
};

// Subcomponets

export const Logo = () => {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};
export const SearchBar = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    function enterCallback(e) {
      if (e.code === 'Enter') {
        if (document.activeElement === inputEl.current) return;

        inputEl.current.focus();
        setQuery('');
      }
    }

    document.addEventListener('keydown', enterCallback);

    // focusing on the search bar in initial render
    inputEl.current.focus();

    return () => document.removeEventListener('keydown', enterCallback);
  }, [setQuery]);

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={e => setQuery(e.target.value)}
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
