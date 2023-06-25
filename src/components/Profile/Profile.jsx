import { Link } from 'react-router-dom';

import './Profile.css';

function Profile({ userData, onSignOut }) {
  return (
    <section className="profile">
      <div className="container">
        <h3 className="profile__title">{`Привет, ${userData.name}!`}</h3>
        <form className="profile__form" noValidate>
          <div className="profile__input-wrapper">
            <label htmlFor="name" className="profile__label">
              Имя
            </label>
            <input
              className="profile__input"
              name="name"
              id="name"
              type="text"
              required
              minLength="2"
              maxLength="40"
              defaultValue={userData.name || ''}
            />
          </div>

          <div className="line line_form"></div>

          <div className="profile__input-wrapper">
            <label htmlFor="email" className="profile__label">
              E-mail
            </label>
            <input
              className="profile__input"
              type="email"
              name="email"
              id="email"
              required
              minLength="2"
              maxLength="40"
              defaultValue={userData.email || ''}
            />
          </div>

          <button className="profile__edit">Редактировать</button>

          <Link className="profile__exit" onClick={onSignOut}>
            Выйти из аккаунта
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Profile;
