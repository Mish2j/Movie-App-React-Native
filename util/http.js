import axios from "axios";

import {
  POPULAR_MOVIES,
  SEARCH_MOVIE,
  TOP_RATED_MOVIES,
  UPCOMING_MOVIES,
  MOVIE_WITH_GENRE,
  MOVIE_DETAIL_PRE,
  MOVIE_DETAIL_POST,
  AUTH_URL,
} from "../constants/config";

const fetchData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const getPopularMovies = async () => {
  return await fetchData(POPULAR_MOVIES).results;
};

export const getTopRatedMovies = async () => {
  return await fetchData(TOP_RATED_MOVIES).results;
};

export const getUpcomingMovies = async () => {
  return await fetchData(UPCOMING_MOVIES).results;
};

export const getSearchedMovie = async (movieName) => {
  return await fetchData(`${SEARCH_MOVIE}${movieName}`).results;
};

export const getFilteredMovies = async (categoryId) => {
  return await fetchData(`${MOVIE_WITH_GENRE}${categoryId}`).results;
};

export const getMovieDetails = async (movieId) => {
  return await fetchData(`${MOVIE_DETAIL_PRE}${movieId}${MOVIE_DETAIL_POST}`);
};

export const createUser = async (email, password) => {
  const response = await axios.post(AUTH_URL, {
    email,
    password,
    returnSecureToken: true,
  });
};
