const BASE_URL = 'https://api.movies.lib.nomoredomains.rocks.vitmach.ru';
const MOVIES_URL = 'https://api.nomoreparties.co/';
const SAVED_MOVIES_URL = 'https://api.movies.lib.nomoredomains.rocks.vitmach.ru/movies';
const SHORT_MOVIE_DURATION = 40;

const valid_name = /^[a-z0-9_-]{3,16}$/;
const valid_email = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

export { BASE_URL, MOVIES_URL, SAVED_MOVIES_URL, SHORT_MOVIE_DURATION, valid_name, valid_email };
