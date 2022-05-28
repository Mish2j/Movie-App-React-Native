import { useState, useContext } from "react";
import { Text, View, StyleSheet, Pressable, Alert } from "react-native";

import { COLORS } from "../../constants/styles";
import { createUser, loginUser } from "../../util/http";
import { AuthContext } from "../../store/auth-context";

import Input from "../UI/Input";
import IconButton from "../UI/IconButton";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userCred, setUserCred] = useState({ email: "", password: "" });
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const switchFormHandler = () => {
    setIsLogin((curState) => !curState);
  };

  const signupHandler = async (email, password) => {
    try {
      return createUser(email, password);
    } catch (error) {
      throw new Error("Try again later!");
    }
  };

  const loginHandler = async (email, password) => {
    try {
      return loginUser(email, password);
    } catch (error) {
      throw new Error("Try again later!");
    }
  };

  // ADD VALIDATION
  const emailHandler = (userEmail) => {
    setUserCred((curState) => ({ ...curState, email: userEmail }));
  };

  const passwordHandler = (userPassword) => {
    setUserCred((curState) => ({ ...curState, password: userPassword }));
  };

  const confirmPasswordHandler = (userPasswordRepeat) => {};

  const firstNameHandler = (userFirstName) => {};

  const lastNameHandler = (userLastName) => {};

  const formSubmitHandler = async () => {
    try {
      setIsAuthenticating(true);

      let token = null;
      if (isLogin) {
        token = await loginHandler(userCred.email, userCred.password);
      } else if (!isLogin) {
        token = await signupHandler(userCred.email, userCred.password);
      }

      if (token) {
        authCtx.loginUser(token);
      }
    } catch (error) {
      Alert.alert("Login Failed!", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      {!isLogin && (
        <>
          <Input onUpdateValue={firstNameHandler} label="First Name" />
          <Input onUpdateValue={lastNameHandler} label="Last Name" />
        </>
      )}
      <Input onUpdateValue={emailHandler} autoCorrect={false} label="Email" />
      <Input
        onUpdateValue={passwordHandler}
        label="Password"
        autoCorrect={false}
        secureTextEntry={true}
      />

      {!isLogin && (
        <Input
          label="Confirm Password"
          autoCorrect={false}
          secureTextEntry={true}
          onUpdateValue={confirmPasswordHandler}
        />
      )}

      <IconButton
        onPress={formSubmitHandler}
        iconName={`${isLogin ? "log-in" : "person-add"}-outline`}
        iconColor={COLORS.primaryDark}
        iconSize={22}
        text={isAuthenticating ? "Wait..." : isLogin ? "Login" : "Signup"}
        containerStyle={styles.formBtn}
        textStyle={styles.formBtnText}
      />
      <Pressable
        onPress={switchFormHandler}
        style={({ pressed }) => [
          styles.newUserBtnContainer,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.newUserBtnText}>
          {isLogin ? "Create a new user" : "Already have an account"}
        </Text>
      </Pressable>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  formContainer: {
    width: "85%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 7,
    backgroundColor: COLORS.primaryLight,
  },
  formBtn: {
    backgroundColor: COLORS.textLight,
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 14,
    alignSelf: "center",
    marginTop: 10,
  },
  formBtnText: {
    color: COLORS.primaryDark,
    fontSize: 16,
  },
  newUserBtnContainer: {
    marginTop: 20,

    alignSelf: "center",
  },
  newUserBtnText: {
    color: COLORS.textDark,
    fontSize: 16,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
