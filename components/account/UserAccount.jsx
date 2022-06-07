import { useState, useContext } from "react";
import { Alert, View, StyleSheet, Pressable, Text } from "react-native";

import { COLORS } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context";
import { getUserProfile, signOutUser, updateUserName } from "../../util/http";

import BodyWrapper from "../UI/BodyWrapper";
import IconButton from "../UI/IconButton";
import UserData from "./UserData";

const UserAccount = () => {
  const [signingout, setSigningout] = useState(false);
  const authCtx = useContext(AuthContext);
  const userData = getUserProfile();
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

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

  const deleteAccountHandler = () => {
    Alert.alert(
      "Attention",
      "Are you sure you want to permanently delete your accout?"
    );
  };

  const updateUserNameHandler = (updatedUserName) => {
    setNewUserName(updatedUserName);
  };

  const updatePasswordHandler = () => {};

  const updateEmailHandler = () => {};

  const saveChangesHandler = () => {
    // validate new data
    if (newUserName.trim().length < 4) {
      console.log("Error");
      return;
    }
    updateUserName(newUserName);
  };

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <View style={styles.container}>
        <UserData
          onDataUpdate={updateEmailHandler}
          onSave={saveChangesHandler}
          label="Email"
          userData={userData.email}
        />
        <UserData
          onDataUpdate={updatePasswordHandler}
          onSave={saveChangesHandler}
          label="Password"
          userData="********"
        />
        <UserData
          onDataUpdate={updateUserNameHandler}
          onSave={saveChangesHandler}
          label="Username"
          userData={userData.username}
        />
        <IconButton
          containerStyle={styles.signOutBtn}
          iconName="log-out-outline"
          iconSize={20}
          iconColor={COLORS.textDark}
          text={signingout ? "Wait..." : "Sign Out"}
          onPress={signOutHandler}
        />
        <Pressable
          onPress={deleteAccountHandler}
          style={({ pressed }) => [
            styles.deleteBtn,
            pressed && styles.deleteBtnPressed,
          ]}
        >
          <Text style={styles.deleteBtnText}>Delete my account</Text>
        </Pressable>
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
  deleteBtn: {
    marginTop: 70,
    alignSelf: "center",
  },
  deleteBtnPressed: {
    opacity: 0.7,
  },
  deleteBtnText: {
    fontSize: 14,
    color: "red",
  },
});
