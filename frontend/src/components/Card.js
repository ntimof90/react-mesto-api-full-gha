import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      {isOwn && <button type="button" className="btn element__del-btn" onClick={handleDeleteClick}></button>}
      <img
        src={card.link}
        alt={card.name}
        className="element__photo"
        onClick={handleClick}
      />
      <div className="element__footer">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-wrapper">
          <button
          type="button"
          className={`element__like-btn ${isLiked ? 'element__like-btn_active' : ''}`}
          onClick={handleLikeClick}
          >
          </button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}
