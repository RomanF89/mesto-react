
function ImagePopup(props) {
  return  <section className={`popup popup_type_image ${props.card && 'popup_opened'}`}>
  <div className="popup__container">
    <button className="popup__close-button" onClick = {props.onClose} type="button" aria-label="Закрыть окно"></button>
    <figure className="popup__image-figure">
      <img className="popup__image" src={props.link} alt="Картинка"/>
      <figcaption className="popup__image-caption">{props.name}</figcaption>
    </figure>
  </div>
</section>
}
export default ImagePopup;
