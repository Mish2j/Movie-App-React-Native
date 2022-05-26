import * as ACTIONS from "./actions";

export const myMovieListReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_MOVIE_TO_LIST:
      return [action.payload, ...state];
    case ACTIONS.REMOVE_MOVIE_FROM_LIST:
      const filteredList = state.filter((movie) => movie.id !== action.payload);
      return filteredList;
    default:
      return state;
  }
};
