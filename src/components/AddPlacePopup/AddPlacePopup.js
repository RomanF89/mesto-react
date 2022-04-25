import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup(props) {

  const cardNameRef = React.useRef('');
  const cardLinkRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value
    });
  }

  React.useEffect(() => {
    cardNameRef.current.form.reset();
  }, [props.isOpen]);

  return (

    <PopupWithForm onSubmit={handleSubmit} name="add-card" title="Новое место" isOpen={props.isOpen ? 'popup_opened' : ''}
      onClose={props.onClose} submitButtonText="Сохранить">
      <fieldset className="popup__field-container">
        <input id="card-name" name="name" ref={cardNameRef} type="text" className="popup__field popup__field_type_card-name"
          placeholder="Название" required minLength="2" maxLength="30" />
        <span id="card-name-error" className="popup__error-message popup__error-message_visible"></span>
        <input id="card-description" name="description" ref={cardLinkRef} type="url" className="popup__field popup__field_type_card-link"
          placeholder="Ссылка на картинку" required />
        <span id="card-description-error" className="popup__error-message popup__error-message_visible"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
