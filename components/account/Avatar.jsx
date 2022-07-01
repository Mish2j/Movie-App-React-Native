import { useState } from "react";
import { View, Image, StyleSheet } from "react-native";

import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
} from "expo-image-picker";

import { COLORS } from "../../constants/styles";

import TextButton from "../UI/TextButton";
import IconButton from "../UI/IconButton";

const Avatar = ({ imgURL, onSave, onUpdate }) => {
  const [status, requestPermission] = useCameraPermissions();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // console.log("Avatar", imgURL);
  const verifyPermissions = async () => {
    if (status.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();

      return response.granted;
    }

    if (status.status === PermissionStatus.DENIED) {
      console.log("Operation Failed!");
      return false;
    }

    return true;
  };

  // TODO REFACTOR
  const openCamera = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      cancelChangesHandler();
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (image.cancelled) {
      cancelChangesHandler();
      return;
    }
    onUpdate(image.uri);
    setIsSaving(true);
  };

  const openImageLibrary = async () => {
    // add permissions
    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (image.cancelled) {
      cancelChangesHandler();
      return;
    }
    onUpdate(image.uri);
    setIsSaving(true);
  };

  const cancelChangesHandler = () => {
    setIsSaving(false);
    setIsUpdating(false);
  };

  const saveNewImageHandler = () => {
    onSave();
    cancelChangesHandler();
  };

  return (
    <View style={styles.profileInfoContainer}>
      <Image
        source={
          imgURL ? { uri: imgURL } : require("../../assets/default-avatar.jpg")
        }
        style={styles.profileImage}
      />

      {!isUpdating && (
        <TextButton
          onPress={() => setIsUpdating(true)}
          color={COLORS.textDark}
          text="Update profile image"
          containerStyle={styles.avatarBtn}
        />
      )}
      {isSaving && (
        <View style={styles.imgPickerButtons}>
          <TextButton
            onPress={saveNewImageHandler}
            color="lightblue"
            text="Save"
            containerStyle={styles.avatarBtn}
          />
          <TextButton
            onPress={cancelChangesHandler}
            color="lightblue"
            text="Cancel"
            containerStyle={styles.avatarBtn}
          />
        </View>
      )}
      {!isSaving && isUpdating && (
        <TextButton
          onPress={cancelChangesHandler}
          color="lightblue"
          text="Cancel"
          containerStyle={styles.avatarBtn}
        />
      )}
      {isUpdating && (
        <View style={styles.imgPickerButtons}>
          <IconButton
            iconName="camera-outline"
            iconColor={COLORS.primaryDark}
            iconSize={22}
            onPress={openCamera}
            containerStyle={styles.imgPickerBtn}
          />
          <IconButton
            iconName="images-outline"
            iconColor={COLORS.primaryDark}
            iconSize={22}
            onPress={openImageLibrary}
            containerStyle={styles.imgPickerBtn}
          />
        </View>
      )}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  profileInfoContainer: {
    marginTop: -50,
    marginBottom: 50,
  },
  profileImage: {
    borderRadius: 100,
    width: 90,
    height: 90,
    alignSelf: "center",
    marginBottom: 10,
  },
  avatarBtn: {
    alignSelf: "center",
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: "red",
  },
  imgPickerButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  imgPickerBtn: {
    backgroundColor: COLORS.textLight,
    borderRadius: 5,
    padding: 7,
    marginHorizontal: 7,
  },
});
