import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/" className="nav__logo">
          CineVault
        </Link>

        <div className="nav__links">
          <Link to="/" className="nav__link">
            Home
          </Link>

          <Link to="/search" className="nav__link">
            Movies
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;