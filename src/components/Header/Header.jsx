import logo from '../../images/logo/main_logo.svg';

import useResize from '../../hooks/useResize';

import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Header({ loggedIn }) {
  const resize = useResize();

  return (
    <header className={`header ${loggedIn && `header_loggedIn`}`}>
      <div className="container">
        <div className="header__wrapper">
          <img src={logo} alt='главный логотип' className="main-logo" />

          {resize.width <= 768 ? <BurgerMenu loggedIn={loggedIn} /> : <Navigation loggedIn={loggedIn} />}
        </div>
      </div>
    </header >
  )
}

export default Header;