import { View, StyleSheet, Text, Image } from "react-native";
import { COLORS } from "../constants/styles";

import BodyWrapper from "../components/UI/BodyWrapper";
import IconButton from "../components/UI/IconButton";

const ProfileScreen = ({ navigation }) => {
  const navigationHandler = () => {
    navigation.navigate("MyMovies");
  };

  const signOutHandler = () => {
    console.log("Signing out...");
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

        <View style={styles.buttonContainer}>
          <IconButton
            containerStyle={styles.textContainer}
            iconName="arrow-forward-outline"
            iconSize={20}
            iconColor={COLORS.textLight}
            text="My List"
            textStyle={styles.text}
            onPress={navigationHandler}
          />

          <IconButton
            containerStyle={styles.textContainer}
            iconName="arrow-forward-outline"
            iconSize={20}
            iconColor={COLORS.textLight}
            text="Account"
            textStyle={styles.text}
            onPress={navigationHandler}
          />
        </View>
        <IconButton
          containerStyle={styles.signOutBtn}
          iconName="log-out-outline"
          iconSize={20}
          iconColor={COLORS.textDark}
          text="Sign Out"
          onPress={signOutHandler}
        />
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
  buttonContainer: {
    marginBottom: 50,
  },
  signOutBtn: {
    alignSelf: "center",
  },
});

export default ProfileScreen;
