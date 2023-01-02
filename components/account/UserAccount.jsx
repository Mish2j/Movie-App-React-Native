import { useReducer, useState, useContext } from "react";
import {
  Alert,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import * as reducer from "../../reducers/index";
import { COLORS } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context";
import { ERROR, NOTIFICATION } from "../../constants/config";
import {
  deleteUserAccount,
  getUserProfile,
  signOutUser,
  updateUserAvatar,
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
import TextButton from "../UI/TextButton";
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
    imgURI: "",
    password: "",
  };

  const [accountDetails, dispatch] = useReducer(
    reducer.accountUpdateReducer,
    initialState
  );

  const updateUsernameState = (newUsername) =>
    dispatch(reducer.setNewUsername(newUsername));

  const updateEmailState = (newEmail) =>
    dispatch(reducer.setNewEmail(newEmail));

  const updatePasswordState = (newPass) =>
    dispatch(reducer.setNewPassword(newPass));

  const updateAvatarState = (newImgURI) =>
    dispatch(reducer.setNewAvatar(newImgURI));

  const accountUpdateHandler = async (
    currentPassword,
    handleAsync,
    updatedValue
  ) => {
    try {
      setIsUpdating(true);
      await handleAsync(currentPassword, updatedValue);

      Alert.alert("Account update", NOTIFICATION.INFO_CHANGED);
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

      await updateUserName(accountDetails.username);
    } catch (error) {
      Alert.alert("Error!", error.message);
    } finally {
      dispatch(reducer.setNewUsername(""));
      setIsUpdating(false);
    }
  };

  const saveNewAvatar = async () => {
    try {
      setIsUpdating(true);
      await updateUserAvatar(accountDetails.imgURI);
    } catch (error) {
      Alert.alert("Error!", error.message);
    } finally {
      dispatch(reducer.setNewAvatar(""));
      setIsUpdating(false);
    }
  };

  const processAccountDelete = async (password) => {
    try {
      setIsUpdating(true);
      await deleteUserAccount(password);
      signOutHandler();
      Alert.alert("Note!", NOTIFICATION.ACCOUNT_DELETED);
    } catch (error) {
      let errMsg = serverErrorHandler(error.message);
      Alert.alert("Error!", errMsg);
      setIsUpdating(false);
    }
  };

  const deleteAccountHandler = async () => {
    try {
      Alert.prompt(
        "Confirm changes",
        NOTIFICATION.ACCOUNT_DELETE_CONFIRM,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "Delete", onPress: processAccountDelete },
        ],
        "secure-text"
      );
    } catch (error) {
      Alert.alert("Error!", error.message);
    }
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
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <BodyWrapper color={COLORS.primaryDark}>
        {isUpdating ? (
          <Loader />
        ) : (
          <ScrollView style={styles.screen}>
            <View style={styles.container}>
              <Avatar
                onUpdate={updateAvatarState}
                onSave={saveNewAvatar}
                imgURL={
                  accountDetails.imgURI
                    ? accountDetails.imgURI
                    : userData.photoURL
                }
              />

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
                onDataUpdate={updateUsernameState}
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
              <TextButton
                onPress={deleteAccountHandler}
                text="Delete my account"
                color={COLORS.dangerLight}
                containerStyle={styles.deleteBtn}
              />
            </View>
          </ScrollView>
        )}
      </BodyWrapper>
    </KeyboardAvoidingView>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 50,
  },
  signOutBtn: {
    marginTop: 50,
    alignSelf: "center",
  },
  deleteBtn: {
    marginTop: 70,
    alignSelf: "center",
  },
});
