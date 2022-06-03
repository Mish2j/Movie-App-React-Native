import { createContext, useState } from "react";

const initialState = {
  token: null,
  isLoggedin: false,
  firstName: "",
  lastName: "",
  loginUser() {},
  createUser() {},
  logoutUser() {},
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null); // CHANGE
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const loginUser = (token) => {
    setToken(token);
  };

  const createUser = (token) => {
    setToken(token);
  };

  const logoutUser = () => {
    setToken(null);
  };

  const authValue = {
    token,
    isLoggedin: !!token,
    loginUser,
    createUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
