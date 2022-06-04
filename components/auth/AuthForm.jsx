import { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";

import { COLORS } from "../../constants/styles";
import { createUser, loginUser } from "../../util/http";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "../../util/helpers";
import { AuthContext } from "../../store/auth-context";

import Input from "../UI/Input";
import IconButton from "../UI/IconButton";
import BodyWrapper from "../UI/BodyWrapper";
import ErrorContainer from "./ErrorContainer";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formHasError, setFormHasError] = useState(null);
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    usernameError: "",
    passwordRepeatError: "",
  });
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const switchFormHandler = () => {
    clearErrors();
    setIsLogin((curState) => !curState);
  };

  const showPasswordHandler = () => {
    setIsPasswordHidden((currentState) => !currentState);
  };

  const signupHandler = async (email, password, username) => {
    try {
      return createUser(email, password, username);
    } catch (error) {
      throw new Error(error);
    }
  };

  const loginHandler = async (email, password) => {
    try {
      return loginUser(email, password);
    } catch (error) {
      throw new Error(error);
    }
  };

  const emailHandler = (userEmail) => {
    setUserCred((curState) => ({ ...curState, email: userEmail }));
  };

  const passwordHandler = (userPassword) => {
    setUserCred((curState) => ({ ...curState, password: userPassword }));
  };

  const confirmPasswordHandler = (userPasswordRepeat) => {
    setConfirmPassword(userPasswordRepeat);
  };

  const usernameHandler = (username) => {
    setUserCred((curState) => ({ ...curState, username }));
  };

  const clearErrors = () => {
    setErrors({
      ...errors,
      emailError: "",
      passwordError: "",
      usernameError: "",
      passwordRepeatError: "",
    });
    setFormHasError(false);
  };

  const validateForm = () => {
    const passErrMsg = validatePassword(userCred.password);
    const emailErrMsg = validateEmail(userCred.email);
    const usernameErrMsg = isLogin ? "" : validateName(userCred.username);
    const repeatPassErrorMsg = isLogin
      ? ""
      : validateConfirmPassword(userCred.password, confirmPassword);

    const hasErrorMsg =
      passErrMsg || emailErrMsg || usernameErrMsg || repeatPassErrorMsg;

    if (hasErrorMsg) {
      setErrors({
        ...errors,
        emailError: emailErrMsg,
        passwordError: passErrMsg,
        usernameError: usernameErrMsg,
        passwordRepeatError: repeatPassErrorMsg,
      });
      setFormHasError(true);
      return false;
    }

    clearErrors();
    return true;
  };

  const formSubmitHandler = async () => {
    let isValid = validateForm();

    if (!isValid) return;

    try {
      setIsAuthenticating(true);

      let token = null;

      if (isLogin) {
        token = await loginHandler(userCred.email, userCred.password);
      } else if (!isLogin) {
        token = await signupHandler(
          userCred.email,
          userCred.password,
          userCred.username
        );
      }

      token && authCtx.loginUser(token);
    } catch (error) {
      // FIXME loader
      setIsAuthenticating(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      Alert.alert("Login Failed!", error);
    }
  };

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          {formHasError && <ErrorContainer errors={errors} />}
          <View style={styles.box}>
            {!isLogin && (
              <>
                <Input
                  label="Username"
                  autoFocus={!isLogin}
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onUpdateValue={usernameHandler}
                />
              </>
            )}
            <Input
              autoFocus={isLogin}
              label="Email"
              autoComplete="off"
              onUpdateValue={emailHandler}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Input
              label="Password"
              autoComplete="off"
              onUpdateValue={passwordHandler}
              autoCorrect={false}
              autoCapitalize="none"
              clearTextOnFocus={false}
              secureTextEntry={isPasswordHidden}
              icon="eye-outline"
              onIconPress={showPasswordHandler}
            />

            {!isLogin && (
              <Input
                label="Confirm Password"
                autoComplete="off"
                autoCorrect={false}
                secureTextEntry={isPasswordHidden}
                autoCapitalize="none"
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
      </ScrollView>
    </BodyWrapper>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
  },
  box: {
    marginVertical: 20,
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
