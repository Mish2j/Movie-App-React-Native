import { useReducer, useState, useContext } from "react";
import { Alert, View, StyleSheet, Pressable, Text } from "react-native";

import * as reducer from "../../reducers/index";
import { COLORS } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context";
import { ERROR, SERVER_ERROR_CODE, NOTIFICATION } from "../../constants/config";
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
  serverErrorHandler,
} from "../../util/helpers";

import BodyWrapper from "../UI/BodyWrapper";
import IconButton from "../UI/IconButton";
import Loader from "../UI/Loader";
import UserData from "./UserData";
import Avatar from "./Avatar";

const UserAccount = () => {
  const [signingout, setSigningout] = useState(false);
  const authCtx = useContext(AuthContext);
  const userData = getUserProfile();

  const [isUpdating, setIsUpdating] = useState(false);

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

  const updateUsername = (newUsername) => {
    dispatch(reducer.setNewUsername(newUsername));
  };

  const updateEmailState = (newEmail) => {
    dispatch(reducer.setNewEmail(newEmail));
  };

  const updatePasswordState = (newPass) => {
    dispatch(reducer.setNewPassword(newPass));
  };

  const accountUpdateHandler = async (
    currentPassword,
    handleAsync,
    updatedValue
  ) => {
    try {
      setIsUpdating(true);
      await handleAsync(currentPassword, updatedValue);

      Alert.alert("Success", NOTIFICATION.INFO_CHANGED);
    } catch (error) {
      let errMsg = serverErrorHandler(error.message);
      Alert.alert("Error!", errMsg);
    } finally {
      setIsUpdating(false);
    }
  };

  const passwordPrompt = (handler, updatedValue) => {
    Alert.prompt(
      "Confirm changes",
      NOTIFICATION.PASSWORD_REENTER,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: (password) =>
            accountUpdateHandler(password, handler, updatedValue),
        },
      ],
      "secure-text"
    );
  };

  const saveNewEmail = async () => {
    let updatedEmail = accountDetails.email;
    try {
      const emailErr = validateEmail(updatedEmail);
      if (emailErr) throw new Error(emailErr);

      if (updatedEmail === userData.email) {
        throw new Error(ERROR.SAME_EMAIL);
      }

      passwordPrompt(updateUserEmail, updatedEmail);
    } catch (error) {
      Alert.alert("Error!", error.message);
    } finally {
      dispatch(reducer.setNewEmail(""));
    }
  };

  const saveNewPassword = async () => {
    let updatedPassword = accountDetails.password;
    try {
      const passErr = validatePassword(updatedPassword);

      if (passErr) throw new Error(passErr);

      passwordPrompt(updateUserPassword, updatedPassword);
    } catch (error) {
      Alert.alert("Error!", error.message);
    } finally {
      dispatch(reducer.setNewPassword(""));
    }
  };

  const saveNewUsername = async () => {
    try {
      setIsUpdating(true);
      const nameErr = validateName(accountDetails.username);

      if (nameErr) throw new Error(nameErr);

      const response = await updateUserName(accountDetails.username);
    } catch (error) {
      // handle errors
      console.log(error);
      Alert.alert("Error!", error.message);
    } finally {
      dispatch(reducer.setNewUsername(""));
      setIsUpdating(false);
    }
  };

  const deleteAcc = async (password) => {
    deleteUserAccount(password);
    signOutHandler();
    Alert.alert("Note!", NOTIFICATION.ACCOUNT_DELETED);
  };

  const deleteAccountHandler = () => {
    Alert.prompt(
      "Confirm changes",
      NOTIFICATION.ACCOUNT_DELETE_CONFIRM,
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

  const signOutHandler = async () => {
    try {
      setSigningout(true);
      await signOutUser();
      authCtx.logoutUser();
    } catch (error) {
      Alert.alert("Error!", ERROR.GENERAL_ERROR);
      setSigningout(false);
    }
  };

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      {isUpdating ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <Avatar imgUrl={userData.photoURL} />

          <UserData
            onDataUpdate={updateEmailState}
            onSave={saveNewEmail}
            label="Email"
            userData={userData.email}
          />
          <UserData
            onDataUpdate={updatePasswordState}
            onSave={saveNewPassword}
            label="Password"
            userData="********"
          />
          <UserData
            onDataUpdate={updateUsername}
            onSave={saveNewUsername}
            label="Username"
            userData={userData.username || "anonymous"}
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
      )}
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
