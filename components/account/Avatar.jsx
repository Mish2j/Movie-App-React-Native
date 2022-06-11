import { View, Image, StyleSheet } from "react-native";

import { COLORS } from "../../constants/styles";

const Avatar = ({ imgUrl }) => {
  return (
    <View style={styles.profileInfoContainer}>
      <Image
        source={
          imgUrl ? { uri: imgUrl } : require("../../assets/default-avatar.jpg")
        }
        style={styles.profileImage}
      />
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
  },
});
