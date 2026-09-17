const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

console.log("API key loaded:", !!API_KEY);
console.log("API key length:", API_KEY?.length);
console.log(
  "API key starts with:",
  API_KEY?.substring(0, 3)
);
console.log("OMDb API key loaded:", !!API_KEY);

const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {
  const url = new URL(BASE_URL);

  url.searchParams.set("apikey", API_KEY);
  url.searchParams.set("s", query);
  url.searchParams.set("type", "movie");

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.Response === "False") {
    throw new Error(
      data.Error || "Unable to search for movies."
    );
  }

  return data.Search || [];
};

export const getMovie = async (imdbId) => {
  const url = new URL(BASE_URL);

  url.searchParams.set("apikey", API_KEY);
  url.searchParams.set("i", imdbId);
  url.searchParams.set("plot", "full");

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.Response === "False") {
    throw new Error(
      data.Error || "Unable to find movie."
    );
  }

  return data;
};