import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            CineVault
          </Link>

          <p>
            Discover movies, explore ratings, and build
            your personal watchlist.
          </p>
        </div>

        <div className="footer__links">
          <h3>Explore</h3>

          <Link to="/">Home</Link>
          <Link to="/search">Movies</Link>
          <Link to="/watchlist">Watchlist</Link>
        </div>

        <div className="footer__links">
          <h3>CineVault</h3>

          <a
            href="https://www.omdbapi.com/"
            target="_blank"
            rel="noreferrer"
          >
            OMDb API
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} CineVault. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;