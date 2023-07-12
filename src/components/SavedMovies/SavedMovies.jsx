import React from 'react';

import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import { SHORT_MOVIE_DURATION } from '../../utils/constants.js';

function SavedMovies({ savedMovies, onDeleteMovie }) {
  const [filtredSaveMovies, setFiltredSaveMovies] = React.useState([]);
  const [searchRequest, setSearchRequest] = React.useState({});
  const foundSaveMovies = localStorage.getItem('foundSaveMovies');
  const reqSaveMovies = localStorage.getItem('reqSaveMovies');

  React.useEffect(() => {
    if (foundSaveMovies) {
      setFiltredSaveMovies(JSON.parse(foundSaveMovies));
    }
  }, [foundSaveMovies]);

  React.useEffect(() => {
    if (reqSaveMovies) {
      setSearchRequest(JSON.parse(reqSaveMovies));
    }
  }, [reqSaveMovies]);

  function handleFiltredSaveMovies(stateSearchAndCkeckbox) {
    let arrFiltredSaveMovies = [];

    localStorage.setItem('reqSaveMovies', JSON.stringify(stateSearchAndCkeckbox));

    if (stateSearchAndCkeckbox.isShortMovieChecked) {
      arrFiltredSaveMovies = savedMovies.filter((item) => {
        return item.duration <= SHORT_MOVIE_DURATION && item.nameRU.toLowerCase().includes(stateSearchAndCkeckbox.searchText.toLowerCase());
      });

      setFiltredSaveMovies(arrFiltredSaveMovies);

      localStorage.setItem('foundSaveMovies', JSON.stringify(arrFiltredSaveMovies));
    } else if (!stateSearchAndCkeckbox.isShortMovieChecked) {
      arrFiltredSaveMovies = savedMovies.filter((item) => {
        return item.nameRU.toLowerCase().includes(stateSearchAndCkeckbox.searchText.toLowerCase());
      });

      setFiltredSaveMovies(arrFiltredSaveMovies);
      localStorage.setItem('foundSaveMovies', JSON.stringify(arrFiltredSaveMovies));
    }
  }

  return (
    <>
      <SearchForm onFiltredMovies={handleFiltredSaveMovies} searchRequest={searchRequest} />
      {filtredSaveMovies.length ? (
        <MoviesCardList movies={filtredSaveMovies} savedMovies={savedMovies} onDeleteMovie={onDeleteMovie} />
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

export default SavedMovies;
