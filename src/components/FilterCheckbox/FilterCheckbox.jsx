import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className='checkbox'>
      <input type='checkbox' className='checkbox__filter' id='checkbox__filter' name='search__filter'></input>
      <label htmlFor='checkbox__filter' className='checkbox__label' />
      <span className='checkbox__text'>Короткометражки</span>
    </div>
  )
}

export default FilterCheckbox;