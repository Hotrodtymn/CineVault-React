import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  addToWatchlist,
  isInWatchlist,
  removeFromWatchlist,
} from "../utils/watchlist";
import { PLACEHOLDER_POSTER } from "../constants";

const MovieCard = ({ movie }) => {
  const location = useLocation();

  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    setInWatchlist(isInWatchlist(movie.imdbID));
  }, [movie.imdbID]);

  const handleWatchlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (inWatchlist) {
      removeFromWatchlist(movie.imdbID);
      setInWatchlist(false);
    } else {
      addToWatchlist(movie);
      setInWatchlist(true);
    }
  };

  const currentLocation =
    location.pathname + location.search;

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      state={{
        from: currentLocation,
      }}
      className="movie-card"
    >
      <div className="movie-card__image-wrapper">
        <img
  src={
    movie.Poster !== "N/A"
      ? movie.Poster
      : PLACEHOLDER_POSTER
  }
  alt={movie.Title}
  className="movie-card__poster"
  loading="lazy"
/>

        <button
          type="button"
          className={`movie-card__watchlist ${
            inWatchlist
              ? "movie-card__watchlist--active"
              : ""
          }`}
          onClick={handleWatchlist}
          aria-label={
            inWatchlist
              ? "Remove from watchlist"
              : "Add to watchlist"
          }
        >
          {inWatchlist ? "♥" : "♡"}
        </button>
      </div>

      <div className="movie-card__info">
        <h2>{movie.Title}</h2>

        <p>
          {movie.Year} · {movie.Type}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;