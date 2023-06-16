import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Profile from "../Profile/Profile";
import useResize from "../../hooks/useResize";

import './Navigation.css';

function Navigation({ loggedIn, toggleBurger }) {
  const location = useLocation();
  const moviesPath = location.pathname === '/movies';
  const savedMoviesPath = location.pathname === '/saved-movies';

  const resize = useResize();
  const widthPoint = resize.width <= 768;

  const activeStyleLink = widthPoint ? 'nav__link-movies_burger-active' : 'nav__link-movies_active';

  return (
    <>
      {
        !loggedIn ?
          <div className="nav__auth">
            <Link to="/sign-up" className="nav__register-link">
              Регистрация
            </Link>

            <Link to="/sign-in" className="nav__login-link">
              Войти
            </Link>
          </div> :
          <div className={`nav__movies ${widthPoint ? `nav__movies_burger` : ''}`}>
            <div className={`nav__wrapper ${widthPoint ? `nav__wrapper_burger` : ''}`}>

              {widthPoint && <Link className="nav__link-main" to="/" onClick={toggleBurger}>Главная</Link>}

              <Link to="/movies" className={`nav__link-movies ${widthPoint ? `nav__link-movies_burger` : ''} ${moviesPath ? `${activeStyleLink}` : ''}`} onClick={toggleBurger}>
                Фильмы
              </Link>

              <Link to="/saved-movies" className={`nav__link-movies ${widthPoint ? `nav__link-movies_burger` : ''} ${savedMoviesPath ? `${activeStyleLink}` : ''}`} onClick={toggleBurger}>
                Сохранённые фильмы
              </Link>

            </div >

            <div className={`profile-link ${widthPoint ? `profile-link_burger` : ''}`}>
              <span className="profile-link__text">Аккаунт</span>

              <Link to="/profile" element={<Profile />} className="navigation__profile" />
            </div>
          </div >
      }
    </>
  )
}

export default Navigation;