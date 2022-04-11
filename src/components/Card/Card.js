
function Card(props) {

  function handleClick() {
    props.onCardClick(props.link, props.name)
  }

  return <article className="element">
    <button type="button" className="element__delete-button" aria-label="Удалить карточку"></button>
    <img className="element__mask-group" src={props.link} alt="Картинка" onClick = {handleClick} />
    <div className="element__group">
      <h2 className="element__title">{props.name}</h2>
      <div className="element__like-area">
        <button type="button" className="element__like" aria-label="Поставить лайк"></button>
        <span className="element__like-count" aria-label="Количество лайков">{props.likes.length}</span>
      </div>
    </div>
  </article>
}

export default Card;
