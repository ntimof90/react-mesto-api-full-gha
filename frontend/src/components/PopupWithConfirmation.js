import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function PopupWithConfirmation({onClose, onDeleteConfirmation, card, isLoading}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteConfirmation(card);
  }

  return (
    <PopupWithForm
      name={'delete'}
      title={'Вы уверерены?'}
      buttonText={isLoading ? 'Подождите...' : 'Да'}
      isOpen={card._id && true}
      onClose={onClose}
      onSubmit={handleSubmit}
      isInvalid={false}
    />
  )
}
