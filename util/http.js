import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  deleteUser,
} from "firebase/auth";
import { authentication } from "../server/server-config";

import {
  POPULAR_MOVIES,
  SEARCH_MOVIE,
  TOP_RATED_MOVIES,
  UPCOMING_MOVIES,
  MOVIE_WITH_GENRE,
  MOVIE_DETAIL_BASE,
  MOVIE_DETAIL_QUERY,
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

export const createUser = async (email, password, fullName) => {
  try {
    const response = await createUserWithEmailAndPassword(
      authentication,
      email,
      password
    );

    const user = authentication.currentUser;
    if (!user) return;

    updateProfile(user, {
      displayName: fullName,
    });

    return response._tokenResponse.idToken;
  } catch (error) {
    console.log(error.code);

    // switch (error.code) {
    //   case "auth/email-already-in-use":
    //   case "auth/invalid-email":
    //     setEmailError(err.message);
    //     break;
    //   case "auth/weak-password":
    //     setPasswordError(err.message);
    //     break;
    //   default:
    // }
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(
      authentication,
      email,
      password
    );

    return response._tokenResponse.idToken;
  } catch (error) {
    console.log(error.code);

    // switch (error.code) {
    //   case "auth/Invalid-email":
    //   case "auth/user-disabled":
    //   case "auth/user-not-found":
    //     setEmailError(err.message);
    //     break;
    //   case "auth/wrong-password":
    //     setPasswordError(err.message);
    //     break;
    //   default:
  }
};

export const signOutUser = async () => {
  const response = await signOut(authentication);
};

const getCurrentUser = () => {
  const user = authentication.currentUser;
  if (!user) return;
  return user;
};

export const getUserProfile = () => {
  const user = getCurrentUser();
  const displayName = user?.displayName;
  const email = user?.email;
  const photoURL = user?.photoURL;
  const emailVerified = user?.emailVerified;
  const uid = user?.uid;
  return { username: displayName, email, photoURL, emailVerified, uid };
};

export const updateUserName = async (updatedUserName) => {
  const user = getCurrentUser();
  updateProfile(user, {
    displayName: updatedUserName,
  });
};

export const updateUserEmail = async (updatedEmail) => {
  const user = getCurrentUser();
  // updateProfile(user, {
  //   displayName: updatedEmail,
  // });
};

export const updateUserPassword = async () => {
  const user = getCurrentUser();
  // updateProfile(user, {
  //   displayName: fullName,
  // });
};

export const updateUserAvatar = async (photoURL) => {
  const user = getCurrentUser();
  updateProfile(user, {
    photoURL: photoURL,
  });
};

export const deleteUserAccount = async () => {
  const user = getCurrentUser();
  deleteUser(user);
};
