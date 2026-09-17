import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../services/omdbApi";

const Search = () => {
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");

    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const results = await searchMovies(query);

        setMovies(results);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [location.search]);

  const params = new URLSearchParams(location.search);
  const query = params.get("query");

  return (
    <section className="search-page">
      <h1>
        Search results
        {query && ` for "${query}"`}
      </h1>

      {loading && (
        <p className="search-page__message">
          Searching for movies...
        </p>
      )}

      {error && (
        <p className="search-page__error">
          {error}
        </p>
      )}

      {!loading && !error && movies.length === 0 && query && (
        <p className="search-page__message">
          No movies found.
        </p>
      )}

      {!loading && movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <article
              className="movie-card"
              key={movie.imdbID}
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={movie.Title}
                className="movie-card__poster"
              />

              <div className="movie-card__info">
                <h2>{movie.Title}</h2>

                <p>
                  {movie.Year} · {movie.Type}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Search;