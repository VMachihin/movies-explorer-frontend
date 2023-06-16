import './AboutProject.css'

function AboutProject() {
  return (
    <section className="aboutProject">
      <div className="container">
        <h2 className="section__title">О&nbsp;проекте</h2>
        <div className='line'></div>

        <ul className='aboutProject__list'>
          <li className='aboutProject__item'>
            <h3 className='aboutProject__title'>Дипломный проект включал 5&nbsp;этапов</h3>
            <p className='aboutProject__subTitle'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
          </li>
          <li>
            <h3 className='aboutProject__title'>На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
            <p className='aboutProject__subTitle'>У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>

        <div className='aboutProject__stat'>
          <div className='back__info'>
            <div className='back'>
              <span className='text'>1 неделя</span>
            </div>
            <span className='text'>Back-end</span>
          </div>
          <div className='front__info'>
            <div className='front'>
              <span className='text'>4 недели</span>
            </div>
            <span className='text'>Front-end</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;