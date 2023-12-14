import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [form, setForm] = React.useState({name: '', job: ''});
  const [errors, setErrors] = React.useState({});

  function handleChange(evt) {
    function checkInputValidity() {
      if (!evt.target.validity.valid) {
        setErrors({...errors, [evt.target.name]: evt.target.validationMessage});
      } else {
        setErrors({...errors, [evt.target.name]: ''});
      }
    }

    setForm({ ...form, [evt.target.name]: evt.target.value });
    checkInputValidity();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({name: form.name, about: form.job});
  }

  React.useEffect(() => {
    setForm({name: currentUser.name, job: currentUser.about});
    setErrors({});
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name={'edit'}
      title={'Редактировать профиль'}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isInvalid={(errors.name || errors.job) ?? false}
    >
      <input
      type="text"
      name="name"
      id="name-input"
      minLength="2"
      maxLength="40"
      placeholder="Имя"
      required
      className={`popup__form-item popup__form-item_el_title ${errors.name ? 'popup__form-item_invalid' : ''}`}
      onChange={handleChange}
      value={form.name ?? ''}
      />
      <span className={`popup__form-error name-input-error ${errors.name ? 'popup__form-error_active' : ''}`}>{errors.name}</span>
      <input
      type="text"
      name="job"
      id="job-input"
      minLength="2"
      maxLength="200"
      placeholder="Вид деятельности"
      required
      className={`popup__form-item popup__form-item_el_subtitle ${errors.job ? 'popup__form-item_invalid' : ''}`}
      onChange={handleChange}
      value={form.job ?? ''}
      />
      <span className={`popup__form-error job-input-error ${errors.job ? 'popup__form-error_active' : ''}`}>{errors.job}</span>
    </PopupWithForm>
  )
}
