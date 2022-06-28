import { ERROR, SERVER_ERROR_CODE } from "../constants/config";

const isNotEmpty = (value) => {
  if (value === null || typeof value === "undefined") return false;
  if (value.trim() === "") return false;
  return true;
};

const isValidName = (name) => {
  const re = /^[a-zA-Z]+(([':,. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
  return re.test(name);
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateEmail = (email) => {
  let emailError = "";
  if (!isNotEmpty(email)) {
    emailError = "Please enter your email!";
    return emailError;
  }
  if (!isValidEmail(email)) {
    emailError = "Email address must be in this format - example@email.com!";
    return emailError;
  }

  return emailError;
};

export const validatePassword = (password) => {
  let passwordError = "";
  if (!isNotEmpty(password)) {
    passwordError = "Please enter your password!";
    return passwordError;
  }
  if (password.trim().length < 6) {
    passwordError = "Password must be at least 6 characters long!";
    return passwordError;
  }
  return passwordError;
};

export const validateName = (name) => {
  let nameError = "";
  if (!isNotEmpty(name)) {
    nameError = "Plesae enter your name!";
    return nameError;
  }
  if (!isValidName(name)) {
    nameError = "Username must contain only alphabetical (a-z) characters!";
    return nameError;
  }
  return nameError;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  let error = "";
  if (password !== confirmPassword) {
    error = "Your password and confirmation password do not match!";
    return error;
  }
  return error;
};

export const serverErrorHandler = (error) => {
  let errorMessage = "";
  switch (error) {
    case SERVER_ERROR_CODE.EMAIL_ALREADY_IN_USE:
      errorMessage = ERROR.EMAIL_EXISTS;
      break;
    case SERVER_ERROR_CODE.REQUIRES_RECENT_LOGIN:
    case SERVER_ERROR_CODE.WRONG_PASSWORD:
      errorMessage = ERROR.INVALID_CREDENTIALS;
      break;
    case SERVER_ERROR_CODE.INTERNAL_ERROR:
      errorMessage = ERROR.REQUEST_FAILED;
      break;
    case SERVER_ERROR_CODE.USER_DISABLED:
      errorMessage = ERROR.DISABLED_ACCOUNT;
      break;
    case SERVER_ERROR_CODE.USER_NOT_FOUND:
      errorMessage = ERROR.NO_USER;
      break;
    case SERVER_ERROR_CODE.TOO_MANY_REQUESTS:
      errorMessage = ERROR.MANY_REQUESTS;
      break;
    default:
      errorMessage = ERROR.GENERAL_ERROR;
  }

  return errorMessage;
};
