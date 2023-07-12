import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

import Register from '../Register/Register';
import Login from '../Login/Login';

import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { register, authorization, checkToken } from '../../utils/Auth';
import { getUserInfo, editingProfile } from '../../utils/MainApi';
import { getAllMovies, getSavedMovies, saveMovie, deleteMovie } from '../../utils/MoviesApi';

import ProtectedRouteElement from '../../utils/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const showHeader =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies' ||
    location.pathname === '/profile';

  const showFooter = location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies';

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setloggedIn] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isResOk, setIsResOk] = React.useState(false);

  // Регистрация
  function handleRegister(name, email, password) {
    register(name, email, password)
      .then((res) => {
        navigate('/movies', { replace: true });
      })
      .catch(console.error);
  }

  // Авторизация
  function handleAutorization(email, password) {
    authorization(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setloggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch(console.error);
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setloggedIn(true);

            navigate(location.pathname);
          }
        })
        .catch(console.error);
    }
  }, []);

  React.useEffect(() => {
    loggedIn &&
      Promise.all([getUserInfo(), getAllMovies(), getSavedMovies()])
        .then(([userData, moviesData, savedMoviesData]) => {
          setCurrentUser(userData);
          setMovies(moviesData);
          setSavedMovies(savedMoviesData);
          localStorage.setItem('savedMovies', JSON.stringify(savedMoviesData));
        })
        .catch(console.error);
  }, [loggedIn]);

  useEffect(() => {
    loggedIn && localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, loggedIn]);

  function handleEditUserInfo(newUserData) {
    editingProfile(newUserData)
      .then((userData) => {
        setCurrentUser(userData);
        setIsResOk(true);
      })
      .catch((err) => {
        setIsResOk(false);
        console.err(err);
      });
  }

  function handleSaveMovies(movie, isSave, savedMovie) {
    if (isSave) {
      handleDeleteMovie(savedMovie._id);
    } else {
      saveMovie(movie)
        .then((res) => {
          setSavedMovies([res, ...savedMovies]);
        })
        .catch(console.error);
    }
  }

  function handleDeleteMovie(id) {
    let newSavedMovies;
    deleteMovie(id)
      .then((res) => {
        newSavedMovies = savedMovies.filter((movie) => movie._id !== id);
        setSavedMovies(newSavedMovies);
        localStorage.setItem('foundSaveMovies', JSON.stringify(newSavedMovies));
      })
      .catch(console.error);
  }

  console.log(localStorage);

  function handleSignOut() {
    setloggedIn(false);
    // localStorage.removeItem('jwt');
    localStorage.clear();
  }

  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser }}>
        {showHeader ? <Header loggedIn={loggedIn} /> : null}

        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Movies}
                  movies={movies}
                  savedMovies={savedMovies}
                  onSaveMovie={handleSaveMovies}
                  onDeleteMovie={handleDeleteMovie}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={SavedMovies}
                  savedMovies={savedMovies}
                  onDeleteMovie={handleDeleteMovie}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Profile}
                  onSignOut={handleSignOut}
                  onEditUserInfo={handleEditUserInfo}
                  isResOk={isResOk}
                />
              }
            />

            <Route path="/signup" element={<Register onRegister={handleRegister} />} />
            <Route path="/signin" element={<Login onAuthoriz={handleAutorization} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {showFooter ? <Footer /> : null}
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
