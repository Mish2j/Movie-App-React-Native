import { useEffect, createContext, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  token: null,
  isLoggedin: false,
  loginUser() {},
  createUser() {},
  logoutUser() {},
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
      }
    };

    fetchToken();
  }, []);

  const loginUser = (token) => {
    setToken(token);
    AsyncStorage.setItem("token", token);
  };

  const createUser = (token) => {
    setToken(token);
    AsyncStorage.setItem("token", token);
  };

  const logoutUser = () => {
    setToken(null);
    AsyncStorage.removeItem("token");
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
