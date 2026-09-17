import React from "react";

const MovieCardSkeleton = () => {
  return (
    <div className="movie-card movie-card--skeleton">
      <div className="movie-card__poster skeleton"></div>

      <div className="movie-card__info">
        <div className="skeleton skeleton--title"></div>
        <div className="skeleton skeleton--text"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;