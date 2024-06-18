import { useState } from 'react';

// Left box
const SearchedMovies = ({ movies }) => {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen1(open => !open)}>
        {isOpen1 ? '–' : '+'}
      </button>

      {isOpen1 && <SearchedList movies={movies} />}
    </div>
  );
};

export default SearchedMovies;

// Subcomponents

const SearchedList = ({ movies }) => {
  return (
    <ul className='list'>
      {movies?.map(movie => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};
const Movie = ({ movie }) => {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};
