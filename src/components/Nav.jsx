import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWatchlist } from "../utils/watchlist";

const Nav = () => {
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateWatchlistCount = () => {
      const watchlist = getWatchlist();

      setWatchlistCount(watchlist.length);
    };

    updateWatchlistCount();

    window.addEventListener(
      "watchlistUpdated",
      updateWatchlistCount
    );

    return () => {
      window.removeEventListener(
        "watchlistUpdated",
        updateWatchlistCount
      );
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="nav">
      <div className="nav__container">
        <Link
          to="/"
          className="nav__logo"
          onClick={closeMenu}
        >
          CineVault
        </Link>

        <button
          type="button"
          className={`nav__menu-button ${
            menuOpen ? "nav__menu-button--open" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          className={`nav__links ${
            menuOpen ? "nav__links--open" : ""
          }`}
        >
          <Link
            to="/"
            className="nav__link"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/search"
            className="nav__link"
            onClick={closeMenu}
          >
            Movies
          </Link>

          <Link
            to="/watchlist"
            className="nav__link"
            onClick={closeMenu}
          >
            Watchlist

            {watchlistCount > 0 && (
              <span className="watchlist-count">
                {watchlistCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;