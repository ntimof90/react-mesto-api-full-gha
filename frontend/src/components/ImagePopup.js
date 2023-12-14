import React from "react";
import Popup from "./Popup";


export default function ImagePopup({card, onClose}) {

  return (
    <Popup name={'image'} onClose={onClose} isOpen={card._id}>
      <figure className="popup__figure">
        <img
        className="popup__image"
        src={card.link}
        alt={card.name}
        />
        <figcaption className="popup__figcaption">{card.name}</figcaption>
        <button
          type="button"
          className="btn popup__close-btn"
          onClick={onClose}
        ></button>
      </figure>
    </Popup>
  )
}
