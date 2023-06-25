import { headers } from './MoviesApi';
export const BASE_URL = 'https://api.movies.lib.nomoredomains.rocks.vitmach.ru';

export function request(url, options) {
  return fetch(url, options).then((res) => checkResponse(res));
}

export function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Произошла ошибка: ${response.status}`);
}

export function register(name, email, password) {
  console.log(name, email, password);
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function authorization(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
}

export function getUserInfo() {
  return request(`${BASE_URL}/users/me`, { headers: headers });
}

export function editingProfile(userData) {
  return request(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      name: userData.name,
      about: userData.about,
    }),
  });
}
