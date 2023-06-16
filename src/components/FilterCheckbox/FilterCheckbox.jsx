import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className='checkbox__wrapper'>
      <input type='checkbox' className='search__filter' id='search__filter' name='search__filter'></input>
      <label htmlFor='search__filter' className='checkbox__label' />
      <span className='search__filter__text'>Короткометражки</span>
    </div>
  )
}

export default FilterCheckbox;