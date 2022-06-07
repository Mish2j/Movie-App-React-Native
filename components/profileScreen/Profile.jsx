import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../store/auth-context";
import { COLORS } from "../../constants/styles";

import BodyWrapper from "../UI/BodyWrapper";
import IconButton from "../UI/IconButton";

const Profile = () => {
  const navigation = useNavigation();

  const authCtx = useContext(AuthContext);
  const { isLoggedin } = authCtx;

  const navigateMyMoviesScreen = () => {
    navigation.navigate("MyMovies");
  };

  const navigateAccountScreen = () => {
    if (isLoggedin) {
      navigation.navigate("Account");
      return;
    }
    navigation.navigate("Auth");
  };

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <View style={styles.container}>
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
