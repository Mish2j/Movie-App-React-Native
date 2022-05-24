import axios from "axios";

import {
  POPULAR_MOVIES,
  SEARCH_MOVIE,
  TOP_RATED_MOVIES,
  UPCOMING_MOVIES,
  MOVIE_WITH_GENRE,
  MOVIE_DETAIL_PRE,
  MOVIE_DETAIL_POST,
} from "../constants/config";

const fetchData = async (url) => {
  const response = await axios.get(url);
  return response.data.results;
};

export const getPopularMovies = async () => {
  return await fetchData(POPULAR_MOVIES);
};

export const getTopRatedMovies = async () => {
  return await fetchData(TOP_RATED_MOVIES);
};

export const getUpcomingMovies = async () => {
  return await fetchData(UPCOMING_MOVIES);
};

export const getSearchedMovie = async (movieName) => {
  return await fetchData(`${SEARCH_MOVIE}${movieName}`);
};

export const getFilteredMovies = async (categoryId) => {
  return await fetchData(`${MOVIE_WITH_GENRE}${categoryId}`);
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(
    `${MOVIE_DETAIL_PRE}${movieId}${MOVIE_DETAIL_POST}`
  );
  return response.data;
};

export const getVideo = async (videoUrl) => {
  return await fetchData(``);
};
