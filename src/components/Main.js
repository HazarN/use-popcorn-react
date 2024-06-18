import SearchedMovies from './boxes/SearchedMovies';
import WatchedMovies from './boxes/WatchedMovies';

const Main = () => {
  return (
    <main className='main'>
      <SearchedMovies />
      <WatchedMovies />
    </main>
  );
};

export default Main;
