import { View, StyleSheet } from "react-native";

import { COLORS } from "../../constants/styles";

import Input from "../UI/Input";
import IconButton from "../UI/IconButton";

const AuthForm = () => {
  const formSubmitHandler = () => {
    console.log("Login...");
  };

  return (
    <View style={styles.formContainer}>
      <Input label="Email" />
      <Input label="Password" />
      <IconButton
        onPress={formSubmitHandler}
        iconName="log-in-outline"
        iconColor={COLORS.primaryDark}
        iconSize={22}
        text="Login"
        containerStyle={styles.formBtn}
        textStyle={styles.formBtnText}
      />
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
});
