import { View, StyleSheet, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../constants/styles";

import BodyWrapper from "../UI/BodyWrapper";
import IconButton from "../UI/IconButton";
import Avatar from "./Avatar";

const Profile = () => {
  const navigation = useNavigation();

  const navigateMyMoviesScreen = () => {
    navigation.navigate("MyMovies");
  };

  const navigateAccountScreen = () => {
    navigation.navigate("Account");
  };

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <View style={styles.container}>
        <Avatar />
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

export default Profile;
