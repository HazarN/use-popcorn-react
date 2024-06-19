import { useState } from 'react';

export const Navbar = ({ children }) => {
  return (
    <nav className='nav-bar'>
      <Logo />
      <SearchBar />
      {children}
    </nav>
  );
};

// Subcomponets

const Logo = () => {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};
const SearchBar = () => {
  const [query, setQuery] = useState('');

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={e => setQuery(e.target.value)}
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
