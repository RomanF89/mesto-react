import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../AvatarEditPopup/EditAvatarPopup';
import {api} from '../../utils/Api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';


function App() {

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ cardOpened: false, cardLink: '', cardName: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // Функции загрузки карточек с API и данных о пользователе

  const getCardsFromRequest = () => {
    api.getCards()
      .then((res) => {
        setCards(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getUserInfo = () => {
    api.getProfile()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Функции лайка карточки и удаления

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then(newCard => {
      setCards(state => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.log(err)
    });
}

  function handleDeleteCard(card) {
    api.deleteCard(card._id)
      .then(setCards(state => state.filter((c) => c._id !== card._id)))
      .catch(err => {
        console.log(err)
      })
  }

// Функции Сабмитов форм

  const handleUpdateUser = (UserData) => {
    api.editProfile(UserData.name, UserData.about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleUpdateAvatar = (UserData) => {
    api.changeProfileAvatar(UserData.avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(cardData) {
    api.addCard(cardData.name, cardData.link)
      .then(newCard =>
        {setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  // Открытие попапа с картчокой

  const handleCardClick = (link, name) => {
    setSelectedCard({ ...selectedCard, cardOpened: true, cardLink: link, cardName: name });
  }

  // Закрытие попапов

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ ...selectedCard, cardOpened: false });
  }


  React.useEffect(() => {
    getUserInfo()
  }, [])

  React.useEffect(() => {
    getCardsFromRequest()
  }, [])

  return (

    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">

      <Header/>

      <Main
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        cards={cards} onCardLike={handleCardLike}
        onCardDelete={handleDeleteCard} >
      </Main>

      <Footer/>

      <ImagePopup
        card={selectedCard.cardOpened}
        link={selectedCard.cardLink}
        name={selectedCard.cardName}
        onClose={closeAllPopups} >
      </ImagePopup>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <PopupWithForm name="delete-submit" title="Вы уверены?" submitButtonText ="Да"></PopupWithForm>

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

    </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
