import { useState, useContext } from "react";
import { StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/styles";
import { loginUser } from "../../util/http";
import {
  validateEmail,
  validatePassword,
  serverErrorHandler,
} from "../../util/helpers";
import { AuthContext } from "../../store/auth-context";

import Input from "../UI/Input";
import IconButton from "../UI/IconButton";

const LoginForm = ({ onError }) => {
  const navigation = useNavigation();

  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });

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

  const formSubmitHandler = async () => {
    setIsAuthenticating(true);
    const passErrMsg = validatePassword(userCred.password);
    const emailErrMsg = validateEmail(userCred.email);

    const hasErrorMsg = passErrMsg || emailErrMsg;

    try {
      if (hasErrorMsg) throw new Error([emailErrMsg, passErrMsg]);

      const token = await loginUser(userCred.email, userCred.password);
      authCtx.loginUser(token);
      navigation.navigate("Account");
    } catch (error) {
      setIsAuthenticating(false);

      if (hasErrorMsg) {
        onError({ emailErrMsg, passErrMsg });
        return;
      }

      onError({
        submitFailErrMsg: serverErrorHandler(error.message),
      });
    }
  };

  return (
    <>
      <Input
        autoFocus={true}
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
      <IconButton
        onPress={formSubmitHandler}
        iconName="log-in-outline"
        iconColor={COLORS.primaryDark}
        iconSize={22}
        text={isAuthenticating ? "Wait..." : "Login"}
        containerStyle={styles.formBtn}
        textStyle={styles.formBtnText}
      />
    </>
  );
};

export default LoginForm;

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
