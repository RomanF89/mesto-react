function PopupWithForm(props) {

  return (
  <section className={`popup popup_type_${props.name} ${props.isOpen}`}>
    <div className="popup__container">
      <form name={`popup-form_${props.name}`} onSubmit={props.onSubmit} className="popup__form">
        <button onClick = {props.onClose} className="popup__close-button" type="button" aria-label="Закрыть окно"></button>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button type="submit" className="popup__submit-button" aria-label="Сохранить">{props.submitButtonText}</button>
      </form>
    </div>
  </section>
  )
}

export default PopupWithForm;
