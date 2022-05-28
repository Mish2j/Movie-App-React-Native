import { View, StyleSheet, Text, Image } from "react-native";
import { COLORS } from "../constants/styles";

import BodyWrapper from "../components/UI/BodyWrapper";
import IconButton from "../components/UI/IconButton";

const ProfileScreen = ({ navigation }) => {
  const navigateMyMoviesScreen = () => {
    navigation.navigate("MyMovies");
  };

  const navigateAccountScreen = () => {
    navigation.navigate("Account");
  };

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <View style={styles.container}>
        <View style={styles.profileInfoContainer}>
          <Image
            source={require("../assets/icon.png")}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>User Name</Text>
        </View>

        <View>
          <IconButton
            containerStyle={styles.textContainer}
            iconName="arrow-forward-outline"
            iconSize={20}
            iconColor={COLORS.textLight}
            text="My List"
            textStyle={styles.text}
            onPress={navigateMyMoviesScreen}
          />

          <IconButton
            containerStyle={styles.textContainer}
            iconName="arrow-forward-outline"
            iconSize={20}
            iconColor={COLORS.textLight}
            text="Account"
            textStyle={styles.text}
            onPress={navigateAccountScreen}
          />
        </View>
      </View>
    </BodyWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
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
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.textDark,
  },
  textContainer: {
    backgroundColor: COLORS.primaryLight,
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: COLORS.textLight,
    fontSize: 16,
  },
});

export default ProfileScreen;
