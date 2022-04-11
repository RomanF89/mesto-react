function PopupWithForm(props) {

  return <section className={`popup popup_type_${props.name} ${props.isOpen}`}>
    <div className="popup__container">
      <form name={`popup-form_${props.name}`} className="popup__form">
        <button onClick = {props.onClose} className="popup__close-button" type="button" aria-label="Закрыть окно"></button>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
      </form>
    </div>
  </section>

}

export default PopupWithForm;
