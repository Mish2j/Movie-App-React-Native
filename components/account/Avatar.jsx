import { useState } from "react";
import { View, Image, StyleSheet } from "react-native";

import {
  launchCameraAsync,
  useCameraPermissions,
  useMediaLibraryPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
} from "expo-image-picker";

import { COLORS } from "../../constants/styles";

import TextButton from "../UI/TextButton";
import IconButton from "../UI/IconButton";

const Avatar = ({ imgURL, onSave, onUpdate }) => {
  const [cameraPermissionStatus, requestCameraPermission] =
    useCameraPermissions();
  const [photosPermissionStatus, requestPhotosPermission] =
    useMediaLibraryPermissions();
  const [isUpdating, setIsUpdating] = useState(false);

  const verifyPermissions = async (targetDeviceFeature, requestPermission) => {
    if (targetDeviceFeature.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();
      return response.granted;
    }
    if (targetDeviceFeature.status === PermissionStatus.DENIED) return false;
    return true;
  };

  const openDeviceFeature = async (targetFeature) => {
    let hasPermission = false;

    if (targetFeature === "CAMERA") {
      hasPermission = await verifyPermissions(
        cameraPermissionStatus,
        requestCameraPermission
      );
    } else {
      hasPermission = await verifyPermissions(
        photosPermissionStatus,
        requestPhotosPermission
      );
    }

    if (!hasPermission) {
      cancelChangesHandler();
      return;
    }

    const imageOptions = {
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    };

    const image =
      targetFeature === "CAMERA"
        ? await launchCameraAsync(imageOptions)
        : await launchImageLibraryAsync(imageOptions);

    if (image.cancelled) {
      cancelChangesHandler();
      return;
    }

    onUpdate(image.uri);
  };

  const cancelChangesHandler = () => {
    onUpdate("");
    setIsUpdating(false);
  };

  const saveNewImageHandler = () => {
    onSave();
    cancelChangesHandler();
  };

  return (
    <View style={styles.profileInfoContainer}>
      {
        <Image
          source={
            imgURL
              ? { uri: imgURL }
              : require("../../assets/default-avatar.jpg")
          }
          style={styles.profileImage}
        />
      }
      {!isUpdating && (
        <TextButton
          onPress={() => setIsUpdating(true)}
          color={COLORS.textDark}
          text="Update profile image"
          containerStyle={styles.avatarBtn}
        />
      )}
      {isUpdating && (
        <>
          <View style={styles.imgPickerButtons}>
            <TextButton
              onPress={saveNewImageHandler}
              color={COLORS.lightBlue}
              text="Save"
              containerStyle={styles.avatarBtn}
            />
            <TextButton
              onPress={cancelChangesHandler}
              color={COLORS.lightBlue}
              text="Cancel"
              containerStyle={styles.avatarBtn}
            />
          </View>
          <View style={styles.imgPickerButtons}>
            <IconButton
              iconName="camera-outline"
              iconColor={COLORS.primaryDark}
              iconSize={22}
              onPress={openDeviceFeature.bind(null, "CAMERA")}
              containerStyle={styles.imgPickerBtn}
            />
            <IconButton
              iconName="images-outline"
              iconColor={COLORS.primaryDark}
              iconSize={22}
              onPress={openDeviceFeature.bind(null, "PHOTOS")}
              containerStyle={styles.imgPickerBtn}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  profileInfoContainer: {
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
