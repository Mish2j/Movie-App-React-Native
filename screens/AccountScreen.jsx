import { useContext } from "react";
import { View, StyleSheet } from "react-native";

import { COLORS } from "../constants/styles";
import { AuthContext } from "../store/auth-context";

import BodyWrapper from "../components/UI/BodyWrapper";
import IconButton from "../components/UI/IconButton";
import Title from "../components/UI/Title";

import UserData from "../components/user/UserData";

const AccountScreen = () => {
  const authCtx = useContext(AuthContext);

  const signOutHandler = () => {
    authCtx.logoutUser();
  };

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <View style={styles.container}>
        <UserData label="Email" userData="test@gmail.com" />
        <UserData label="Password" userData="********" />
        <UserData label="First Name" userData="John" />
        <UserData label="Last Name" userData="Doe" />
        <IconButton
          containerStyle={styles.signOutBtn}
          iconName="log-out-outline"
          iconSize={20}
          iconColor={COLORS.textDark}
          text="Sign Out"
          onPress={signOutHandler}
        />
      </View>
    </BodyWrapper>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  signOutBtn: {
    marginTop: 50,
    alignSelf: "center",
  },
});
