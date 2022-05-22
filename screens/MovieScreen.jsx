import axios from "axios";
import { useState, useContext } from "react";
import { ScrollView, View, StyleSheet, Text, Image } from "react-native";
import { WebView } from "react-native-webview";
import { MyMovieListContext } from "../store/myMovies-context";
import { COLORS } from "../constants/styles";
import {
  IMAGE_URL,
  MOVIE_DETAIL_POST,
  MOVIE_DETAIL_PRE,
} from "../constants/config";

import IconButton from "../components/UI/IconButton";
import BodyWrapper from "../components/UI/BodyWrapper";
import Title from "../components/UI/Title";

const MovieScreen = ({ route, navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const movieData = route.params?.movieData;
  const myListContext = useContext(MyMovieListContext);

  const isMovieSaved = myListContext.movies.some(
    (movie) => movie.id === movieData.id
  );

  const saveMovieHandler = () => {
    if (isMovieSaved) {
      myListContext.removeMovie(movieData.id);
      return;
    }
    myListContext.addMovie(movieData);
    navigation.navigate("MyMovies");
  };

  const playVideo = async () => {
    try {
      const response = await axios.get(
        `${MOVIE_DETAIL_PRE}${movieData.id}${MOVIE_DETAIL_POST}`
      );
      // .videos.results[0].key
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const pauseVideo = () => {};

  const videoPlayerHandler = async () => {
    if (!isPlaying) {
      playVideo();
      setIsPlaying(true);
      return;
    }

    pauseVideo();
    setIsPlaying(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        {!isPlaying && (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: `${IMAGE_URL}${movieData.backdrop_path}` }}
          />
        )}
        {isPlaying && (
          <WebView
            source={{
              uri: "https://www.youtube.com/watch?v=cAXka5yNPuQ&ab_channel=BMWBLOG",
            }}
            allowsFullscreenVideo={true}
            pullToRefreshEnabled={true}
            style={{ width: "100%", height: "100%", marginTop: -49 }}
          />
        )}
      </View>
      <BodyWrapper color={COLORS.primaryDark}>
        <ScrollView>
          <Title text={movieData.title} />
          <View style={styles.btnsContainer}>
            <IconButton
              containerStyle={styles.iconBtn}
              iconName={isPlaying ? "pause-outline" : "play-outline"}
              iconSize={24}
              iconColor={COLORS.textDark}
              text={isPlaying ? "Pause" : "Play"}
              onPress={videoPlayerHandler}
            />
            <IconButton
              containerStyle={styles.iconBtn}
              iconName="download-outline"
              iconSize={24}
              iconColor={COLORS.textDark}
              text="Download"
            />
            <IconButton
              onPress={saveMovieHandler}
              containerStyle={styles.iconBtn}
              iconName={isMovieSaved ? "checkmark-outline" : "add-outline"}
              iconSize={24}
              iconColor={COLORS.textDark}
              text={isMovieSaved ? "Saved" : "My List"}
            />
          </View>
          <Text style={styles.movieOverview}>{movieData.overview}</Text>
        </ScrollView>
      </BodyWrapper>
    </View>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryDark,
    flex: 1,
  },
  videoContainer: {
    width: "100%",
    height: 250,
    backgroundColor: COLORS.primaryLight,
    marginBottom: 15,
  },
  btnsContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  iconBtn: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
    padding: 10,
    margin: 3,
    borderRadius: 5,
    justifyContent: "center",
  },
  movieOverview: {
    color: COLORS.textLight,
    fontSize: 17,
  },
});
