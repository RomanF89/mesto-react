import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import { click } from '@testing-library/user-event/dist/click';

function App() {

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ cardOpened: false, cardLink: '', cardName: '' });


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ ...selectedCard, cardOpened: false });

  }

  const handleCardClick = (link, name) => {
    setSelectedCard({ ...selectedCard, cardOpened: true, cardLink: link, cardName: name });
  }


  return (

    <div className="page">

      <Header/>

      <Main onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick} ></Main>

      <Footer/>

      <ImagePopup card={selectedCard.cardOpened} link={selectedCard.cardLink} name={selectedCard.cardName} onClose={closeAllPopups} ></ImagePopup>

      <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen ? 'popup_opened' : ''}
        onClose={closeAllPopups} submitButtonText ="Сохранить" >
        <fieldset className="popup__field-container">
          <input id="user-name" name="name" type="text" className="popup__field popup__field_type_name" placeholder="Имя"
            required minLength="2" maxLength="40" />
          <span id="user-name-error" className="popup__error-message popup__error-message_visible"></span>
          <input id="user-description" name="description" type="text" className="popup__field popup__field_type_description"
            required minLength="2" maxLength="200" placeholder="Описание" />
          <span id="user-description-error" className="popup__error-message popup__error-message_visible"></span>
        </fieldset>
      </PopupWithForm>


      <PopupWithForm name="add-card" title="Новое место" isOpen={isAddPlacePopupOpen ? 'popup_opened' : ''}
      onClose={closeAllPopups} submitButtonText ="Сохранить">
        <fieldset className="popup__field-container">
          <input id="card-name" name="name" type="text" className="popup__field popup__field_type_card-name"
            placeholder="Название" required minLength="2" maxLength="30" />
          <span id="card-name-error" className="popup__error-message popup__error-message_visible"></span>
          <input id="card-description" name="description" type="url" className="popup__field popup__field_type_card-link"
            placeholder="Ссылка на картинку" required />
          <span id="card-description-error" className="popup__error-message popup__error-message_visible"></span>
        </fieldset>
      </PopupWithForm>


      <PopupWithForm name="delete-submit" title="Вы уверены?" submitButtonText ="Да"></PopupWithForm>



      <PopupWithForm name="change-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen ? 'popup_opened' : ''}
      onClose={closeAllPopups} submitButtonText ="Сохранить" >
        <fieldset className="popup__field-container">
          <input id="avatar-link" name="link" type="url" className="popup__field popup__field_type_change-avatar"
            placeholder="Ссылка на картинку" required />
          <span id="avatar-link-error" className="popup__error-message popup__error-message_visible"></span>
        </fieldset>
      </PopupWithForm>

    </div>
  );
}

export default App;
