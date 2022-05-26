import { useReducer } from "react";
import { createContext } from "react";

import * as reducer from "../reducers/index";

const initialState = {
  movies: [],
  addMovie(movie) {},
  removeMovie(id) {},
};

export const MyMovieListContext = createContext(initialState);

export const MyMovieListProvider = ({ children }) => {
  const [myMovies, dispatch] = useReducer(reducer.myMovieListReducer, []);

  const addMovieToList = (movie) => {
    dispatch(reducer.addMovie(movie));
  };

  const removeMovieFromList = (movieId) => {
    dispatch(reducer.removeMovie(movieId));
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
