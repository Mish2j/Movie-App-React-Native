import { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";

import { COLORS } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context";
import { getUserProfile, signOutUser } from "../../util/http";

import BodyWrapper from "../UI/BodyWrapper";
import IconButton from "../UI/IconButton";
import UserData from "./UserData";

const UserAccount = () => {
  const [signingout, setSigningout] = useState(false);
  const authCtx = useContext(AuthContext);
  const userData = getUserProfile();

  const signOutHandler = async () => {
    try {
      setSigningout(true);
      signOutUser();
      authCtx.logoutUser();
    } catch (error) {
      console.log(error);
    } finally {
      setSigningout(false);
    }
  };

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <View style={styles.container}>
        <UserData label="Email" userData={userData.email} />
        <UserData label="Password" userData="********" />
        <UserData label="First Name" userData={userData.fullName} />
        {/* <UserData label="Last Name" userData="Doe" /> */}
        <IconButton
          containerStyle={styles.signOutBtn}
          iconName="log-out-outline"
          iconSize={20}
          iconColor={COLORS.textDark}
          text={signingout ? "Wait..." : "Sign Out"}
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
