import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='container'>
        <h3 className='section__title section__title_portfolio'>Портфолио</h3>

        <a href="#scsc" className='portfolio__link' target='blank'>Статичный сайт</a>
        <div className='line line_portfolio'></div>
        <a href="#scsc" className='portfolio__link' target='blank'>Адаптивный сайт</a>
        <div className='line line_portfolio'></div>
        <a href="#scsc" className='portfolio__link' target='blank'>Одностраничное приложение</a>
        <div className='line line_portfolio'></div>
      </div>
    </section>
  )
}

export default Portfolio;