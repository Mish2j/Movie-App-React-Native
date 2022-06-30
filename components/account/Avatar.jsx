import { useState } from "react";
import { View, Image, Pressable, Text, StyleSheet } from "react-native";

import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
} from "expo-image-picker";

import { COLORS } from "../../constants/styles";

const Avatar = ({ imgURL, onSave, onUpdate }) => {
  const [status, requestPermission] = useCameraPermissions();
  const [isUpdating, setIsUpdating] = useState(false);
  // const [imageURI, setImageURI] = useState(null);

  // const verifyPermissions = async () => {
  //   if (status.status === PermissionStatus.UNDETERMINED) {
  //     const response = await requestPermission();

  //     return response.granted;
  //   }

  //   if (status.status === PermissionStatus.DENIED) {
  //     console.log("Operation Failed!");
  //     return false;
  //   }

  //   return true;
  // };

  const imageUpdateHandler = async () => {
    // const hasPermission = await verifyPermissions();
    // if (!hasPermission) return;
    // const image = await launchCameraAsync({
    //   allowsEditing: true,
    //   aspect: [16, 9],
    //   quality: 0.5,
    // });
    // console.log(image);
    // setImageURI(image.uri);

    if (isUpdating) {
      onSave();
    } else {
      const pickImage = await launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.5,
      });

      onUpdate(pickImage.uri);
    }

    setIsUpdating((prevState) => !prevState);
  };

  return (
    <View style={styles.profileInfoContainer}>
      <Image
        source={
          imgURL ? { uri: imgURL } : require("../../assets/default-avatar.jpg")
        }
        style={styles.profileImage}
      />
      <Pressable
        onPress={imageUpdateHandler}
        style={({ pressed }) => pressed && styles.avatarBtnPressed}
      >
        <Text style={styles.avatarBtn}>
          {isUpdating ? "Save" : "Update profile image"}
        </Text>
      </Pressable>
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
    zIndex: 2,
  },
  avatarBtn: {
    marginTop: 10,
    alignSelf: "center",
    fontSize: 14,
    color: COLORS.textDark,
  },
  avatarBtnPressed: {
    opacity: 0.7,
  },
});
