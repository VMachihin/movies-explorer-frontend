import MoviesCard from '../MoviesCard/MoviesCard.jsx';

import './MoviesCardList.css';
const movies = [
  {
    movieId: 1,
    nameRU: '33 слова о дизайне',
    duration: '1ч 42м',
    image: 'https://iili.io/H4evIpe.jpg',
    isLiked: true,
  },
  {
    movieId: 2,
    nameRU: 'Киноальманах «100 лет дизайна»',
    duration: '1ч 42м',
    image: 'https://iili.io/H4evxY7.jpg',
  },
  {
    movieId: 3,
    nameRU: 'В погоне за Бенкси',
    duration: '1ч 42м',
    image: 'https://iili.io/H4evzv9.jpg',
  },
  {
    movieId: 4,
    nameRU: 'Баския: Взрыв реальности',
    duration: '1ч 42м',
    image: 'https://iili.io/H4evo2S.jpg',
  },
  {
    movieId: 5,
    nameRU: 'Бег это свобода',
    duration: '1ч 42м',
    image: 'https://iili.io/H4evuTu.jpg',
  },
  {
    movieId: 6,
    nameRU: 'Книготорговцы',
    duration: '1ч 42м',
    image: 'https://iili.io/H4evAhb.jpg',
    isLiked: true,
  },
  {
    movieId: 7,
    nameRU: 'Когда я думаю о Германии ночью',
    duration: '1ч 42м',
    image: 'https://iili.io/H4evRQj.jpg',
  },
];

function MoviesCardList() {
  return (
    <section className="movie-library">
      <div className="container">
        <ul className="movie-library__list">
          {movies.map((movie) => {
            return <MoviesCard key={movie.movieId} movie={movie} />;
          })}
        </ul>
        <button className="movie-library__btn">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;
