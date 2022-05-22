import { useReducer } from "react";
import { createContext } from "react";

const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";
const REMOVE_MOVIE_FROM_LIST = "REMOVE_MOVIE_FROM_LIST";

const initialState = {
  movies: [],
  addMovie(movie) {},
  removeMovie(id) {},
};

const myMovieListReducer = (state, action) => {
  switch (action.type) {
    case ADD_MOVIE_TO_LIST:
      return [action.payload, ...state];
    case REMOVE_MOVIE_FROM_LIST:
      const filteredList = state.filter((movie) => movie.id !== action.payload);
      return filteredList;
    default:
      return state;
  }
};

export const MyMovieListContext = createContext(initialState);

export const MyMovieListProvider = ({ children }) => {
  const [myMovies, dispatch] = useReducer(myMovieListReducer, []);

  const addMovieToList = (movie) => {
    dispatch({ type: ADD_MOVIE_TO_LIST, payload: movie });
  };

  const removeMovieFromList = (movieId) => {
    dispatch({ type: REMOVE_MOVIE_FROM_LIST, payload: movieId });
  };

  const value = {
    movies: myMovies,
    addMovie: addMovieToList,
    removeMovie: removeMovieFromList,
  };

  return (
    <MyMovieListContext.Provider value={value}>
      {children}
    </MyMovieListContext.Provider>
  );
};
