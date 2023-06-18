import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search">
      <div className="container">
        <form className="search__wrapper">
          <input type='search' id='search' placeholder='Фильм' className="search__input" required />
          <button type='submit' className='search__btn' />
        </form>

        <FilterCheckbox />
      </div>
    </section>
  )
}

export default SearchForm;