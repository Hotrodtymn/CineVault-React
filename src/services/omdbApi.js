const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const API_URL = "https://www.omdbapi.com/";

const request = async (params) => {
  const url = new URL(API_URL);

  url.searchParams.set("apikey", API_KEY);

  Object.entries(params).forEach(
    ([key, value]) => {
      url.searchParams.set(key, value);
    }
  );

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.Response === "False") {
    throw new Error(
      data.Error || "Something went wrong with the OMDb API."
    );
  }

  return data;
};

export const searchMovies = async (
  query,
  page = 1
) => {
  const data = await request({
    s: query,
    type: "movie",
    page,
  });

  return {
    movies: data.Search || [],
    totalResults:
      Number(data.totalResults) || 0,
  };
};

export const getMovie = async (imdbId) => {
  return request({
    i: imdbId,
    plot: "full",
  });
};