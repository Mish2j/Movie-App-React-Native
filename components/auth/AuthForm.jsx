import { useState } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";

import { COLORS } from "../../constants/styles";

import BodyWrapper from "../UI/BodyWrapper";
import ErrorContainer from "./ErrorContainer";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formHasError, setFormHasError] = useState(null);

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    usernameError: "",
    passwordRepeatError: "",
    submitFailError: "",
  });

  const clearErrors = () => {
    setErrors({
      emailError: "",
      passwordError: "",
      usernameError: "",
      passwordRepeatError: "",
      submitFailError: "",
    });
    setFormHasError(false);
  };

  const handleErrors = (errorData) => {
    setFormHasError(true);
    const {
      emailErrMsg,
      passErrMsg,
      usernameErrMsg,
      repeatPassErrorMsg,
      submitFailErrMsg,
    } = errorData;

    setErrors({
      emailError: emailErrMsg || "",
      passwordError: passErrMsg || "",
      usernameError: usernameErrMsg || "",
      passwordRepeatError: repeatPassErrorMsg || "",
      submitFailError: submitFailErrMsg || "",
    });
  };

  const switchFormHandler = () => {
    clearErrors();
    setIsLogin((curState) => !curState);
  };

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          {formHasError && <ErrorContainer errors={errors} />}
          <View style={styles.box}>
            {isLogin && <LoginForm onError={handleErrors} />}
            {!isLogin && <SignupForm onError={handleErrors} />}
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
