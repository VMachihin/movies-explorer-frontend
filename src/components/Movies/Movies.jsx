import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Preloader from '../Preloader/Preloader';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';

function Movies({ movies, savedMovies, onSaveMovie, onDeleteMovie }) {
  const [filtredMovies, setFiltredMovies] = React.useState([]);
  const [searchRequest, setSearchRequest] = React.useState({});
  const foundMovies = localStorage.getItem('foundMovies');
  const reqMovies = localStorage.getItem('reqMovies');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (foundMovies) {
      setFiltredMovies(JSON.parse(foundMovies));
    }
  }, [foundMovies]);

  React.useEffect(() => {
    if (reqMovies) {
      setSearchRequest(JSON.parse(reqMovies));
    }
  }, [reqMovies]);

  function handleFiltredMovies(stateSearchAndCkeckbox) {
    if (!filtredMovies.length) {
      setIsLoading(true);
    }

    let arrFitredMovies = [];

    localStorage.setItem('reqMovies', JSON.stringify(stateSearchAndCkeckbox));

    if (stateSearchAndCkeckbox.isShortMovieChecked) {
      arrFitredMovies = movies.filter((item) => {
        return (
          (item.duration <= SHORT_MOVIE_DURATION && item.nameRU.toLowerCase().includes(stateSearchAndCkeckbox.searchText.toLowerCase())) ||
          (SHORT_MOVIE_DURATION && item.nameRU.toLowerCase().includes(stateSearchAndCkeckbox.searchText.toLowerCase()))
        );
      });

      setFiltredMovies(arrFitredMovies);

      localStorage.setItem('foundMovies', JSON.stringify(arrFitredMovies));
    } else if (!stateSearchAndCkeckbox.isShortMovieChecked) {
      arrFitredMovies = movies.filter((item) => {
        return (
          item.nameRU.toLowerCase().includes(stateSearchAndCkeckbox.searchText.toLowerCase()) ||
          item.nameEN.toLowerCase().includes(stateSearchAndCkeckbox.searchText.toLowerCase())
        );
      });

      setFiltredMovies(arrFitredMovies);
      localStorage.setItem('foundMovies', JSON.stringify(arrFitredMovies));
    }
    setIsLoading(false);
  }

  return (
    <>
      <SearchForm onFiltredMovies={handleFiltredMovies} searchRequest={searchRequest} />
      {isLoading ? (
        <Preloader />
      ) : filtredMovies.length ? (
        <MoviesCardList movies={filtredMovies} savedMovies={savedMovies} onSaveMovie={onSaveMovie} onDeleteMovie={onDeleteMovie} />
      ) : (
        searchRequest && (
          <p className="movies__not-found" style={{ textAlign: 'center' }}>
            Ничего не найдено
          </p>
        )
      )}
    </>
  );
}

export default Movies;
