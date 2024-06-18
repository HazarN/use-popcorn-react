import { useState } from 'react';

const Navbar = () => {
  return (
    <nav className='nav-bar'>
      <Logo />
      <SearchBar />
      <NavbarResult />
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
const NavbarResult = () => {
  return (
    <p className='num-results'>
      Found <strong>X</strong> results
    </p>
  );
};
