import React from "react";
import Popup from "./Popup";

export default function PopupWithForm({name, title, buttonText, children, isOpen, onClose, onSubmit, isInvalid}) {

  return (
      <Popup onClose={onClose} isOpen={isOpen} name={name}>
        <div className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <form
            action=""
            name={`${name}-form`}
            noValidate
            className="popup__form"
            onSubmit={onSubmit}
          >
            {children}
            <button
            type="submit"
            className={`popup__form-submit ${isInvalid ? 'popup__form-submit_inactive' : ''}`}
            disabled={isInvalid}
            >
              {buttonText}
            </button>
          </form>
          <button type="button" className="btn popup__close-btn" onClick={onClose}></button>
        </div>
      </Popup>
  )
}
