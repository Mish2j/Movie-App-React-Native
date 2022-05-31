import { useContext } from "react";
import { View, StyleSheet } from "react-native";

import { COLORS } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context";

import BodyWrapper from "../UI/BodyWrapper";
import IconButton from "../UI/IconButton";
import UserData from "./UserData";

const UserAccount = () => {
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

export default UserAccount;

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
