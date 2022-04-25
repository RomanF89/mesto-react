import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function Card(props) {

  const currentUserInfo = React.useContext(CurrentUserContext);

  const isOwn = props.owner._id === currentUserInfo._id;
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
  );

  const isLiked = props.likes.some(i => i._id === currentUserInfo._id);
  const cardLikeButtonClassName = `element__like
    ${isLiked ? 'element__like_active' : 'element__like_non-active'}`;

  function handleClick() {
    props.onCardClick(props.link, props.name)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteCardClick() {
    props.onCardDelete(props.card)
  }

  return (
    <article className="element">
      <button type="button" className={cardDeleteButtonClassName} aria-label="Удалить карточку" onClick={handleDeleteCardClick} ></button>
      <img className="element__mask-group" src={props.link} alt="Картинка" onClick={handleClick} />
      <div className="element__group">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__like-area">
          <button type="button" className={cardLikeButtonClassName} aria-label="Поставить лайк" onClick={handleLikeClick} ></button>
          <span className="element__like-count" aria-label="Количество лайков">{props.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;
