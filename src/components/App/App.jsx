import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

import Register from '../Register/Register';
import Login from '../Login/Login';

import Preloader from '../Preloader/Preloader';

import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { register, authorization, checkToken, getUserInfo, editingProfile } from '../../utils/MainApi';
import { getAllMovies } from '../../utils/MoviesApi';

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

  function handleRegister(name, email, password) {
    register(name, email, password)
      .then((res) => {
        navigate('/signin', { replace: true });
      })
      .catch(console.error);
  }

  function handleAutorization(email, password) {
    authorization(email, password)
      .then((data) => {
        console.log(data.token);
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          console.log(localStorage.getItem('token'));
          setloggedIn(true);
          navigate('/', { replace: true });
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
            navigate('/', { replace: true });
            // setUserEmail(res.email);
          }
        })
        .catch(console.error);
    }
  }, []);

  React.useEffect(() => {
    loggedIn &&
      Promise.all([getUserInfo(), getAllMovies()])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData);
          setMovies(moviesData);
        })
        .catch(console.error);
  }, [loggedIn]);

  function handleSignOut() {
    setloggedIn(false);
    localStorage.removeItem('jwt');
    // setUserEmail('');
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        {showHeader ? <Header loggedIn={loggedIn} /> : null}

        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={<ProtectedRouteElement loggedIn={loggedIn} element={Movies} moviesData={movies} />} />
            <Route path="/saved-movies" element={<ProtectedRouteElement loggedIn={loggedIn} element={SavedMovies} />} />
            <Route
              path="/profile"
              element={<ProtectedRouteElement loggedIn={loggedIn} element={Profile} userData={currentUser} onSignOut={handleSignOut} />}
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
