import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

function Movies({ moviesData }) {
  return (
    <>
      <SearchForm />
      <MoviesCardList movies={moviesData} />
    </>
  );
}

export default Movies;
