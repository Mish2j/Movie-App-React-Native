import { useState } from "react";
import { View, StyleSheet } from "react-native";

import { COLORS } from "../constants/styles";

import MovieDescription from "../components/movieScreen/MovieDescription";
import VideoPlayer from "../components/movieScreen/VideoPlayer";

const MovieScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoPlayerHandler = (state) => {
    // if (state !== undefined) {
    //   setIsPlaying(state);
    //   return;
    // }
    setIsPlaying((currentState) => !currentState);
  };
  return (
    <View style={styles.container}>
      <VideoPlayer isPlaying={isPlaying} onPlay={videoPlayerHandler} />
      <MovieDescription onPlay={videoPlayerHandler} isPlaying={isPlaying} />
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
