import React from "react";

export default function Popup({children, onClose, isOpen, name}) {
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }
  return (
    <div onMouseDown={handleOverlayClick} className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      {children}
    </div>
  )
}
