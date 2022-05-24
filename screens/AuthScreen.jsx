import { StyleSheet, View } from "react-native";

import { COLORS } from "../constants/styles";

import AuthForm from "../components/auth/AuthForm";

const AuthScreen = () => {
  return (
    <View style={styles.container}>
      <AuthForm />
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryDark,
  },
});
