import { View, Text, Image, StyleSheet } from "react-native";

import { COLORS } from "../../constants/styles";
import { getUserProfile } from "../../util/http";

const Avatar = () => {
  const userData = getUserProfile();

  return (
    <View style={styles.profileInfoContainer}>
      <Image
        source={require("../../assets/default-avatar.jpg")}
        style={styles.profileImage}
      />
      <Text style={styles.userName}>{userData?.fullName}</Text>
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
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.textDark,
  },
});
