import { useEffect, useState } from 'react';

import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import Rating from './Rating';

const average = arr =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// Left box
export const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen(open => !open)}>
        {isOpen ? '–' : '+'}
      </button>

      {isOpen && children}
    </div>
  );
};

// Subcomponents
export const SelectedMovie = ({ selectedId, onUnselect, onAddWatched }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);

  const {
    Title: title,
    Year: year,
    Rated: rated,
    Poster: poster,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    Director: director,
    Writer: writer,
    Actors: actors,
    Plot: plot,
    imdbRating,
  } = movie;

  const handleAdd = () => {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
    };

    onAddWatched(newMovie);
    onUnselect();
  };

  useEffect(() => {
    async function getMovieById(selectedId) {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `https://www.omdbapi.com/?&apikey=${process.env.REACT_APP_KEY}&i=${selectedId}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error('Failed to fetch!');
        if (data.Response === 'False') throw new Error(data.Error);

        setMovie(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieById(selectedId);
  }, [selectedId]);

  return (
    <div className='details'>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <header>
          <button className='btn-back' onClick={onUnselect}>
            &larr;
          </button>

          <img src={poster} alt={`Poster of ${title}`} />

          <div className='details-overview'>
            <h2>{title}</h2>
            <p>
              {released} &bull; {runtime}
            </p>
            <p>{genre}</p>
            <p>
              <span>⭐</span>
              {imdbRating} IMDB Rating
            </p>
          </div>
        </header>
      )}

      <section>
        <div className='rating'>
          <Rating starNumber={10} size={24} onSetRating={setUserRating} />
          <button className='btn-add' onClick={handleAdd}>
            Add to the list
          </button>
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed By {director}</p>
      </section>
    </div>
  );
};

export const WatchedList = ({ watched }) => {
  return (
    <ul className='list'>
      {watched.map(movie => (
        <WatchedMovie movie={movie} />
      ))}
    </ul>
  );
};

export const SearchedList = ({ movies, onSelect }) => {
  return (
    <ul className='list list-movies'>
      {movies?.map(movie => (
        <Movie movie={movie} key={movie.imdbID} onSelect={onSelect} />
      ))}
    </ul>
  );
};

export const Summary = ({ watched }) => {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating));
  const avgUserRating = average(watched.map(movie => movie.userRating));
  const avgRuntime = average(watched.map(movie => movie.runtime));

  return (
    <div className='summary'>
      <h2>Movies you watched</h2>

      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

const Movie = ({ movie, onSelect }) => {
  return (
    <li onClick={() => onSelect(movie.imdbID)}>
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

const WatchedMovie = ({ movie }) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
};
