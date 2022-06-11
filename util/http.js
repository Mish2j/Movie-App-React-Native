import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  deleteUser,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
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
    throw new Error(error.code);
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
    throw new Error(error.code);
  }
};

export const signOutUser = async () => {
  try {
    const response = await signOut(authentication);
  } catch (error) {
    throw new Error(error);
  }
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

export const updateUserName = async (newUsername) => {
  const user = getCurrentUser();
  try {
    await updateProfile(user, {
      displayName: newUsername,
    });
  } catch (error) {
    throw new Error(error.code);
  }
};

// export const updateUserAvatar = async (newPhotoURL) => {
//   const user = getCurrentUser();
//   // update image ...
//   await updateProfile(user, {
//     photoURL: newPhotoURL,
//   });
// };

export const updateUserEmail = async (currentPassword, newEmail) => {
  const user = getCurrentUser();
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, newEmail);
  } catch (error) {
    throw new Error(error.code);
  }
};

export const updateUserPassword = async (currentPassword, newPassword) => {
  const user = getCurrentUser();
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  } catch (error) {
    throw new Error(error.code);
  }
};

export const deleteUserAccount = async (password) => {
  const user = getCurrentUser();
  const credential = EmailAuthProvider.credential(user.email, password);

  try {
    await reauthenticateWithCredential(user, credential);
    await deleteUser(user);
  } catch (error) {
    throw new Error(error.code);
  }
};
