import { useState, useContext } from "react";
import { Text, View, StyleSheet, Pressable, Alert } from "react-native";

import { COLORS } from "../../constants/styles";
import { createUser, loginUser } from "../../util/http";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../util/helpers";
import { AuthContext } from "../../store/auth-context";

import Input from "../UI/Input";
import IconButton from "../UI/IconButton";
import BodyWrapper from "../UI/BodyWrapper";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formHasError, setFormHasError] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userCred, setUserCred] = useState({ email: "", password: "" });
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const switchFormHandler = () => {
    setIsLogin((curState) => !curState);
  };

  // const signupHandler = async (email, password) => {
  //   try {
  //     return createUser(email, password);
  //   } catch (error) {
  //     throw new Error("Try again later!");
  //   }
  // };

  const loginHandler = async (email, password) => {
    try {
      // return loginUser(email, password);
    } catch (error) {
      throw new Error(error);
    }
  };

  // ADD VALIDATION
  const emailHandler = (userEmail) => {
    setUserCred((curState) => ({ ...curState, email: userEmail }));
  };

  const passwordHandler = (userPassword) => {
    setUserCred((curState) => ({ ...curState, password: userPassword }));
  };

  // const confirmPasswordHandler = (userPasswordRepeat) => {};

  // const firstNameHandler = (userFirstName) => {
  //   // get first name
  // };

  // const lastNameHandler = (userLastName) => {
  //   // get last name
  // };

  const validateForm = () => {
    const passErrMsg = validatePassword(userCred.password);
    const emailErrMsg = validateEmail(userCred.email);

    if (passErrMsg || emailErrMsg) {
      setPasswordError(passErrMsg);
      setEmailError(emailErrMsg);
      setFormHasError(true);
      return false;
    }

    setPasswordError("");
    setEmailError("");
    setFormHasError(false);

    return true;
  };

  const formSubmitHandler = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    try {
      // // setIsAuthenticating(true);

      // // let token = null;

      // if (isLogin) {
      //   // token = await loginHandler(userCred.email, userCred.password);
      // } else if (!isLogin) {
      //   // token = await signupHandler(userCred.email, userCred.password);
      // }

      // if (token !== null) {
      //   authCtx.loginUser(token);
      // }

      console.log("loged in");
    } catch (error) {
      setIsAuthenticating(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // Alert.alert("Login Failed!", error);
    }
  };

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <View style={styles.container}>
        {formHasError && (
          <View style={styles.box}>
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
            {passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
          </View>
        )}
        <View style={styles.box}>
          {!isLogin && (
            <>
              <Input onUpdateValue={firstNameHandler} label="First Name" />
              <Input onUpdateValue={lastNameHandler} label="Last Name" />
            </>
          )}
          <Input
            onUpdateValue={emailHandler}
            autoCorrect={false}
            label="Email"
          />
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
      </View>
    </BodyWrapper>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLORS.primaryDark,
  },
  box: {
    marginVertical: 20,
    width: "85%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 7,
    backgroundColor: COLORS.primaryLight,
  },
  errorText: {
    fontSize: 14,
    color: "#ff3d3d",
    marginVertical: 5,
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
