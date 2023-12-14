import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const inputRef = React.useRef();
  const [errors, setErrors] = React.useState({});

  function handleChange(evt) {
    function checkInputValidity() {
      if (!evt.target.validity.valid) {
        setErrors({...errors, [evt.target.name]: evt.target.validationMessage});
      } else {
        setErrors({...errors, [evt.target.name]: ''});
      }
    }

    checkInputValidity();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({avatar: inputRef.current.value})
  }

  React.useEffect(() => {
    inputRef.current.value = '';
    setErrors({});
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isInvalid={errors.avatar ?? true}
    >
      <input
      onChange={handleChange}
      type="url"
      name="avatar"
      id="avatar-input"
      placeholder="Ссылка на новый аватар"
      required
      className={`popup__form-item popup__form-item_el_avatar ${errors.link ? 'popup__form-item_invalid' : ''}`}
      ref={inputRef}
      />
      <span className={`popup__form-error avatar-input-error ${errors.avatar ? 'popup__form-error_active' : ''}`}>{errors.avatar}</span>
    </PopupWithForm>
  )
}
