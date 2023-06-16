import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search">
      <div className="container">
        <div className="search__wrapper">
          <input type='search' id='search' placeholder='Фильм' className="search__input" />
          <button type='submit' className='search__btn' />
        </div>

        <FilterCheckbox />
      </div>
    </section>
  )
}

export default SearchForm;