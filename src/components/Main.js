import SearchedMovies from './boxes/SearchedMovies';
import WatchedMovies from './boxes/WatchedMovies';

const Main = ({ movies }) => {
  return (
    <main className='main'>
      <SearchedMovies movies={movies} />
      <WatchedMovies />
    </main>
  );
};

export default Main;
