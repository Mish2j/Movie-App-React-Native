import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../constants/styles";

import BodyWrapper from "../UI/BodyWrapper";
import TextButton from "../UI/TextButton";
import ErrorContainer from "./ErrorContainer";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formHasError, setFormHasError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: isLogin ? "Login" : "Signup" });
  }, [isLogin]);

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
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <BodyWrapper color={COLORS.primaryDark}>
        <ScrollView style={styles.screen}>
          <View style={styles.container}>
            {formHasError && <ErrorContainer errors={errors} />}
            <View style={styles.box}>
              {isLogin && <LoginForm onError={handleErrors} />}
              {!isLogin && <SignupForm onError={handleErrors} />}
              <TextButton
                onPress={switchFormHandler}
                containerStyle={styles.newUserBtnContainer}
                color={COLORS.textDark}
                text={isLogin ? "Create a new user" : "Already have an account"}
              />
            </View>
          </View>
        </ScrollView>
      </BodyWrapper>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  screen: {
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
});
