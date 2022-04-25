import React from "react";
import { api } from "../../utils/Api";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const currentUserInfo = React.useContext(CurrentUserContext);

  const getProfileInfo = () => {
    setUserName(currentUserInfo.name);
    setUserDescription(currentUserInfo.about);
    setUserAvatar(currentUserInfo.avatar);
  }

  React.useEffect(() => {
    getProfileInfo()
  }, [currentUserInfo])



  return (

    <main className="content">

      <section className="profile">
        <div onClick={props.onEditAvatar} className="profile__avatar-container">
          <img className="profile__avatar" src={userAvatar} alt="Аватар профиля" />
          <div className="profile__overlay">
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__titles">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__description">{userDescription}</p>
          </div>
          <button onClick={props.onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать профиль"></button>
        </div>

        <button onClick={props.onAddPlace} className="profile__add-button" type="button" aria-label="Добавить элемент"></button>
      </section>

      <section className="elements">
        {
          props.cards.map(item => (<Card card={item} owner={item.owner} link={item.link} likes={item.likes} name={item.name} key={item._id}
            onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)
          )
        }
      </section>

    </main>
  )
}

export default Main;
