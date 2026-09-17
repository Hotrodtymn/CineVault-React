import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!search.trim()) return;

    navigate(`/search?query=${encodeURIComponent(search.trim())}`);
  };
  return (
    <section className="home">
      <div className="home__hero">
        <div className="home__content">
          <p className="home__eyebrow">WELCOME TO CINEVAULT</p>

          <h1 className="home__title">
            Discover your next
            <span> favorite movie.</span>
          </h1>

          <p className="home__description">
            Search thousands of movies, explore ratings, and find something
            worth watching tonight.
          </p>

          <form className="home__search" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search for a movie..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <button type="submit">Search</button>
          </form>
        </div>
      </div>

      <section className="home__section">
        <h2>Popular Movies</h2>

        <div className="home__placeholder">
          <p>Movies will appear here once we connect the OMDb API.</p>
        </div>
      </section>
    </section>
  );
};

export default Home;
