import { useReducer, useState, useContext } from "react";
import { Alert, View, StyleSheet, Pressable, Text } from "react-native";

import * as reducer from "../../reducers/index";
import { COLORS } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context";
import { ERROR } from "../../constants/config";
import {
  deleteUserAccount,
  getUserProfile,
  signOutUser,
  updateUserEmail,
  updateUserName,
  updateUserPassword,
} from "../../util/http";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../util/helpers";

import BodyWrapper from "../UI/BodyWrapper";
import IconButton from "../UI/IconButton";
import UserData from "./UserData";
import Avatar from "./Avatar";

const UserAccount = () => {
  const [signingout, setSigningout] = useState(false);
  const authCtx = useContext(AuthContext);
  const userData = getUserProfile();

  const initialState = {
    username: "",
    email: "",
    imgURL: "",
    password: "",
  };

  const [accountDetails, dispatch] = useReducer(
    reducer.accountUpdateReducer,
    initialState
  );

  const signOutHandler = async () => {
    try {
      setSigningout(true);
      signOutUser();
      authCtx.logoutUser();
    } catch (error) {
      setSigningout(false);
    }
  };

  const updateUsername = (newUsername) => {
    dispatch(reducer.setNewUsername(newUsername));
  };

  const updateEmail = (newEmail) => {
    dispatch(reducer.setNewEmail(newEmail));
  };

  const updatePassword = (newPass) => {
    dispatch(reducer.setNewPassword(newPass));
  };

  const saveNewEmail = async () => {
    try {
      const emailErr = validateEmail(accountDetails.email);

      if (emailErr) throw new Error(emailErr);

      Alert.prompt(
        "Please re-enter your password",
        null,
        {
          text: "OK",
          onPress: (password) =>
            updateUserEmail(accountDetails.email, password),
        },
        "secure-text"
      );
    } catch (error) {
      dispatch(reducer.clearEmail());
      console.log(error);
      // let errMsg = "";
      // switch (error) {
      //   case "auth/email-already-in-use":
      //     errMsg = ERROR.EMAIL_EXISTS;
      //     break;
      //   default:
      //     errMsg = error;
      // }
      // Alert.alert("Error!", error);
    }
  };

  const saveNewUsername = () => {
    const nameErr = validateName(accountDetails.username);
    if (nameErr) {
      dispatch(reducer.clearUsername());
      Alert.alert("Error!", nameErr);
      return;
    }
    updateUserName(accountDetails.username);
  };

  const saveNewPassword = () => {
    const passErr = validatePassword(accountDetails.password);
    if (passErr) {
      dispatch(reducer.clearPassword());
      Alert.alert("Error!", passErr);
      return;
    }
    Alert.prompt(
      "Please re-enter your old password",
      null,
      {
        text: "OK",
        onPress: (oldPassword) =>
          updateUserPassword(accountDetails.password, oldPassword),
      },
      "secure-text"
    );
  };

  const deleteAcc = (password) => {
    deleteUserAccount(password);
    signOutHandler();
    Alert.alert("Note!", "Your account has been successfully deleted!");
  };

  const deleteAccountHandler = () => {
    Alert.prompt(
      "Attention",
      "Are you sure you want to permanently delete your accout?",

      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: deleteAcc },
      ],

      "secure-text"
    );
  };

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <View style={styles.container}>
        <Avatar imgUrl={userData.photoURL} />
        <UserData
          onDataUpdate={updateEmail}
          onSave={saveNewEmail}
          label="Email"
          userData={userData.email}
        />
        <UserData
          onDataUpdate={updatePassword}
          onSave={saveNewPassword}
          label="Password"
          userData="********"
        />
        <UserData
          onDataUpdate={updateUsername}
          onSave={saveNewUsername}
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
