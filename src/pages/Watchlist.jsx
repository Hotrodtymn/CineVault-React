import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import {
  getWatchlist,
  removeFromWatchlist,
} from "../utils/watchlist";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const handleRemove = (imdbID) => {
    const updatedWatchlist =
      removeFromWatchlist(imdbID);

    setWatchlist(updatedWatchlist);
  };

  return (
    <section className="watchlist-page">
      <div className="watchlist-page__header">
        <h1>My Watchlist</h1>

        <p>
          {watchlist.length}{" "}
          {watchlist.length === 1
            ? "movie"
            : "movies"}
        </p>
      </div>

      {watchlist.length === 0 ? (
        <div className="watchlist-page__empty">
          <h2>Your watchlist is empty</h2>

          <p>
            Add movies to your watchlist and
            they'll appear here.
          </p>
        </div>
      ) : (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <div
              className="watchlist-card"
              key={movie.imdbID}
            >
              <MovieCard movie={movie} />

              <button
                type="button"
                className="watchlist-card__remove"
                onClick={() =>
                  handleRemove(movie.imdbID)
                }
              >
                Remove from Watchlist
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Watchlist;