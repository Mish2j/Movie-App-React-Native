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
    emailError =
      "Please enter a valid email address in this format - example@email.com";
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
    passwordError = "Password must be at least 6 characters long.";
    return passwordError;
  }
  return passwordError;
};

export const validateName = (name) => {
  let nameError = "";
  if (!isNotEmpty(name)) {
    nameError = "This field cannot be empty!";
    return nameError;
  }
  if (!isValidName(name)) {
    nameError = "Please enter a valid name!";
    return nameError;
  }
  return nameError;
};

export const validateURL = (URL) => {
  // isValid URL ...
};
