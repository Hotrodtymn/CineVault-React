import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  const query = params.get("query") || "";
  const pageFromUrl = Number(params.get("page")) || 1;

  const [search, setSearch] = useState(query);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [sort, setSort] = useState("NEWEST");

  useEffect(() => {
    setSearch(query);

    if (!query) {
      setMovies([]);
      setTotalResults(0);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const results = await searchMovies(
          query,
          pageFromUrl
        );

        setMovies(results.movies);
        setTotalResults(results.totalResults);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setMovies([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, pageFromUrl]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedSearch = search.trim();

    if (!trimmedSearch) return;

    navigate(
      `/search?query=${encodeURIComponent(trimmedSearch)}&page=1`
    );
  };

  const handlePreviousPage = () => {
    if (pageFromUrl <= 1) return;

    navigate(
      `/search?query=${encodeURIComponent(query)}&page=${
        pageFromUrl - 1
      }`
    );
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalResults / 10);

    if (pageFromUrl >= totalPages) return;

    navigate(
      `/search?query=${encodeURIComponent(query)}&page=${
        pageFromUrl + 1
      }`
    );
  };

  const sortedMovies = [...movies].sort((a, b) => {
    if (sort === "NEWEST") {
      return Number(b.Year) - Number(a.Year);
    }

    if (sort === "OLDEST") {
      return Number(a.Year) - Number(b.Year);
    }

    if (sort === "TITLE_A_Z") {
      return a.Title.localeCompare(b.Title);
    }

    if (sort === "TITLE_Z_A") {
      return b.Title.localeCompare(a.Title);
    }

    return 0;
  });

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <section className="search-page">
      <form
        className="search-page__search"
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

    <div className="search-page__header">
  <div>
    <h1>
      Search results
      {query && ` for "${query}"`}
    </h1>

    {!loading && !error && query && (
      <p className="search-page__result-count">
        {totalResults} movies found
      </p>
    )}
  </div>
</div>

      {!loading && movies.length > 0 && (
        <div className="search-page__controls">
          <label htmlFor="sort">
            Sort by:
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
          >
            <option value="NEWEST">Newest</option>
            <option value="OLDEST">Oldest</option>
            <option value="TITLE_A_Z">Title A-Z</option>
            <option value="TITLE_Z_A">Title Z-A</option>
          </select>
        </div>
      )}

      {loading && renderSkeletons()}

      {error && <ErrorMessage message={error} />}

      {!loading &&
        !error &&
        movies.length === 0 &&
        query && (
          <p className="search-page__message">
            No movies found.
          </p>
        )}

      {!loading && movies.length > 0 && (
        <div className="movie-grid">
          {sortedMovies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
            />
          ))}
        </div>
      )}

      {!loading && movies.length > 0 && totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={pageFromUrl === 1}
          >
            ← Previous
          </button>

          <span>
            Page {pageFromUrl} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={pageFromUrl >= totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
};

export default Search;