import { useEffect, useState, useCallback, useContext } from "react";
import { Alert, View, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { MyMovieListContext } from "../../store/myMovies-context";
import { COLORS } from "../../constants/styles";
import { getMovieDetails } from "../../util/http";
import { IMAGE_URL } from "../../constants/config";

import YoutubePlayer from "react-native-youtube-iframe";
import IconButton from "../UI/IconButton";

const VideoPlayer = () => {
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const myListContext = useContext(MyMovieListContext);

  const movieData = route.params?.movieData;
  const movieId = movieData.id;

  const isMovieSaved = myListContext.movies.some(
    (movie) => movie.id === movieData.id
  );

  useEffect(() => {
    const getMovieVideo = async () => {
      try {
        const movieDetails = await getMovieDetails(movieId);
        setVideoId(movieDetails.videos?.results[0]?.key);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieVideo();
  }, [movieId]);

  const saveMovieHandler = () => {
    if (isMovieSaved) {
      myListContext.removeMovie(movieData.id);
      return;
    }
    myListContext.addMovie(movieData);
    navigation.navigate("MyMovies");
  };

  const videoStateChangeHandler = useCallback((state) => {
    if (state === "ended") setIsPlaying(false);
    if (state === "playing") setIsPlaying(true);
    if (state === "paused") setIsPlaying(false);
  }, []);

  const togglePlaying = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <View>
      <View style={styles.videoContainer}>
        {isLoading && (
          <Image
            source={{ uri: `${IMAGE_URL}${movieData.backdrop_path}` }}
            style={styles.thumbnail}
          />
        )}
        {!isLoading && (
          <YoutubePlayer
            onChangeState={videoStateChangeHandler}
            height={"100%"}
            width={"100%"}
            play={isPlaying}
            resizeMode="cover"
            videoId={videoId}
          />
        )}
      </View>
      <View style={styles.btnsContainer}>
        <IconButton
          containerStyle={styles.iconBtn}
          iconName={isPlaying ? "pause-outline" : "play-outline"}
          iconSize={24}
          iconColor={COLORS.textDark}
          text={isPlaying ? "Pause" : "Play"}
          onPress={togglePlaying}
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
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  videoContainer: {
    width: "100%",
    height: 218,
    backgroundColor: COLORS.primaryDark,
    marginBottom: 10,
  },
  video: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  thumbnail: { width: "100%", height: "100%" },
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
});
