import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
      <main className="content content-section">
        <section className="profile">
          <div className="profile__avatar-wrapper">
            <img src={currentUser.avatar} alt="Аватар." className="profile__avatar" />
            <button className="profile__avatar-button" onClick={onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="btn profile__edit-btn" onClick={onEditProfile}></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button type="button" className="btn profile__add-btn" onClick={onAddPlace}></button>
        </section>
        <section className="elements" aria-label="Секция со статьями">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
  )
}
