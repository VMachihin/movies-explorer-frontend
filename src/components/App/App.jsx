import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Main from '../Main/Main.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile.jsx';

import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';

import Preloader from '../Preloader/Preloader.jsx';

import NotFound from '../NotFound/NotFound.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

import ProtectedRouteElement from '../../utils/ProtectedRoute.jsx';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  const location = useLocation();
  const showHeader =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies' ||
    location.pathname === '/profile';

  const showFooter = location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies';

  const [loggedIn, setloggedIn] = React.useState(false);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        {showHeader ? <Header loggedIn={loggedIn} /> : null}

        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={<ProtectedRouteElement element={<Movies />} />} />
            <Route path="/saved-movies" element={<ProtectedRouteElement element={<SavedMovies />} />} />
            <Route path="/profile" element={<ProtectedRouteElement element={<Profile />} />} />

            <Route path="/sign-up" element={<Register />} />
            <Route path="/sign-in" element={<Login />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {showFooter ? <Footer /> : null}
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
