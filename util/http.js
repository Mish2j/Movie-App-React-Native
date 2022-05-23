import axios from "axios";

import {
  POPULAR_MOVIES,
  SEARCH_MOVIE,
  TOP_RATED_MOVIES,
  UPCOMING_MOVIES,
  MOVIE_WITH_GENRE,
} from "../constants/config";

export const getPopularMovies = async () => {
  const response = await axios.get(POPULAR_MOVIES);
  return response.data.results;
};

// export const getLatesMovies = async () => {
//   const response = await axios.get(LATEST_MOVIES);
//   return response.data.results;
// };

export const getTopRatedMovies = async () => {
  const response = await axios.get(TOP_RATED_MOVIES);
  return response.data.results;
};

export const getUpcomingMovies = async () => {
  const response = await axios.get(UPCOMING_MOVIES);
  return response.data.results;
};

export const getSearchedMovie = async (movieName) => {
  const response = await axios.get(`${SEARCH_MOVIE}${movieName}`);
  return response.data.results;
};

export const getFilteredMovies = async (categoryId) => {
  const response = await axios.get(`${MOVIE_WITH_GENRE}${categoryId}`);
  return response.data.results;
};
