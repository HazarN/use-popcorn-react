import { useState } from 'react';

const Navbar = ({ movies }) => {
  return (
    <nav className='nav-bar'>
      <Logo />
      <SearchBar />
      <NavbarResult movies={movies} />
    </nav>
  );
};

export default Navbar;

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
const NavbarResult = ({ movies }) => {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
};
