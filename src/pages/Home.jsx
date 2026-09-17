import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../services/omdbApi";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import ErrorMessage from "../components/ErrorMessage";

const renderSkeletons = () => {
  return (
    <div className="movie-grid">
      {Array.from({ length: 4 }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
};
const Home = () => {
  const [search, setSearch] = useState("");

  const [popularMovies, setPopularMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const [popular, action, comedy] =
          await Promise.all([
            searchMovies("Avengers"),
            searchMovies("Mission Impossible"),
            searchMovies("Comedy"),
          ]);

        setPopularMovies(popular);
        setActionMovies(action);
        setComedyMovies(comedy);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!search.trim()) return;

    navigate(
      `/search?query=${encodeURIComponent(search.trim())}`
    );
  };

const renderMovies = (movies) => {
  if (!Array.isArray(movies)) {
    return null;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </div>
  );
};

  return (
    <section className="home">
      <div className="home__hero">
        <div className="home__content">
          <p className="home__eyebrow">
            WELCOME TO CINEVAULT
          </p>

          <h1 className="home__title">
            Discover your next
            <span> favorite movie.</span>
          </h1>

          <p className="home__description">
            Search thousands of movies, explore ratings, and
            find something worth watching tonight.
          </p>

          <form
            className="home__search"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search for a movie..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            <button type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

{loading && renderSkeletons()}

{error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <section className="home__section">
            <h2>Popular Movies</h2>
            {renderMovies(popularMovies)}
          </section>

          <section className="home__section">
            <h2>Action Movies</h2>
            {renderMovies(actionMovies)}
          </section>

          <section className="home__section">
            <h2>Comedy Movies</h2>
            {renderMovies(comedyMovies)}
          </section>
        </>
      )}
    </section>
  );
};

export default Home;