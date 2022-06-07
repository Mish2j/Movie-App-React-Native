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

export const updateUserName = async (newUsername) => {
  const user = getCurrentUser();
  updateProfile(user, {
    displayName: newUsername,
  });
};

export const updateUserEmail = (newEmail) => {
  // try {
  //   const user = getCurrentUser();
  //   const resp = await reAuth();

  //   const emailUpadteResponse = await updateEmail(user, newEmail);
  // } catch (error) {
  //   throw new Error(error);
  // }

  const user = getCurrentUser();
  const credential = EmailAuthProvider.credential(user.email, "password");

  reauthenticateWithCredential(user, credential)
    .then(() => {
      // User re-authenticated.

      updateEmail(user, newEmail)
        .then(() => {
          // Email updated!
          // ...
          console.log("email updated!");
        })
        .catch((error) => {
          // An error occurred
          // ...
          console.log(error);
        });
    })
    .catch((error) => {
      // An error ocurred
      // ...
      console.log(error);
    });
};

export const updateUserPassword = async (newPassword) => {
  const user = getCurrentUser();
  const credential = EmailAuthProvider.credential(user.email, "password");

  reauthenticateWithCredential(user, credential)
    .then(() => {
      // User re-authenticated.

      updatePassword(user, newPassword)
        .then(() => {
          // Update successful.
          console.log("password updated!");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      // An error ocurred
      // ...
      console.log(error);
    });
};

export const updateUserAvatar = async (newPhotoURL) => {
  const user = getCurrentUser();
  // update image ...
  updateProfile(user, {
    photoURL: newPhotoURL,
  });
};

export const deleteUserAccount = async () => {
  const user = getCurrentUser();

  deleteUser(user)
    .then(() => {
      // User deleted.
    })
    .catch((error) => {
      // An error ocurred
      // ...
    });
};
