import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

import { COLORS } from "../../constants/styles";
import { createUser } from "../../util/http";

import Input from "../UI/Input";
import IconButton from "../UI/IconButton";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const signupHandler = (email, password) => {
    createUser(email, password);
  };

  const loginHandler = () => {};

  const emailHandler = (val) => {
    console.log(val);
  };

  const formSubmitHandler = () => {
    if (isLogin) {
      return;
    }

    signupHandler();
  };

  const switchFormHandler = () => {
    setIsLogin((curState) => !curState);
  };

  return (
    <View style={styles.formContainer}>
      {!isLogin && (
        <>
          <Input onUpdateValue={firstNameHandler} label="First Name" />
          <Input label="Last Name" />
        </>
      )}
      <Input onUpdateValue={emailHandler} autoCorrect={false} label="Email" />
      <Input label="Password" autoCorrect={false} secureTextEntry={true} />

      <IconButton
        onPress={formSubmitHandler}
        iconName={`${isLogin ? "log-in" : "person-add"}-outline`}
        iconColor={COLORS.primaryDark}
        iconSize={22}
        text={isLogin ? "Login" : "Signup"}
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
