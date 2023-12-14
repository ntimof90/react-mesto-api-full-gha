import React from "react";
import logoPath from '../images/header-logo.svg';

export default function Header() {
  return (
      <header className="header content-section">
        <img src={logoPath} alt="Лого." className="header__logo" />
      </header>
  )
}
