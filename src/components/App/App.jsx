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

import NotFound from "../NotFound/NotFound.jsx";
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

function App() {
  const location = useLocation();
  const showHeader =
    location.pathname === '/'
    || location.pathname === '/movies'
    || location.pathname === '/saved-movies'
    || location.pathname === '/profile';

  const showFooter = location.pathname === '/'
    || location.pathname === '/movies'
    || location.pathname === '/saved-movies'

  const [loggedIn, setloggedIn] = React.useState(false);

  return (
    <>

      {showHeader ? <Header loggedIn={loggedIn} /> : null}

      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />

          <Route path='/sign-up' element={<Register />} />
          <Route path='/sign-in' element={<Login />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

      {showFooter ? <Footer /> : null}
    </>
  );
}

export default App;
