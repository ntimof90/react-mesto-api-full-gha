import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PopupWithConfirmation from "./PopupWithConfirmation";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [deletingCard, setDeletingCard] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isAddPlaceLoading, setIsAddPlaceLoading] = React.useState(false);
  const [isDeleteCardLoading, setIsDeleteCardLoading] = React.useState(false);
  const [isEditAvatarLoading, setIsEditAvatarLoading] = React.useState(false);
  const [isEditProfileLoading, setIsEditProfileLoading] = React.useState(false);

// КНОПКИ

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // КАРТОЧКИ

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    setDeletingCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    const method = (id) => isLiked ? api.unlikeCard({id}) : api.likeCard({id});
    method(card._id)
      .then(newCard => {
        setCards(state =>
          state.map(item =>
            item._id === card._id ? newCard : item
          )
        );
      })
      .catch(error => {
        console.log(error);
      })
  }

  // ПОПАПЫ

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setDeletingCard({});
  }

  function handleSubmit(request, setIsLoading) {
    setIsLoading(true);
    request()
      .then(() => {
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateUser(data) {
    function makeRequest() {
       return api.editUserInfo(data)
        .then((newUser) => {
          setCurrentUser(newUser);
        })
    }
    handleSubmit(makeRequest, setIsEditProfileLoading);
  }

  function handleUpdateAvatar(data) {
    function makeRequest() {
      return api.editAvatar(data)
        .then((newAvatar) => {
          setCurrentUser(newAvatar);
        });
    }
    handleSubmit(makeRequest, setIsEditAvatarLoading);
  }

  function handleAddCard(data) {
    function makeRequest() {
      return api.addCard(data)
        .then((newCard) => {
          setCards([newCard, ...cards]);
        })
    }
    handleSubmit(makeRequest, setIsAddPlaceLoading);
  }

  function handleCardDeleteConfirmation(card) {
    function makeRequest() {
      return api.deleteCard({id: card._id})
        .then(() => {
          setCards(state =>
            state.filter(item =>
              item._id !== card._id
            )
          );
        })
    }
    handleSubmit(makeRequest, setIsDeleteCardLoading);
  }

  // ПОЛУЧЕНИЕ НАЧАЛЬНЫХ ДАННЫХ

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  // ЗАКРЫТИЕ ПОПАПОВ ЧЕРЕЗ ESC

  React.useEffect(() => {
    function handleEscDown(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isAddPlacePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || selectedCard._id || deletingCard._id) {
      document.addEventListener('keydown', handleEscDown);
    }

    return () => document.removeEventListener('keydown', handleEscDown);
  }, [isAddPlacePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpen, selectedCard, deletingCard]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isEditProfileLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
          isLoading={isAddPlaceLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isEditAvatarLoading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <PopupWithConfirmation
          card={deletingCard}
          onClose={closeAllPopups}
          onDeleteConfirmation={handleCardDeleteConfirmation}
          isLoading={isDeleteCardLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}