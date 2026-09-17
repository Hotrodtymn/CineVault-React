import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovie } from "../services/omdbApi";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import {
  addToWatchlist,
  isInWatchlist,
  removeFromWatchlist,
} from "../utils/watchlist";
import { PLACEHOLDER_POSTER } from "../constants";

const Movie = () => {
  const { id } = useParams();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getMovie(id);

        setMovie(result);
        setInWatchlist(isInWatchlist(result.imdbID));
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleWatchlist = () => {
    if (!movie) return;

    if (inWatchlist) {
      removeFromWatchlist(movie.imdbID);
      setInWatchlist(false);
    } else {
      addToWatchlist(movie);
      setInWatchlist(true);
    }
  };

  if (loading) {
    return (
      <section className="movie-page">
        <Loading message="Loading movie..." />
      </section>
    );
  }

  if (error) {
    return (
      <section className="movie-page">
        <ErrorMessage message={error} />

        <Link
          to={location.state?.from || "/search"}
          className="movie-page__back"
        >
          ← Back to search
        </Link>
      </section>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <section className="movie-page">
      <Link
        to={location.state?.from || "/search"}
        className="movie-page__back"
      >
        ← Back to search
      </Link>

      <div className="movie-page__content">
        <div className="movie-page__poster">
          <img
           src={
  movie.Poster !== "N/A"
    ? movie.Poster
    : PLACEHOLDER_POSTER
}
            alt={movie.Title}
          />
        </div>

        <div className="movie-page__info">
          <h1>{movie.Title}</h1>

          <p className="movie-page__meta">
            {movie.Year} · {movie.Runtime} · {movie.Genre}
          </p>

          <button
            className={`watchlist-button ${
              inWatchlist
                ? "watchlist-button--remove"
                : ""
            }`}
            onClick={handleWatchlist}
          >
            {inWatchlist
              ? "✓ Remove from Watchlist"
              : "+ Add to Watchlist"}
          </button>

          <div className="movie-page__ratings">
            <div className="movie-rating">
              <span className="movie-rating__label">
                IMDb
              </span>

              <span className="movie-rating__value">
                ⭐ {movie.imdbRating}
              </span>
            </div>

            <div className="movie-rating">
              <span className="movie-rating__label">
                Metascore
              </span>

              <span className="movie-rating__value">
                {movie.Metascore}
              </span>
            </div>
          </div>

          <p className="movie-page__plot">
            {movie.Plot}
          </p>

          <div className="movie-page__details">
            <div className="movie-detail">
              <span>Director</span>
              <strong>{movie.Director}</strong>
            </div>

            <div className="movie-detail">
              <span>Actors</span>
              <strong>{movie.Actors}</strong>
            </div>

            <div className="movie-detail">
              <span>Released</span>
              <strong>{movie.Released}</strong>
            </div>

            <div className="movie-detail">
              <span>Rated</span>
              <strong>{movie.Rated}</strong>
            </div>

            <div className="movie-detail">
              <span>Language</span>
              <strong>{movie.Language}</strong>
            </div>

            <div className="movie-detail">
              <span>Country</span>
              <strong>{movie.Country}</strong>
            </div>

            <div className="movie-detail">
              <span>Awards</span>
              <strong>{movie.Awards}</strong>
            </div>
          </div>

          {movie.Ratings &&
            movie.Ratings.length > 0 && (
              <div className="movie-page__external-ratings">
                <h2>Ratings</h2>

                {movie.Ratings.map((rating) => (
                  <div
                    className="external-rating"
                    key={rating.Source}
                  >
                    <span>{rating.Source}</span>

                    <strong>{rating.Value}</strong>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default Movie;