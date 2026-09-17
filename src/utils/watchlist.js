const WATCHLIST_KEY = "cinevault_watchlist";

export const getWatchlist = () => {
  const savedWatchlist =
    localStorage.getItem(WATCHLIST_KEY);

  if (!savedWatchlist) {
    return [];
  }

  try {
    const parsedWatchlist =
      JSON.parse(savedWatchlist);

    return Array.isArray(parsedWatchlist)
      ? parsedWatchlist
      : [];
  } catch (error) {
    console.error(
      "Unable to read watchlist:",
      error
    );

    return [];
  }
};

export const saveWatchlist = (watchlist) => {
  localStorage.setItem(
    WATCHLIST_KEY,
    JSON.stringify(watchlist)
  );

  window.dispatchEvent(
    new Event("watchlistUpdated")
  );
};

export const isInWatchlist = (imdbID) => {
  const watchlist = getWatchlist();

  return watchlist.some(
    (movie) => movie.imdbID === imdbID
  );
};

export const addToWatchlist = (movie) => {
  const watchlist = getWatchlist();

  if (isInWatchlist(movie.imdbID)) {
    return watchlist;
  }

  const updatedWatchlist = [
    ...watchlist,
    movie,
  ];

  saveWatchlist(updatedWatchlist);

  return updatedWatchlist;
};

export const removeFromWatchlist = (imdbID) => {
  const watchlist = getWatchlist();

  const updatedWatchlist = watchlist.filter(
    (movie) => movie.imdbID !== imdbID
  );

  saveWatchlist(updatedWatchlist);

  return updatedWatchlist;
};