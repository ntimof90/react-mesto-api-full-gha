import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
  const [form, setForm] = React.useState({name: '', link: ''});
  const [errors, setErrors] = React.useState({});

  function handleChange(evt) {
    function checkInputValidity() {
      if (!evt.target.validity.valid) {
        setErrors({...errors, [evt.target.name]: evt.target.validationMessage});
      } else {
        setErrors({...errors, [evt.target.name]: ''});
      }
    }

    setForm({...form, [evt.target.name]: evt.target.value});
    checkInputValidity();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(form);
  }

  React.useEffect(() => {
    setForm({name: '', link: ''});
    setErrors({});
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'add'}
      title={'Новое место'}
      buttonText={isLoading ? 'Создание...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isInvalid={(errors.name || errors.link) ?? true}
    >
      <input
      type="text"
      minLength="2"
      maxLength="30"
      name="name"
      id="place-input"
      placeholder="Название"
      required
      className={`popup__form-item popup__form-item_el_title ${errors.name ? 'popup__form-item_invalid' : ''}`}
      onChange={handleChange}
      value={form.name}
      />
      <span className={`popup__form-error place-input-error ${errors.name ? 'popup__form-error_active' : ''}`}>{errors.name}</span>
      <input
      type="url"
      name="link"
      id="image-input"
      placeholder="Ссылка на картинку"
      required
      className={`popup__form-item popup__form-item_el_img ${errors.link ? 'popup__form-item_invalid' : ''}`}
      onChange={handleChange}
      value={form.link}
      />
      <span className={`popup__form-error image-input-error ${errors.link ? 'popup__form-error_active' : ''}`}>{errors.link}</span>
    </PopupWithForm>
  )
}
