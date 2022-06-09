import * as ACTIONS from "./actions";

export const addMovie = (movie) => {
  return { type: ACTIONS.ADD_MOVIE_TO_LIST, payload: movie };
};

export const removeMovie = (movieId) => {
  return { type: ACTIONS.REMOVE_MOVIE_FROM_LIST, payload: movieId };
};

export const setNewUsername = (newUsername) => {
  return { type: ACTIONS.UPDATE_USERNAME, payload: newUsername };
};

export const setNewEmail = (newEmail) => {
  return { type: ACTIONS.UPDATE_EMAIL, payload: newEmail };
};

export const setNewPassword = (newPass) => {
  return { type: ACTIONS.UPDATE_PASSWORD, payload: newPass };
};

export const clearUsername = () => {
  return { type: ACTIONS.CLEAR_USERNAME };
};

export const clearEmail = () => {
  return { type: ACTIONS.CLEAR_EMAIL };
};

export const clearPassword = () => {
  return { type: ACTIONS.CLEAR_PASSWORD };
};
