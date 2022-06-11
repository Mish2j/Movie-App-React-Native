import { View, StyleSheet } from "react-native";

import { COLORS } from "../constants/styles";

import MovieDescription from "../components/movieScreen/MovieDescription";
import VideoPlayer from "../components/movieScreen/VideoPlayer";

const MovieScreen = () => {
  return (
    <View style={styles.container}>
      <VideoPlayer />
      <MovieDescription />
    </View>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryDark,
    flex: 1,
  },
});
