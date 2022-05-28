import axios from "axios";

import {
  POPULAR_MOVIES,
  SEARCH_MOVIE,
  TOP_RATED_MOVIES,
  UPCOMING_MOVIES,
  MOVIE_WITH_GENRE,
  MOVIE_DETAIL_BASE,
  MOVIE_DETAIL_QUERY,
  AUTH_SIGNIN,
  AUTH_SIGNUP,
} from "../constants/config";

const fetchData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const getPopularMovies = async () => {
  const { results } = await fetchData(POPULAR_MOVIES);
  return results;
};

export const getTopRatedMovies = async () => {
  const { results } = await fetchData(TOP_RATED_MOVIES);
  return results;
};

export const getUpcomingMovies = async () => {
  const { results } = await fetchData(UPCOMING_MOVIES);
  return results;
};

export const getSearchedMovie = async (movieName) => {
  const { results } = await fetchData(`${SEARCH_MOVIE}${movieName}`);
  return results;
};

export const getFilteredMovies = async (categoryId) => {
  const { results } = await fetchData(`${MOVIE_WITH_GENRE}${categoryId}`);
  return results;
};

export const getMovieDetails = async (movieId) => {
  return await fetchData(`${MOVIE_DETAIL_BASE}${movieId}${MOVIE_DETAIL_QUERY}`);
};

export const createUser = async (email, password) => {
  const response = await axios.post(AUTH_SIGNUP, {
    email,
    password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  // console.log(response.data);
  return token;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(AUTH_SIGNIN, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  console.log(response.data);
  return token;
};
