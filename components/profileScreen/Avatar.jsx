import { View, Text, Image, StyleSheet } from "react-native";

import { COLORS } from "../../constants/styles";

const Avatar = () => {
  return (
    <View style={styles.profileInfoContainer}>
      <Image
        source={require("../../assets/icon.png")}
        style={styles.profileImage}
      />
      <Text style={styles.userName}>User Name</Text>
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
