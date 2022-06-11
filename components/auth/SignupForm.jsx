import { useState, useContext } from "react";
import { StyleSheet } from "react-native";

import { COLORS } from "../../constants/styles";
import { createUser } from "../../util/http";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
  serverErrorHandler,
} from "../../util/helpers";
import { AuthContext } from "../../store/auth-context";
import { useNavigation } from "@react-navigation/native";

import Input from "../UI/Input";
import IconButton from "../UI/IconButton";

const SignupForm = ({ onError }) => {
  const navigation = useNavigation();
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const showPasswordHandler = () => {
    setIsPasswordHidden((currentState) => !currentState);
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

  const formSubmitHandler = async () => {
    setIsAuthenticating(true);

    const passErrMsg = validatePassword(userCred.password);
    const emailErrMsg = validateEmail(userCred.email);
    const usernameErrMsg = validateName(userCred.username);
    const repeatPassErrorMsg = validateConfirmPassword(
      userCred.password,
      confirmPassword
    );

    const hasErrorMsg =
      passErrMsg || emailErrMsg || usernameErrMsg || repeatPassErrorMsg;

    try {
      if (hasErrorMsg)
        throw new Error([
          emailErrMsg,
          passErrMsg,
          usernameErrMsg,
          repeatPassErrorMsg,
        ]);

      const token = await createUser(
        userCred.email,
        userCred.password,
        userCred.username
      );

      authCtx.loginUser(token);
      navigation.navigate("Home");
    } catch (error) {
      setIsAuthenticating(false);

      if (hasErrorMsg) {
        onError({
          emailErrMsg,
          passErrMsg,
          usernameErrMsg,
          repeatPassErrorMsg,
        });
        return;
      }

      onError({ submitFailErrMsg: serverErrorHandler(error.message) });
    }
  };

  return (
    <>
      <Input
        label="Username"
        autoFocus={true}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        onUpdateValue={usernameHandler}
      />

      <Input
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
      <Input
        label="Confirm Password"
        autoComplete="off"
        autoCorrect={false}
        secureTextEntry={isPasswordHidden}
        autoCapitalize="none"
        onUpdateValue={confirmPasswordHandler}
      />
      <IconButton
        onPress={formSubmitHandler}
        iconName="person-add-outline"
        iconColor={COLORS.primaryDark}
        iconSize={22}
        text={isAuthenticating ? "Wait..." : "Signup"}
        containerStyle={styles.formBtn}
        textStyle={styles.formBtnText}
      />
    </>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
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
});
