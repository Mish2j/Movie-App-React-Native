import * as ACTIONS from "./actions";

export const addMovie = (movie) => {
  return { type: ACTIONS.ADD_MOVIE_TO_LIST, payload: movie };
};

export const removeMovie = (movieId) => {
  return { type: ACTIONS.REMOVE_MOVIE_FROM_LIST, payload: movieId };
};
