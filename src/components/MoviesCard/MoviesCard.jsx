import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

function MoviesCard({ movie }) {
  const location = useLocation();

  function checkPath(pathname) {
    if (pathname === '/movies') {
      return <button className="movie__like-btn" />;
    } else if (pathname === '/saved-movies') {
      return <button className="movie__delete-btn" />;
    }
  }

  return (
    <li className="movie-library__item">
      <article className="movie">
        <div className="movie__info">
          <h3 className="movie__title">{movie.nameRU}</h3>
          <span className="movie__duration">1ч 42м</span>

          {checkPath(location.pathname)}
        </div>

        <img src={movie.image} alt="постер к фильму" className="movie__img" />
      </article>
    </li>
  );
}

export default MoviesCard;
