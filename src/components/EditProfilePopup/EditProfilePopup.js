import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen]);

  return (
    <PopupWithForm onSubmit={handleSubmit} name="edit" title="Редактировать профиль" isOpen={props.isOpen ? 'popup_opened' : ''}
      onClose={props.onClose} submitButtonText="Сохранить" >
      <fieldset className="popup__field-container">
        <input id="user-name" name="name" type="text" className="popup__field popup__field_type_name" placeholder="Имя"
          required minLength="2" maxLength="40" value={name || " "} onChange={handleChangeName} />
        <span id="user-name-error" className="popup__error-message popup__error-message_visible"></span>
        <input id="user-description" name="description" type="text" className="popup__field popup__field_type_description"
          required minLength="2" maxLength="200" placeholder="Описание" value={description || " "} onChange={handleChangeDescription} />
        <span id="user-description-error" className="popup__error-message popup__error-message_visible"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
