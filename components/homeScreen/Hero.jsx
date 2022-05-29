import { View, ImageBackground, Text, StyleSheet } from "react-native";

import { COLORS } from "../../constants/styles";

const Hero = () => {
  return (
    <View>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/movie-background.jpg")}
        resizeMode="cover"
      >
        <Text style={styles.imageText}>
          Watch Your Favorite Movies Anywhere
        </Text>
      </ImageBackground>
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  imageText: {
    color: COLORS.textLight,
    fontSize: 35,
    margin: 15,
    textAlign: "center",
    paddingTop: 25,
  },
});
