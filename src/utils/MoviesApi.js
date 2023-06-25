import { request } from './MainApi';

export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const headers = {
  'Content-Type': 'application/json',
  authorization: `Bearer ${localStorage.getItem('jwt')}`,
};

export function getAllMovies() {
  return request(`${BASE_URL}`, { headers: headers });
}
