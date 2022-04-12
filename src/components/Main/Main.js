import React from "react";
import { api } from "../../utils/Api";
import Card from "../Card/Card";

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  const getProfileInfo = () => {
    api.getProfile()
      .then(res => {
        setUserName(res.name)
        setUserDescription(res.about)
        setUserAvatar(res.avatar)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getCardsFromRequest = () => {
    api.getCards()
      .then((res) => {
        setCards(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    getProfileInfo()
  }, [])

  React.useEffect(() => {
    getCardsFromRequest()
  }, [])

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
        cards.map(item => (<Card link={item.link} likes={item.likes} name={item.name} key={item._id}
          onCardClick={props.onCardClick} />)
        )
      }
    </section>

  </main>)
}

export default Main;
